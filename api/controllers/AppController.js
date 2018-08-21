import moment from 'moment';
var bundle;
module.exports = {
  index: function (req, res) {
    return res.view('index');
  },

  bambooleanLogin: function(req, res){
    if(req.session.user && req.session.usertype == "bamboolean"){
      return res.redirect('/bamboolean/portal');
    }
    if (sails.config.environment === 'production') {
      bundle = require('../../assets.json').login.js;
    }
    return res.view('bamboolean/login', {bundle: bundle});
  },

  bambooleanPortal: async function(req,res){
    var account = await Account.findOne({bambooleanId : req.session.user.id}).populate('bambooleanId');
    if(!account){
      var accObj = {
        bambooleanId: req.session.user.id,
        bambeuros: 100.00
      }
      account = await Account.create(accObj).fetch();
    }
    if (sails.config.environment === 'production') {
      bundle = require('../../assets.json').portal.js;
    }
    return res.view('bamboolean/portal', {account: account, bundle: bundle});
  },

  makeTransaction: async function(req, res){
    if(req.param('toAccount') == req.session.user.id) {
      return res.json({error: "Can't send Bambeuros to yourself."});
    }
    if(req.param('amount') < 0) return res.json({error: "Amount can't be less than 0"});
    var response = {};

    
    //passing in user id from the session ensures that only the account holder can make a transaction
    var account = await Account.debit({id: req.param('accountId'), bambooleanId: req.session.user.id, amount: req.param('amount')});
    response.account = account;
    if(!account) { 
        return res.json({error: "There was a problem debiting your account. Do you have enough Bambeuros?"}); 
    }
    account = await Account.credit({id: req.param('toAccount'), amount: req.param('amount')});
    if(!account) { 
        await Account.credit({id: req.param('accountId'), bambooleanId: req.session.user.id, amount: req.param('amount')}); // restore to old balance
        return res.json({error: "There was a problem crediting your recipient's account. Do you have the right account number? Looks like you've been bamboozled!"}); 
    }
    var debitTransaction = await Transaction.createTransaction({
      accountId: req.param('accountId'),
      amount: req.param('amount'),
      date: moment().format("YYYY-MM-DD"),
      type: "debit",
      to: req.param('toAccount')});
    response.transaction = debitTransaction;
    await Transaction.createTransaction({
      accountId: req.param('toAccount'),
      amount: req.param('amount'),
      date: moment().format("YYYY-MM-DD"),
      type: "credit",
      from: req.param('accountId')});
    return res.json(response);
  },

  getTransactions: async function(req, res){
    var transactions = await Transaction.find({where:{accountId: req.param('accountId')}, sort: 'updatedAt DESC'});
    return res.json({transactions: transactions});
  },

  getAccount: async function(req, res){
    var bamboolean = await Bamboolean.find({id: req.session.user.id}).populate('account');
    return res.json({bamboolean: bamboolean});
  },
  getAccountAndTransactions: async function(req, res){
    var bamboolean = await Bamboolean.find({id: req.session.user.id}).populate('account');
    var transactions = await Transaction.find({where:{accountId: bamboolean[0].account[0].id}, sort: 'updatedAt DESC'});
    return res.json({bamboolean: bamboolean, transactions: transactions});
  },

  create: function(req, res){
    var options = {
        req: req,
        res: res,
        model: Bamboolean,
        userType: "bamboolean",
        successUrl: "/bamboolean/portal",
        failureUrl: "/bamboolean/login"
      }
      CreateUserService.create(options);
  },

  login: function(req, res){
    var options = {
      req: req,
      res: res,
      userType: "bamboolean",
      model: Bamboolean,
      successUrl: "/bamboolean/portal",
      failureUrl: "/bamboolean/login"
    }
    SessionService.login(options);
  },
  logout: function(req, res){
    var options = {
      req: req,
      res: res,
      redirectUrl: "/",
    }
    SessionService.logout(options);
  },
};

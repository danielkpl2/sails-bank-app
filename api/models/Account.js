module.exports = {
	schema: true,
	attributes: {
		bambooleanId: {
			model: 'bamboolean'
		},

		bambeuros: {
			type: 'number'
		},
		transaction: {
			collection: 'transaction',
			via: 'accountId'
		},

	},

	credit: async function(options){
		var account = await Account.findOne({id: options.id});
		if(!account) return false;
		account = await Account.update({id: options.id}, {bambeuros: account.bambeuros + options.amount }).fetch();
		return account;
	},

	debit: async function(options){
		var account = await Account.findOne({id: options.id, bambooleanId: options.bambooleanId});
		if(!account) return false;
		if((account.bambeuros - options.amount) < 0) return false;
		account = await Account.update({id: options.id}, {bambeuros: account.bambeuros - options.amount }).fetch();
		return account;
	}


}
var bcrypt = require('bcrypt');

module.exports = {
	login: function(options){
		if(!options.req.param('email') || !options.req.param('password')){

			options.req.session.flash.warning = "Enter email and password";

			return options.res.redirect(options.failureUrl);
		}
		options.model.findOne({email: options.req.param('email')}).exec(function(err, user){
			if(err) return options.res.serverError(err);
			if(!user){

				options.req.session.flash.warning = "No " + options.userType + " account with email address " + options.req.param('email') + " found.";
				return options.res.redirect(options.failureUrl);
			}
			bcrypt.compare(options.req.param('password'), user.encrypted_password, function(err, valid){
				if(err) return options.res.serverError(err);
				if(!valid){
					options.req.session.flash.warning = "Incorrect password";
					return options.res.redirect(options.failureUrl);
					
				}
				options.req.session.usertype = options.userType;
				options.req.session.user = user;

				return options.res.redirect(options.successUrl);
				

			});


		});
	},
	logout: function(options){
		if(!options.req.session || !options.req.session.user){
			options.req.session.destroy();
			return options.res.redirect(options.redirectUrl);
		}
		options.req.session.user = null;
		options.req.session.usertype = null;
		options.req.session.flash.info = "Logged out.";
		return options.res.redirect(options.redirectUrl);
	}
}

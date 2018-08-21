module.exports = {

	create: function(options){
	  	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	  	 if(!options.req.param('newemail')){
	  	 	options.req.session.flash.warning = "Enter email address and password.";
	  	 	return options.res.redirect(options.failureUrl);

	  	 }else if(!re.test(options.req.param('newemail'))){
	  	 	options.req.session.flash.warning = "Enter a valid email address";
	  	 	return options.res.redirect(options.failureUrl);
	  	 }
	  	 if(options.req.param('newpassword') !== options.req.param('confirmation')){
	  	 	options.req.session.flash.warning = "Passwords don't match";
	  	 	return options.res.redirect(options.failureUrl);
	  	 }

	  	var userObj = {
	  		email: options.req.param('newemail'),
	  		encrypted_password: options.req.param('newpassword'),

	  	}
	  	options.model.findOne({email:options.req.param('newemail')}).exec(function(err, user){
	  		if(err) return options.res.serverError(err);
	  		if(user){
	  			var prefix = "";
	  			if(UtilitiesService.isVowel(options.userType.substring(1, 2))){
	  				prefix = "An";
	  			}else{
	  				prefix = "A";
	  			}
	  			options.req.session.flash.warning = prefix + " " + options.userType + " account with this email address already exists.";
	  			return options.res.redirect(options.failureUrl);
	  		}
	  		options.model.create(userObj).meta({fetch: true}).exec(function(err, user){
		  		if (err) return options.res.serverError(err);

		  		options.req.session.usertype = options.userType;
		  		options.req.session.user = user;
		  		options.res.redirect(options.successUrl);

		  	});
	  	});
	},



}

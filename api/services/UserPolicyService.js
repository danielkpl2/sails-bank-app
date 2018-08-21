module.exports = {
	checkLogin: function(options, callback){

		if(options.req.session.user && options.req.session.usertype == options.userType){
			return callback();
		} else {
			if(!options.req.session.flash){
				options.req.session.flash = {warning:"You must be logged in."};
				if(options.req.wantsJSON){
					options.res.forbidden();
				} else {
					return options.res.redirect(options.redirectUrl);
				}
				
			}
			options.req.session.flash.warning = "You must be logged in.";
			if(options.req.wantsJSON){
					options.res.forbidden();
				} else {
					return options.res.redirect(options.redirectUrl);
				}
		}

	}

}
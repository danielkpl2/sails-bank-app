module.exports = function(req, res, next){
	var options = {
		req: req,
		res: res,
		userType: "bamboolean",
		redirectUrl: "/bamboolean/login"
	}
	UserPolicyService.checkLogin(options, next);
};
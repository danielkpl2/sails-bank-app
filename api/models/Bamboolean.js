module.exports = {
	schema: true,
	attributes: {
		account: {
			collection: 'account',
			via: 'bambooleanId'
		},
		email: {
			type: 'string',
			required: true,
			unique: true,

		},
		encrypted_password: {
			type: 'string'
		},
		
	},
	beforeCreate: function(values, cb){
		if(!values.encrypted_password){
			return cb({err: ["Password not present"]});
  		}
  		require('bcrypt').hash(values.encrypted_password, 10, function(err, encrypted_password){
  			if(err) return cb(err);
  			values.encrypted_password = encrypted_password;
  			cb();
  		});
  	},
	customToJSON: function(){
		return _.omit(this, ['encrypted_password'])
	},
}
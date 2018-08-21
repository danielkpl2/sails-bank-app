var moment = require('moment');
module.exports = {
	schema: true,
	attributes: {
		accountId: {
			model: 'account'
		},
		amount: {
			type: 'number'
		},
		date: {
			type: 'string'
		},
		type: {
			type: 'string',
			isIn: [
				'credit',
				'debit'
			]
		},
		to: {
			type: 'string'
		},
		from: {
			type: 'string'
		}
	},

	createTransaction: async function(options, cb){
		var transaction = await Transaction.create({...options}).fetch();
		return transaction;
	}
}
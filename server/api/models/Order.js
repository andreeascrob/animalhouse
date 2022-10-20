const mongoose = require('mongoose');
const Product = require('./Product');
const orderStaticSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		products: {
			type: [{
				slug: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			}],
			required: true,
		},
	}
);
module.exports = mongoose.model('OrderStatic', orderStaticSchema);

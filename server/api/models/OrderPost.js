const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
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
		productsSlugs: {
			type: [String],
			required: true,
		},
	}
);
module.exports = mongoose.model('Order', orderSchema);

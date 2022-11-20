const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			required: true
		},
	}
);
module.exports = mongoose.model('Service', serviceSchema);

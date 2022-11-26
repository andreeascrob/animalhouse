const mongoose = require('mongoose');
const branchSchema = new mongoose.Schema(
	{
		city: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		servicesSlots: {
			type: [{
				serviceId: {
					type: mongoose.ObjectId,
					required: true,
				},
				animalId: {
					type: mongoose.ObjectId,
					required: true,
				},
				info: {
					type: String,
					required: true,
				},
				start: {
					type: Date,
					required: true,
				},
				end: {
					type: Date,
					required: true,
				},
				petId: {
					type: mongoose.ObjectId,
				},
			}]
		},
	}
);
module.exports = mongoose.model('Branch', branchSchema);

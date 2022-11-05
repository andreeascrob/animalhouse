const mongoose = require('mongoose');
const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		ownerId: {
			type: mongoose.ObjectId,
			required: true,
		},
		animalId: {
			type: mongoose.ObjectId,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		birth: {
			type: Date,
		},
		informations: {
			type: String,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	}
);
module.exports = mongoose.model('Pet', petSchema);

const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			required: true,
			unique: true
		}
	}
);
module.exports = mongoose.model('Animal', animalSchema);

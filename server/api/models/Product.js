const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		slug: {
			type: String,
			required: true,
			unique: true
		},
		animalId: mongoose.ObjectId,
		categoryId: mongoose.ObjectId,
		imageUrl: String,
		description: String,
		price: {
			type: Number,
			required: true
		},
		available: [Number]
	}
);
module.exports = mongoose.model('Product', productSchema);

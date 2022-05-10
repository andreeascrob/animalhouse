const mongoose = require('mongoose');
const productCategorySchema = new mongoose.Schema(
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
		imageUrl: String,
		description: String
	}
);
module.exports = mongoose.model('ProductCategory', productCategorySchema);

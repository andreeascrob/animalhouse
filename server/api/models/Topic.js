const mongoose = require('mongoose');
const topicSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		authorId: {
			type: mongoose.ObjectId,
			required: true,
		},
		animalId: {
			type: mongoose.ObjectId,
			required: true,
		},
		board: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		comments: {
			type: [{
				authorId: {
					type: mongoose.ObjectId,
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
			}]
		},
	}
);
module.exports = mongoose.model('Topic', topicSchema);

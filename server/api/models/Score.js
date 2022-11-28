const mongoose = require('mongoose');
const scoreSchema = new mongoose.Schema(
	{
		game: {
			type: String,
			required: true
		},
		player: {
			type: String,
			required: true
		},
		score: {
			type: Number,
			required: true
		},
	}
);
module.exports = mongoose.model('Score', scoreSchema);

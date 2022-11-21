const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		surname: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		isadmin: {
			type: Boolean,
		},

	}
);
module.exports = mongoose.model('User', userSchema);

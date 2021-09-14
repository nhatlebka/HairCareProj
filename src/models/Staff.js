//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema(
	{
		staff_fullname: String,
		staff_stars: Number,
		staff_introduce: String,
		staff_avatar: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Staff', Staff);

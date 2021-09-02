//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema(
	{
		firstname: String,
		lastname: String,
		email: String,
		phone: String,
		service: String,
		date: Date,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Booking', Booking);

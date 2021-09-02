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
		date: { type: [Date], index: true },
	},
	{
		timestamps: true,
	}
);
Booking.index({ date: 1, type: -1 });
module.exports = mongoose.model('Booking', Booking);

//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema(
	{
		customer_fullname: String,
		customer_phone: String,
		customer_email: String,
		customer_address: String,
		service_id: { type: Schema.Types.ObjectId, ref: 'Services' },
		staff_id: { type: Schema.Types.ObjectId, ref: 'Staff' },
		datetime: Date,
		comment: String,
		rating: { type: Number, default: 0 },
		status: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Booking', Booking);

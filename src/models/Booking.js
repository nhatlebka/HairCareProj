//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema(
	{
		customer_fullname: String,
		customer_phone: String,
		customer_email: String,
		customer_address: String,
		service_id:{type: Schema.Types.ObjectId, ref: 'ServicesList'},
		staff_id:{type: Schema.Types.ObjectId, ref: 'StaffList'},
		datetime: Date,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Booking', Booking);

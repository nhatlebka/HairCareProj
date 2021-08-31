const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        sevice: String,
        date: Date,
        time: String,
    },
    {timestamps: true}
);

module.exports = mongoose.model('Booking', bookingSchema);

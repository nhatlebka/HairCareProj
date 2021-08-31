const express = require('express');
const bookingRouter = express.Router();
const bookingSchema = require('../model/booking');

bookingRouter.post('/database', async (req, res) => {
	try {
		let booking = new bookingSchema({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			sevice: req.body.sevice,
			date: req.body.date,
			time: req.body.time,
		});
		await booking.save();
		res.send('Dat lich thanh cong')
	} catch (error) {
		console.log(error);
	}
});
// bookingRouter.get('/database', (req, res) => {
// 	bookingSchema
// });
bookingRouter.get('/', (req, res) => {
	res.render('booking/booking');
});

module.exports = bookingRouter;

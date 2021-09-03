//booking router
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');


router.post('/store', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const booking = new Booking(formData);
	booking
		.save()
		.then(() => res.redirect('/booking'))
		.catch((error) => {});
});
router.get('/searchByPhone', function (req, res, next) {
	Booking.find({ phone: req.query.phone })
		.then((bookings) => res.json(bookings))
		.catch(next);
});
router.get('/database', function (req, res, next) {
	Booking.find({})
		.then((bookings) => res.json(bookings))
		.catch(next);
});
router.get('/staff', function (req, res, next) {
	res.render('booking/staff');
});
router.get('/', function (req, res, next) {
	res.render('booking/booking');
});

module.exports = router;

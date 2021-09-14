const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Staff = require('../models/Staff');
const mongoose = require('mongoose');

router.get('/get-service', function (req, res, next) {
	Service.find({})
		.then((services) => res.json(services))
		.catch(next);
});
router.get('/get-staff', function (req, res, next) {
	Staff.find({})
		.then((staffs) => res.json(staffs))
		.catch(next);
});
router.get('/find-by-phone', function (req, res, next) {
	Booking.aggregate([
		{ $match: { customer_phone: req.query.customer_phone } },
		{
			$lookup: {
				from: 'services',
				localField: 'service_id',
				foreignField: '_id',
				as: 'Service',
			},
		},
		{ $unwind: '$Service' },
		{
			$lookup: {
				from: 'staffs',
				localField: 'staff_id',
				foreignField: '_id',
				as: 'Staff',
			},
		},
		{ $unwind: '$Staff' },
		{
			$sort: { datetime: 1 },
		},
	])
		// .sort({
		// 	datetime: 'asc',
		// })
		.then((booking) => res.json(booking))
		.catch(next);
});
router.get('/find-by-id', function (req, res, next) {
	Booking.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(req.query._id) } },
		{
			$lookup: {
				from: 'services',
				localField: 'service_id',
				foreignField: '_id',
				as: 'Service',
			},
		},
		{ $unwind: '$Service' },
		{
			$lookup: {
				from: 'staffs',
				localField: 'staff_id',
				foreignField: '_id',
				as: 'Staff',
			},
		},
		{ $unwind: '$Staff' },
	])
		// .sort({
		// 	datetime: 'asc',
		// })
		.then((booking) => res.json(booking))
		.catch(next);
});
router.put('/update', function (req, res, next) {
	// res.json(req.body)
	Booking.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.json(res))
		.catch((error) => {});
});
router.put('/cancel', function (req, res, next) {
	// res.json(req.body)
	Booking.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.send('Your appointment is pending cancellation!'))
		.catch((error) => {});
});
router.delete('/delete', function (req, res, next) {
	// res.json(req.body)
	Booking.deleteOne({ _id: req.body._id })
		.then(() => res.send('Your appointment has been deleted!'))
		.catch((error) => {});
});
router.post('/', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const booking = new Booking(formData);
	booking
		.save()
		.then(() => res.json(booking))
		.catch((error) => {});
});
router.get('/review', (req, res) => {
	res.render('booking/review');
});
router.get('/demo', (req, res) => {
	res.render('booking/demo');
});
router.get('/', (req, res) => {
	res.render('booking/booking');
});

module.exports = router;

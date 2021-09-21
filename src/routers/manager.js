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
router.get('/staff-by-id', function (req, res, next) {
	Staff.findOne({ _id: req.query._id })
		.then((staff) => res.json(staff))
		.catch(next);
});
router.get('/list-all-booking', function (req, res, next) {
	Booking.aggregate([
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
			$sort: { status: 1, datetime: 1 },
		},
	])
		// .sort({
		// 	datetime: 'asc',
		// })
		.then((booking) => res.json(booking))
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
router.put('/approve', function (req, res, next) {
	// res.json(req.body)
	Booking.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.send('This appointment has been Approve!'))
		.catch((error) => {});
});
router.put('/cancel', function (req, res, next) {
	// res.json(req.body)
	Booking.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.send('This appointment has been cancelled!'))
		.catch((error) => {});
});
router.put('/update', function (req, res, next) {
	// res.json(req.body)
	Booking.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.send('This appointment has been updated!'))
		.catch((error) => {});
});
router.delete('/delete', function (req, res, next) {
	// res.json(req.body)
	Booking.deleteOne({ _id: req.body._id })
		.then(() => res.send('Your appointment has been deleted!'))
		.catch((error) => {});
});
router.post('/staff', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const staff = new Staff(formData);
	staff
		.save()
		.then(() => res.send('OK'))
		.catch((error) => {});
});
router.post('/service', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const service = new Service(formData);
	service
		.save()
		.then(() => res.send('OK'))
		.catch((error) => {});
});
router.post('/booking', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const booking = new Booking(formData);
	booking
		.save()
		.then(() => res.send('OK'))
		.catch((error) => {});
});
router.get('/demo', isLoggedIn, (req, res) => {
	res.render('manager/demo');
});
router.get('/staffs', isLoggedIn, (req, res) => {
	res.render('manager/staffs');
});
router.get('/services', isLoggedIn, (req, res) => {
	res.render('manager/services');
});
router.get('/booking', isLoggedIn, (req, res) => {
	res.render('manager/booking');
});
// router.get('/:slug', (req, res, next) => {
// 	res.render('manager/manager');
// });
router.get('/', isLoggedIn, (req, res) => {
	res.render('manager/manager', { user: req.user });
});
// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
	// Nếu một user đã xác thực, cho đi tiếp
	if (req.isAuthenticated()) return next();
	// Nếu chưa, đưa về trang chủ
	res.redirect('/login');
}
module.exports = router;

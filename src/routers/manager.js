const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Staff = require('../models/Staff');


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
router.post('/staff', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const staff = new Staff(formData);
	staff
		.save()
		.then(() => res.json(staff))
		.catch((error) => {});
});
router.post('/service', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const service = new Service(formData);
	service
		.save()
		.then(() => res.json(service))
		.catch((error) => {});
});
router.post('/booking', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const booking = new Booking(formData);
	booking
		.save()
		.then(() => res.json(booking))
		.catch((error) => {});
});
router.get('/demo', (req, res) => {
    res.render('manager/demo');
});
router.get('/', (req, res) => {
    res.render('manager/manager');
});

module.exports = router;

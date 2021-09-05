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
router.post('/', function (req, res, next) {
	// res.json(req.body)
	const formData = req.body;
	const booking = new Booking(formData);
	booking
		.save()
		.then(() => res.json(booking))
		.catch((error) => {});
});
router.get('/', (req, res) => {
    res.render('booking/booking');
});

module.exports = router;

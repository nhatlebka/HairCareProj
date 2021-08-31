const express = require('express');
const bookingRouter = express.Router();

bookingRouter.get('/', (req, res) => {
	res.render('booking/booking');
});

module.exports = bookingRouter;

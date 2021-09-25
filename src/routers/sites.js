const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

router.post(
	'/login',
	passport.authenticate('local-login', {
		successRedirect: '/manager',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

router.get('/about', (req, res) => {
	res.render('sites/about')
})

router.get('/login', function (req, res) {
	res.render('sites/login.ejs', { message: req.flash('loginMessage') });
});
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/contact-us', (req, res) => {
	res.render('sites/contact');
});
router.get('/thankyou', (req, res) => {
	res.render('sites/thankyou');
});
router.get('/', (req, res) => {
	res.render('sites/home');
});

module.exports = router;

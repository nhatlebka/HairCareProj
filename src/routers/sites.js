const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport);

router.post(
	'/signup',
	passport.authenticate('local-signup', {
		successRedirect: '/login', // chuyển hướng tới trang được bảo vệ
		failureRedirect: '/signup', // trở lại trang đăng ký nếu có lỗi
		failureFlash: true, // allow flash messages
	})
);
router.post(
	'/login',
	passport.authenticate('local-login', {
		successRedirect: '/manager',
		failureRedirect: '/login',
		failureFlash: true,
	})
);
router.get('/signup', function (req, res) {
	res.render('sites/signup.ejs', { message: req.flash('signupMessage') });
});

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

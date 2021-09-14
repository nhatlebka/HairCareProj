const express = require('express');
const router = express.Router();

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

const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.render('sites/search');
});
router.get('/thankyou', (req, res) => {
    res.render('sites/thankyou');
});
router.get('/', (req, res) => {
    res.render('sites/home');
});

module.exports = router;

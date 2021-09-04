const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.render('site/search');
});
router.get('/', (req, res) => {
    res.render('sites/home');
});

module.exports = router;

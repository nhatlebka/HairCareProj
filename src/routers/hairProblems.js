const express = require('express');
const hairProblems = express.Router();

hairProblems.get('/detail', (req, res) => {
    res.render('hairProblems/detailhair');
});

hairProblems.get('/', (req, res) => {
    res.render('hairProblems/hairProblems');
});

module.exports = hairProblems;

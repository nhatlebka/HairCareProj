const express = require('express');
const hairService = express.Router();


hairService.get('/', (req, res) => {
    res.render('hairService/hairService');
});
hairService.get('/option', (req, res) => {
    res.render('hairService/optionServices');
});

module.exports = hairService;
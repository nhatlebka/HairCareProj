const express = require('express');
const hairService = express.Router();


hairService.get('/', (req, res) => {
    res.render('hairService/hairService');
});

module.exports = hairService;
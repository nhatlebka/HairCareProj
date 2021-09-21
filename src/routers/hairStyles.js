const express = require('express');
const hairStyles = express.Router();

hairStyles.get('/', (req, res) => {
	res.render('hairstyles/hairstyles');
});

hairStyles.get('/menhairstyles', (req, res) => {
	res.render('hairstyles/menhairstyles');
});

hairStyles.get('/womenhairstyles', (req, res) => {
	res.render('hairstyles/womenhairstyles');
});

module.exports = hairStyles;

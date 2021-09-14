const express = require('express');
const hairStyles = express.Router();

hairStyles.get('/', (req, res) => {
	res.render('hairstyles/hairstyles');
});

module.exports = hairStyles;

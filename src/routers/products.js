const express = require('express');
const products = express.Router();

products.get('/biotera', (req, res) => {
    res.render('products/prod1');
});

products.get('/', (req, res) => {
    res.render('products/products');
});

module.exports = products;

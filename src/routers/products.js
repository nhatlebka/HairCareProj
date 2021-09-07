const express = require('express');
const products = express.Router();

products.get('/shampoo&conditioner/biotera', (req, res) => {
    res.render('products/prod1');
});

products.get('/shampoo&conditioner', (req, res) => {
    res.render('products/products');
});

products.get('/', (req, res) => {
    res.render('products/list');
});

module.exports = products;

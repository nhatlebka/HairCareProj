const express = require('express');
const products = express.Router();
const productdetail = require('../models/products');
const mongoose = require('mongoose');

products.get('/get-product', function (req, res, next) {
    productdetail.find({})
        .then((productdetail) => res.json(productdetail))
        .catch(next);
});

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

const express = require('express');
const products = express.Router();
const product = require('../models/products');
const mongoose = require('mongoose');
const moment = require("moment");

products.get('/get-product', function (req, res, next) {
    product.find({})
        .then((product) => res.json(product))
        .catch(next);
});

products.get('/:slug', (req, res, next) => {
    product
        .findOne({slug : req.params.slug})
        .then(product => {
            res.render('products/prod1', {
                product: product,
            });
        })
        .catch(next);
});

products.get('/', (req, res, next) => {
    if(req.query.category){
    product.find({
        category:req.query.category,
    })
        .then(product => {
            res.render('products/products', {
                product: product,
            });
        })
        .catch(next);
} else
{
    res.render('products/list');
}
})
module.exports = products;
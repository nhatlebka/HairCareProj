//posts models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema(
    {
        name: String,
        price: String,
        description: String,
        image: Array,
        highlight: String,
        shipping: String,
        slug: String,
        category: String,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('product', product);

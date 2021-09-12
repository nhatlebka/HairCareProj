//posts models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productdetail = new Schema(
    {
        title: String,
        price: Number,
        description: String,
        image: Array,
        highlight: String,
        ingredient: String,
        howtouse: String,
        comments: Array,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('productdetail', productdetail);

//posts models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallery = new Schema(
    {
        img: String,
        type: String,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('gallery', gallery);

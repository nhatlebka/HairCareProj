//posts models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const posts = new Schema(
    {
        title: String,
        description: String,
        image: String,
        date: Date,
        type: Array,
        slug: {type: String, slug: 'title', unique: true},
    },
    {
        timestamps: true,
    }
);
mongoose.plugin(slug);
module.exports = mongoose.model('posts', posts);

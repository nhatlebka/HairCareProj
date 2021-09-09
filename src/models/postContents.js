//postContents models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postContents = new Schema(
    {
        postId: String,
        content: String,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('postContents', postContents);


//postContents models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postComments = new Schema(
    {
        postId: String,
        name: String,
        email: String,
        message: String,
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('postComments', postComments);

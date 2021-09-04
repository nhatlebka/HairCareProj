const express = require('express');
const hairProblems = express.Router();
const posts = require('../models/posts');
const postContents = require('../models/postContents');
const moment = require('moment');
const postComments = require('../models/postComments');

hairProblems.get('/post-content', (req, res, next) => {
    postContents
        .find({postId: req.query.id})
        .then(postContents => res.json(postContents))
        .catch(next);
});

hairProblems.post('/post-comment', async (req, res, next) => {
    try {
        let newComment = new postComments({
            postId: req.body.postId,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        await newComment.save();
        postComments
            .find({postId: req.body.postId})
            .then(postComments => res.send(postComments))
            .catch(next);
    } catch (error) {
        console.error(error);
    }
});

hairProblems.post('/posts', async (req, res, next) => {
    //res.send(req.body);
    try {
        let newPost = new posts({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            type: req.body.type,
        });
        await newPost.save();
        res.send(req.body);
    } catch (error) {
        console.error(error);
    }
});

hairProblems.get('/post-list-sortbydate', (req, res, next) => {
    posts
        .find({})
        .sort({date: -1})
        .then(posts => res.send(posts))
        .catch(next);
});

hairProblems.get('/list-comments', (req, res, next) => {
    postComments
        .find({postId: req.query.postId})
        .then(postComments => res.send(postComments))
        .catch(next);
});

hairProblems.get('/:slug', (req, res, next) => {
    posts
        .findOne({slug: req.params.slug})
        .then(post => {
            res.render('hairProblems/hairProblemsPost', {
                post: post,
                moment: moment,
            });
        })
        .catch(next);
});

hairProblems.get('/', (req, res, next) => {
    const type = req.query.type || '';
    if (type) {
        posts
            .find({type: {$all: [type]}})
            .then(posts =>
                res.render('hairProblems/hairProblems', {
                    posts: posts,
                    moment: moment,
                })
            )
            .catch(next);
    } else {
        posts
            .find()
            .then(posts =>
                res.render('hairProblems/hairProblems', {
                    posts: posts,
                    moment: moment,
                })
            )
            .catch(next);
    }
});

module.exports = hairProblems;

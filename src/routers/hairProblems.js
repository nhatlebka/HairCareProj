const express = require('express');
const hairProblems = express.Router();
const posts = require('../models/posts');
const postContents = require('../models/postContents');
const moment = require('moment');
const postComments = require('../models/postComments');

// Count documents
async function getCountComments(posts) {
    const newPosts = [];
    for (let i = 0; i < posts.length; i++) {
        const totalCount = await postComments.countDocuments({
            postId: posts[i]._id,
        });
        newPosts.push({...posts[i]._doc, totalCount});
    }
    return newPosts;
}

// GET post content
hairProblems.get('/post-content', (req, res, next) => {
    postContents
        .find({postId: req.query.id})
        .then(postContents => res.json(postContents))
        .catch(next);
});

//POST save post comments
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

//POST save new post
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

//GET post list sort by date
hairProblems.get('/post-list-sortbydate', (req, res, next) => {
    posts
        .find({})
        .sort({date: -1})
        .then(posts => res.send(posts))
        .catch(next);
});

//GET post list by page
hairProblems.get('/post-list', (req, res, next) => {
    var type = req.query.type || '';
    var page = req.query.page || 1;
    const PAGE_SIZE = 6;
    if (type) {
        page = parseInt(page);
        var skipPage = (page - 1) * PAGE_SIZE;
        Promise.all([
            posts
                .find({type: {$all: [type]}})
                .skip(skipPage)
                .limit(PAGE_SIZE),
            posts.countDocuments({type: {$all: [type]}}),
        ])
            .then(([posts, totalCount]) => {
                getCountComments(posts).then(listPosts =>
                    res.send({posts: listPosts, totalCount})
                );
            })
            .catch(next);
    } else {
        page = parseInt(page);
        var skipPage = (page - 1) * PAGE_SIZE;
        Promise.all([
            posts.find({}).skip(skipPage).limit(PAGE_SIZE),
            posts.countDocuments(),
        ])
            .then(([posts, totalCount]) => {
                getCountComments(posts).then(listPosts =>
                    res.send({posts: listPosts, totalCount})
                );
            })
            .catch(next);
    }
});

//GET related stories
hairProblems.get('/related-post', async (req, res, next) => {
    const type = req.query.type;
    let listPosts = [];
    for (let i=0; i<type.length; i++) {
        try {
            const lposts = await posts.find({type: {$all: [type[i]]}}).limit(5);
            listPosts = listPosts.concat(lposts)
        } catch (error) {
            console.log(error)
        }
    }
    for (let i=1; i<listPosts.length; i++) {
        for (let j=0; j<i; j++) { 
            if (listPosts[i].title == listPosts[j].title) {
                listPosts.splice(i, 1);
                break;
            }
        }
    }
    
    res.send(listPosts)
})


//GET count comments
hairProblems.get('/count-comments', (req, res, next) => {
    const postId = req.query.postId;
    postComments
        .countDocuments({postId: postId})
        .then(count => res.send({count}))
        .catch(next);
});

//GET list comments
hairProblems.get('/list-comments', (req, res, next) => {
    postComments
        .find({postId: req.query.postId})
        .then(postComments => res.send(postComments))
        .catch(next);
});

//GET post
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

//GET hair problems
hairProblems.get('/', (req, res, next) => {
    var type = req.query.type || '';
    res.render('hairProblems/hairProblems', {type: type});
});

module.exports = hairProblems;

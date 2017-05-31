
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
// ----------- REST Routes --------------
// Get all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});

router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if(err) { return next(err); }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post) {
        if (err) { return next(err); }
        if (!post) { return next(new Error("can't find post")); }

        req.post = post;
        return next();
    });
});

router.delete('/posts/', function(req, res) {
    Post.remove({
        //_id: req.params.post
    }, function(err, post) {
        if (err) { return next(err); }

        Post.find(function(err, posts) {
            if (err) { return next(err); }

            res.json(posts);
        });
    });
});


module.exports = router;

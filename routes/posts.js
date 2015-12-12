var express = require('express'),
    Post = require('../models/Post');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('posts/edit', {post: {}});
});

router.post('/', function(req, res, next) {
  var post = new Post({
    email: req.body.email,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content,
    question: req.body.question,
    choice1: req.body.choice1,
    votes1: req.body.votes1,
    choice2: req.body.choice2,
    votes2: req.body.votes2,
    choice3: req.body.choice3,
    votes3: req.body.votes3,
    singlequestion: req.body.singlequestion,
    answer: req.body.answer
  });
  post.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + doc.id);
  });
});

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post) {
      post.read = post.read + 1;
      post.save(function(err) { });
      res.render('posts/show', {post: post});
    }
    return next(new Error('not found'));
  });
});

router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
  });
});

/* collect 추가 */

router.get('/:id/collect', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/collect', {post: post});
  });
});

/* result 추가 */

router.get('/:id/result', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/result', {post: post});
  });
});


router.get('/new', function(req, res, next) {
  res.render('posts/edit', {post: {}});
});

router.put('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (req.body.password === post.password) {
      post.email = req.body.email;
      post.title = req.body.title;
      post.content = req.body.content;
      post.question = req.body.question;
      post.choice1 = req.body.choice1;
      post.votes1 = req.body.votes1;
      post.choice2 = req.body.choice2;
      post.votes2 = req.body.votes2;
      post.choice3 = req.body.choice3;
      post.votes3 = req.body.votes3;
      post.singlequestion = req.body.singlequestion;
      post.answer = req.body.answer;
      post.save(function(err) {
        res.redirect('/posts/' + req.params.id);
      });
    }
    res.redirect('back');
  });
});

router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/');
  });
});

function pagination(count, page, perPage, funcUrl) {
  var pageMargin = 3;
  var firstPage = 1;
  var lastPage = Math.ceil(count / perPage);
  var prevPage = Math.max(page - 1, 1);
  var nextPage = Math.min(page + 1, lastPage);
  var pages = [];
  var startPage = Math.max(page - pageMargin, 1);
  var endPage = Math.min(startPage + (pageMargin * 2), lastPage);
  for(var i = startPage; i <= endPage; i++) {
    pages.push({
      text: i,
      cls: (page === i) ? 'active': '',
      url: funcUrl(i)
    });
  }
  return {
    numPosts: count,
    firstPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(1)},
    prevPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(prevPage)},
    nextPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(nextPage)},
    lastPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(lastPage)},
    pages: pages
  };
}

router.get('/', function(req, res, next) {
  var page = req.query.page || 1;
  page = parseInt(page, 10);
  var perPage = 10;
  Post.count(function(err, count) {
    Post.find({}).sort({createdAt: -1})
    .skip((page-1)*perPage).limit(perPage)
    .exec(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.render('posts/index', {
        posts: posts,
        pagination: pagination(count, page, perPage, function(p) {
          return '/posts?page=' + p;
        })
      });
    });
  });
});


module.exports = router;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', function(req, res, next) {
  req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
  res.redirect('/');
});

module.exports = router;

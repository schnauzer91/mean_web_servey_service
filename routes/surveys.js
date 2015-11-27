var express = require('express');
var router = express.Router();

/* GET Pages related Survey. */

router.get('/Registration', function(req, res, next) {
  res.render('surveys/Registration');
});

router.get('/Collecting', function(req, res, next) {
  res.render('surveys/Collecting');
});

router.get('/Result', function(req, res, next) {
  res.render('surveys/Result');
});

router.get('/Manage', function(req, res, next) {
  res.render('surveys/Manage');
});

module.exports = router;
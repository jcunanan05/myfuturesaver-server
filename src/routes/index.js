var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: 'Welcome to MyFutureSaver',
    message: 'Go to https://myfuturesaver.org'
  });
});

module.exports = router;

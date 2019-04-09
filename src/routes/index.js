var express = require('express');
var router = express.Router();
const { addCorbResponse } = require('../controllers/corsController');

// for chrome CORB security
router.use(addCorbResponse);

/* GET home page. */
router.get('/', function(__, res) {
  res.json({
    title: 'Welcome to MyFutureSaver',
    message: 'Go to https://myfuturesaver.org'
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var cors = require('cors');

router.options('/', cors());

router.get('/', cors(), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.post('/', cors(), (_, res) => {
  res.json({
    title: 'API Post Route',
    message: 'you posted at the api route'
  });
});

module.exports = router;

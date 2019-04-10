const express = require('express');
const router = express.Router();
const canadaclbRouter = require('./canadaclb');
const mailRouter = require('./mail');
const sendgridMailRouter = require('./sgMail');
const { corsWithOptions } = require('../../controllers/corsController');

// router file
router.use('/mail', mailRouter);
router.use('/canadaclb', canadaclbRouter);
router.use('/sg-mail', sendgridMailRouter);

router.get('/', corsWithOptions(), (__, res) => {
  res.json({
    title: 'hello'
  });
});

module.exports = router;

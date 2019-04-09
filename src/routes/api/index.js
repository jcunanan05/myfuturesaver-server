const express = require('express');
const router = express.Router();
const multer = require('multer');
const canadaclbRouter = require('./canadaclb');
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../../controllers/mailController');
const { corsWithOptions } = require('../../controllers/corsController');

// router file
router.use('/canadaclb', canadaclbRouter);

router.get('/', corsWithOptions(), (__, res) => {
  res.json({
    title: 'hello'
  });
});

// preflight response for post request
router.options('/mail/clb-statement', corsWithOptions());
router.post(
  '/mail/clb-statement',
  corsWithOptions(),
  multer().single('attachment'),
  sendEmailWithAttachment
);

router.options('/mail/clb-statement-success', corsWithOptions());
router.post('/mail/clb-statement-success', corsWithOptions(), sendSuccessMail);

module.exports = router;

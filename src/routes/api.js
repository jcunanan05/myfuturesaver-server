const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../controllers/mailController');
const {
  addCorbResponse,
  corsWithOptions
} = require('../controllers/corsController');

// for chrome CORB security
router.use(addCorbResponse);

router.get('/', corsWithOptions(), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.post('/', corsWithOptions(), (_, res) => {
  res.json({
    title: 'API Post Route',
    message: 'you posted at the api route'
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

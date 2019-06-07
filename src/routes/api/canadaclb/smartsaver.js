const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../../../controllers/mailController');

// preflight response for post request
router.options('/mail/clb-statement');
router.post(
  '/mail/clb-statement',
  multer().single('attachment'),
  sendEmailWithAttachment
);

router.options('/mail/clb-statement-success');
router.post('/mail/clb-statement-success', sendSuccessMail);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../../controllers/mailController');
const { corsWithOptions } = require('../../controllers/corsController');

/**
 * CLB Statement - User sends mail with attachment to smartsaver.
 */

// preflight response for post request
router.options('/clb-statement', corsWithOptions());

router.post(
  '/clb-statement',
  corsWithOptions(),
  multer().single('attachment'),
  sendEmailWithAttachment
);

/**
 * CLB Statement Success - Thank you email send to the user.
 */

router.options('/clb-statement-success', corsWithOptions());

router.post('/clb-statement-success', corsWithOptions(), sendSuccessMail);

module.exports = router;

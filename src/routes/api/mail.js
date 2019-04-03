const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../../controllers/mailController');

const {
  addCorbResponse,
  corsWithOptions,
  defaultStagingWhitelist,
  defaultWhitelist
} = require('../../controllers/corsController');

const whitelistOptions = {
  whitelist: defaultWhitelist,
  stagingWhiteList: defaultStagingWhitelist
};

// for chrome CORB security
router.use(addCorbResponse);

/**
 * CLB Statement - User sends mail with attachment to smartsaver.
 */

// preflight response for post request
router.options('/clb-statement', corsWithOptions(whitelistOptions));

router.post(
  '/clb-statement',
  corsWithOptions(whitelistOptions),
  multer().single('attachment'),
  sendEmailWithAttachment
);

/**
 * CLB Statement Success - Thank you email send to the user.
 */

router.options('/clb-statement-success', corsWithOptions(whitelistOptions));

router.post(
  '/clb-statement-success',
  corsWithOptions(whitelistOptions),
  sendSuccessMail
);

module.exports = router;

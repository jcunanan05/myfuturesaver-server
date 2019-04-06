const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addCorbResponse,
  corsWithOptions
} = require('../../../controllers/corsController');
const whitelistOptions = {
  whitelist: ['https://canadaclb.ca', 'https://www.canadaclb.ca'],
  stagingWhitelist: ['https://staging-canadaclb.netlify.com']
};
const {
  sendEmailWithAttachment,
  sendSuccessMail
} = require('../../../controllers/mailController');

router.use(addCorbResponse);

// preflight response for post request
router.options('/mail/clb-statement', corsWithOptions(whitelistOptions));
router.post(
  '/mail/clb-statement',
  corsWithOptions(whitelistOptions),
  multer().single('attachment'),
  sendEmailWithAttachment
);

router.options(
  '/mail/clb-statement-success',
  corsWithOptions(whitelistOptions)
);
router.post(
  '/mail/clb-statement-success',
  corsWithOptions(whitelistOptions),
  sendSuccessMail
);

module.exports = router;

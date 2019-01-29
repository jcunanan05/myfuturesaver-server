const express = require('express');
const router = express.Router();
const multer = require('multer');
const canadaclbRouter = require('./canadaclb');
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
  defaultWhitelist,
  defaultStagingWhitelist
};

// for chrome CORB security
router.use(addCorbResponse);

// router file
router.use('/canadaclb', canadaclbRouter);

router.get('/', corsWithOptions(whitelistOptions), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.post('/', corsWithOptions(whitelistOptions), (_, res) => {
  res.json({
    title: 'API Post Route',
    message: 'you posted at the api route'
  });
});

// preflight response for post request
router.options('/mail/clb-statement', corsWithOptions(whitelistOptions));
router.post(
  '/mail/clb-statement',
  corsWithOptions(),
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

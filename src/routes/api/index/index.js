const express = require('express');
const router = express.Router();
const canadaclbRouter = require('./canadaclb');
const futuresaverMailRouter = require('./futuresaverMail');
const {
  addCorbResponse,
  corsWithOptions,
  defaultStagingWhitelist,
  defaultWhitelist
} = require('../../../controllers/corsController');
const whitelistOptions = {
  whitelist: defaultWhitelist,
  stagingWhiteList: defaultStagingWhitelist
};

// for chrome CORB security
router.use(addCorbResponse);

// router file
router.use('/', futuresaverMailRouter);
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

module.exports = router;

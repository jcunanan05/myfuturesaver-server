const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
const router = express.Router();
const { corsWithOptions } = require('../../../controllers/corsController');
const { sendSuccessMail } = require('../../../controllers/mailController');
const smartsaverRouter = require('./smartsaver');

const whitelistedUrls = {
  whitelistedUrls: ['https://canadaclb.ca', 'https://www.canadaclb.ca'],
  whitelistedStagingUrls: ['https://staging-canadaclb.netlify.com']
};

// use cors controller for all /canadaclb routes.
router.use(corsWithOptions(whitelistedUrls));

// routers
router.use('/smartsaver', smartsaverRouter);

// success mail route
router.options('/mail/success');

router.post('/mail/success', sendSuccessMail);

// new subscriber at mailchimp route
router.options('/mail/subscriber/new');

router.post('/mail/subscriber/new', async (req, res, next) => {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = req.body.listId;
  var mailchimp = new Mailchimp(apiKey);
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        email_type: 'text',
        status: 'subscribed'
      }
    ],
    update_existing: true
  };
  // throw error when listId is not provided
  if (!req.body.listId) {
    const error = 'listId is required.';
    res.status(422).json({ error });
    return next(new Error('listId is required.'));
  }
  // make a mailchimp request
  try {
    const resolve = await mailchimp.post({
      path: `/lists/${listId}`,
      body: data
    });
    if (resolve.error_count !== 0) {
      res.status(422).json({
        error: resolve.errors
      });
      return next(new Error('Something wrong with mailchimp'));
    }
    res.json({ success: 'Thank you for subscribing.' });
  } catch (error) {
    console.log(error);
    res.status(503).json({ error });
    return next(new Error(error));
  }
});

module.exports = router;

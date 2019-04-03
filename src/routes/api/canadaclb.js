const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
const router = express.Router();
const { corsWithOptions } = require('../../controllers/corsController');
const { sendSuccessMail } = require('../../controllers/mailController');
const whitelist = ['https://canadaclb.ca', 'https://www.canadaclb.ca'];
const stagingWhitelist = ['https://staging-canadaclb.netlify.com'];
const whitelistOptions = {
  whitelist,
  stagingWhitelist
};

router.get('/', corsWithOptions(whitelistOptions), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

// success mail route
router.options('/mail/success', corsWithOptions(whitelistOptions));

router.post(
  '/mail/success',
  corsWithOptions(whitelistOptions),
  sendSuccessMail
);

/**
 * New CanadaCLB Mailchimp Subscriber -
 */
router.options('/mail/subscriber/new', corsWithOptions(whitelistOptions));

router.post(
  '/mail/subscriber/new',
  corsWithOptions(whitelistOptions),
  async (req, res, next) => {
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
  }
);

module.exports = router;

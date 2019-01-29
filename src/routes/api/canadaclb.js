const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
const router = express.Router();
const { corsWithOptions } = require('../../controllers/corsController');
const whitelist = ['https://canadaclb.ca', 'https://www.canadaclb.ca'];
const stagingWhitelist = ['https://staging-canadaclb.netlify.com'];

router.get('/', corsWithOptions({ whitelist, stagingWhitelist }), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.options(
  '/mail/subscriber/new',
  corsWithOptions({ whitelist, stagingWhitelist })
);

router.post(
  '/mail/subscriber/new',
  corsWithOptions({ whitelist, stagingWhitelist }),
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
      await mailchimp.post({
        path: `/lists/${listId}`,
        body: data
      });
      res.json({ success: 'Thank you for subscribing.' });
    } catch (error) {
      console.log(error);
      res.status(503).json({ error });
      return next(new Error(error));
    }
  }
);

module.exports = router;

var express = require('express');
var router = express.Router();
var cors = require('cors');
var mailgun = require('mailgun-js');
var multer = require('multer');

router.options('/', cors());

router.get('/', cors(), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.post('/', cors(), (_, res) => {
  res.json({
    title: 'API Post Route',
    message: 'you posted at the api route'
  });
});

router.options('/messages', cors());

router.post(
  '/messages',
  cors(),
  multer().single('attachment'),
  async (req, res) => {
    /* eslint-disable no-console */
    try {
      // make new mailgun instance
      const domainName = process.env.MAILGUN_DOMAIN_NAME;
      const mg = mailgun({
        apiKey: process.env.MAILGUN_DEV_API_KEY,
        domain: domainName
      });
      // get fields from the request file and body.
      const { from, to, subject, text } = req.body;
      const attachment = new mg.Attachment({
        data: req.file.buffer,
        filename: req.file.originalname
      });
      // send the email and wait for the OK reply
      const resolve = await mg.messages().send({
        from,
        to,
        subject,
        text,
        attachment
      });

      console.log(resolve);

      res.json({
        message: resolve
      });
    } catch (error) {
      console.log(error);
      res.status(503).json({ error });
    }
  }
);

module.exports = router;

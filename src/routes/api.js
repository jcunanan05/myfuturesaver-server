var express = require('express');
var router = express.Router();
var cors = require('cors');
var mailgun = require('mailgun-js');
var multer = require('multer');
const emailContent = require('../content/respUploadEmailContent');

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

router.post('/messages', cors(), multer().single('file'), async (req, res) => {
  /* eslint-disable no-console */
  const domainName = process.env.MAILGUN_DOMAIN_NAME;
  const mg = mailgun({
    apiKey: process.env.MAILGUN_DEV_API_KEY,
    domain: domainName
  });
  try {
    // const { name, email, kidsNames, respStatementType } = req.body;
    console.log('body req: ', req.body, 'file req: ', req.file);

    // const success = await mg.messages().send({
    //   from: `${name} <noreply@myfuturesaver.org>`,
    //   to: [`${process.env.MAILGUN_SEND_TO_EMAIL}`],
    //   subject: 'Automated Email from Applicant',
    //   text: emailContent({ name, email, kidsNames, respStatementType }),
    //   attachment: files
    // });

    // console.log(success);

    res.json({
      message: 'Post Success',
      body: req.body,
      file: req.file
    });
  } catch (error) {
    console.log('error on attachment', error);
    res.json(503, error);
  }
});

module.exports = router;

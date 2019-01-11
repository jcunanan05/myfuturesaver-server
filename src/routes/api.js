var express = require('express');
var router = express.Router();
var cors = require('cors');
var mailgun = require('mailgun-js');
const path = require('path');
const fs = require('fs');

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

router.post('/messages', cors(), async (req, res) => {
  /* eslint-disable no-console */
  const domainName = process.env.MAILGUN_DOMAIN_NAME;
  const mg = mailgun({
    apiKey: process.env.MAILGUN_DEV_API_KEY,
    domain: domainName
  });
  try {
    const { email, name } = req.body;
    const attachment = path.join(__dirname, '../../public/images/sample.png');

    console.log('attachment directory', attachment);

    const success = await mg.messages().send({
      from: `${name} <noreply@myfuturesaver.org>`,
      to: [`${process.env.MAILGUN_SEND_TO_EMAIL}`],
      subject: 'Automated Email from Applicant',
      text: `
Hi User,

This is a Sample Email from ${name}. His/her email is ${email}

Attachment is found below. Thank you.
      `,
      attachment
    });

    console.log(success);

    res.json({
      message: 'Post Success',
      body: req.body,
      success
    });
  } catch (error) {
    console.log('error on attachment', error);
    res.json(503, error);
  }
});

module.exports = router;

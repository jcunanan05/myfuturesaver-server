const express = require('express');
const router = express.Router();
const { corsWithOptions } = require('../../controllers/corsController');

/**
 * sgMail route - separated /mail route to /sgMail to separate mailgun with sendgrid. Will migrate later.
 */

/**
 * Send Route - send a simple mail. without attachment.
 * @param {string} to - email send to
 * @param {string} from - email from
 * @param {string} subject - email title/subject
 * @param {string} text - email message
 * @param {string} [html] - optional html email message
 */

router.post('/send', (__, res) => {
  res.json({
    message: 'send endpoint hit'
  });
});

router.options('/send', corsWithOptions());

module.exports = router;

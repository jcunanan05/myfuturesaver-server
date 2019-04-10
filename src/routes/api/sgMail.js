const express = require('express');
const router = express.Router();
const { corsWithOptions } = require('../../controllers/corsController');
const { sendMail } = require('../../libs/sendgrid');

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
router.post('/send', async (req, res) => {
  res.json({ message: 'ok' });
});

router.options('/send', corsWithOptions());

module.exports = router;

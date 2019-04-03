const express = require('express');
const router = express.Router();

/**
 * sgMail route - separated /mail route to /sgMail to separate mailgun with sendgrid. Will migrate later.
 */

router.get('/', (__, res) => {
  res.json({
    message: 'endpoint hit'
  });
});

module.exports = router;

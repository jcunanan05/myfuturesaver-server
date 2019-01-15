var express = require('express');
var router = express.Router();
var cors = require('cors');
var mailgun = require('mailgun-js');
var multer = require('multer');
const DEVELOPMENT = process.env.NODE_ENV === 'development';

// allowed websites for CORS()
var whitelist = ['https://myfuturesaver.org/'];
var corsWithOptions = () => {
  if (DEVELOPMENT) return cors();
  // production config
  return cors(function(req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  });
};

router.get('/', corsWithOptions(), (_, res) => {
  res.json({
    title: 'API route.',
    message: 'You hit the api route'
  });
});

router.post('/', corsWithOptions(), (_, res) => {
  res.json({
    title: 'API Post Route',
    message: 'you posted at the api route'
  });
});

router.options('/mail/clb-statement', cors());

router.post(
  '/mail/clb-statement',
  corsWithOptions(),
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

      // set no sniff headers for chrome CORB security
      res.append(
        'Acess-Control-Allow-Headers',
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Origin'
      );
      res.append('X-Content-Type-Options', 'nosniff');
      res.append('Access-Control-Allow-Origin', '*');
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

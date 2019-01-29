const mailgunLibrary = require('mailgun-js');

const sendEmailWithAttachment = async (req, res, next) => {
  try {
    // mailgun instance
    const mailgun = mailgunLibrary({
      apiKey: process.env.MAILGUN_DEV_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME
    });
    // get fields from the request file and body.
    const { from, to, subject, text } = req.body;
    let attachment;
    if (!req.file) {
      const error = 'No Attachment found.';
      res.status(422).json({ error });
      // dont execute code below when no attachment
      return next(new Error(error));
    }
    attachment = new mailgun.Attachment({
      data: req.file.buffer,
      filename: req.file.originalname
    });
    // send the email and wait for the OK reply
    const resolve = await mailgun.messages().send({
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
};

const sendSuccessMail = async (req, res) => {
  try {
    // mailgun instance
    const mailgun = mailgunLibrary({
      apiKey: process.env.MAILGUN_DEV_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME
    });
    const { from, to, subject, text } = req.body;
    const resolve = await mailgun.messages().send({
      from,
      to,
      subject,
      text
    });
    console.log(resolve);
    res.json({
      message: resolve
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      error
    });
  }
};

exports.sendEmailWithAttachment = sendEmailWithAttachment;
exports.sendSuccessMail = sendSuccessMail;
module.exports = {
  sendEmailWithAttachment,
  sendSuccessMail
};

const cors = require('cors');

const addCorbResponse = (_, res, next) => {
  // allow responses to Chrome for CORB security. more info at https://www.chromium.org/Home/chromium-security/corb-for-developers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
};

const corsWithOptions = (
  { whitelistedUrls, whitelistedStagingUrls } = {
    whitelistedUrls: [
      'https://myfuturesaver.org',
      'https://www.myfuturesaver.org'
    ],
    whitelistedStagingUrls: ['https://dev-myfuturesaver.netlify.com']
  }
) => {
  var DEVELOPMENT = process.env.NODE_ENV;
  var STAGING = process.env.DEPLOYMENT_ENV;
  const whitelist = whitelistedUrls ? whitelistedUrls : [];
  if (DEVELOPMENT) return cors();
  if (STAGING)
    whitelist.concat(whitelistedStagingUrls ? whitelistedStagingUrls : []);

  return cors(function(req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    // callback expects two parameters: error and options
    callback(null, corsOptions);
  });
};

exports.addCorbResponse = addCorbResponse;
exports.corsWithOptions = corsWithOptions;
module.exports = {
  corsWithOptions,
  addCorbResponse
};

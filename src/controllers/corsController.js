var cors = require('cors');
var whitelist = ['https://myfuturesaver.org', 'https://www.myfuturesaver.org'];

const addCorbResponse = (_, res, next) => {
  // allow responses to Chrome for CORB security. more info at https://www.chromium.org/Home/chromium-security/corb-for-developers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
};

exports.addCorbResponse = addCorbResponse;

// allowed websites for CORS()
const corsWithOptions = () => {
  const DEVELOPMENT = process.env.NODE_ENV === 'development';
  const STAGING = process.env.DEPLOYMENT_ENV === 'staging';
  if (DEVELOPMENT) return cors();
  // Add CORS whitelist on client staging website
  if (STAGING) whitelist.push('https://dev-myfuturesaver.netlify.com');
  const optionsDelegate = function(req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };
  return cors(optionsDelegate);
};

exports.addCorbResponse = addCorbResponse;
exports.corsOptions = corsWithOptions;
module.exports = {
  corsWithOptions,
  addCorbResponse
};

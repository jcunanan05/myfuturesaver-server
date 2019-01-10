var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
const DEVELOPMENT = process.env.NODE_ENV === 'development';

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// dotenv configuration for dev environments.
if (DEVELOPMENT) {
  dotenv.config({ path: './.env.development' });
}

app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES Definition
app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;

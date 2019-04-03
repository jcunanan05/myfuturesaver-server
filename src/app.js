if (process.env.NODE_ENV === 'development')
  require('dotenv').config({ path: './.env.development' }); // dotenv configuration for dev environments.
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/index');

var app = express();

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

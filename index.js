'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);
const config = require('./config/config.js');
const loki = require('lokijs');
const db = require('./helpers/db').db('blue-harvest-db.json');

//SERVER
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', require('./controllers/index.js'));
app.use('/customers', require('./controllers/customers.js'));
app.use('/accounts', require('./controllers/accounts.js'));
app.use('/accounts/transactions', require('./controllers/transactions.js'));

//generic error handler
app.use(function(err, req, res, next) {
// Do logging and user-friendly error message display
    console.error(err);
    return res.json(err); 
})

// START THE SERVER
// =============================================================================

var server = app.listen(config.server.port);
console.log("App listening on port 8080");
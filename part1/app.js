var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    // user: '',
    // password: '',
    database: 'sakila',
    // waitForConnections: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = app;
// module.exports.pool = pool;

app.use(function(req, res, next) {
    req.pool = pool;
    next();
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');





var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

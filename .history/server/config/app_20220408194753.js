/*
Group project
Comp 229 Sec003
Winter 2022
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let flash = require('connect-flash');
let session = require('express-session');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy; 

//Database setup
let mongoose = require('mongoose');
let dbURI = require('./db');

// Connect to the Database
mongoose.connect(dbURI.AtlasDB);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

let indexRouter = require('../routes/index');
let surveyRouter = require('../routes/survey');
let userRouter = require('../routes/user');
const passport = require('passport');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

app.use('/', indexRouter);
app.use('/survey', surveyRouter);
app.use('/users', userRouter);

//initialize Passport
app.use(passport.initialize());
app.use(passport.session());

let userModel = require('../models/user');
let User = userModel.User;

//implement user Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//initialize Flash
app.use(flash());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

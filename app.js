var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,useUnifiedTopology:true
},(error)=>{
  if(error){errorHandler(error)}else{
    console.log("database connected Successfully");
  }
});

var indexRouter = require('./routes/index');
var superRouter = require('./routes/super');
var helperRouter = require('./routes/helper');
var branchRouter = require('./routes/branch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/super', superRouter);
app.use('/api/v1/branch', branchRouter);
app.use('/api/v1/helper', helperRouter);

//Custom error Handler
app.use(errorHandler);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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

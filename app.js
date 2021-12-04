var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
global.__basedir = __dirname;


// routes
var routeCategory = require('./app_server/routes/route.category.js');
var routeSubCategory = require('./app_server/routes/route.sub_category.js');
var routeItem = require('./app_server/routes/route.item.js');
var routeAdmin = require('./app_server/routes/route.admin.js');


var cors = require('cors')


var app = express();
app.use(cors())

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://tech8580:ar8580@cluster0.k83xl.mongodb.net/christmasar?retryWrites=true';
//let dev_db_url = 'mongodb://localhost:27017/STL';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// Api request limit increase to 50mb for base64 string (image upload)
app.use(express.json({limit: '250mb', extended: true}));
app.use(express.urlencoded({limit: '250mb', extended: true }));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// routes call
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to STL App Backend"
})

});



app.use('/category', routeCategory);
app.use('/sub_category', routeSubCategory);
app.use('/item', routeItem);
app.use('/admin', routeAdmin);



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
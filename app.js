var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var vuforia = require('vuforiajs');
const mongoose = require('mongoose');
global.__basedir = __dirname;

const { accessKey,secretKey } = require('./config/config');

// routes
var routeCategory = require('./app_server/routes/route.category.js');
var routeProduct = require('./app_server/routes/route.product.js');
var routeAdmin = require('./app_server/routes/route.admin.js');
var routeVariation = require('./app_server/routes/route.variation.js');


var cors = require('cors')


var app = express();
app.use(cors())

let dev_db_url = 'mongodb://localhost:27017/STL';
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
app.use('/images', express.static(__dirname + '/images'));

var client = vuforia.client({
  'accessKey': accessKey,
  'secretKey': secretKey,
});      

var util = vuforia.util();
var target = {

  // name of the target, unique within a database
  'name': 'Argon',
  // width of the target in scene unit
  'width': 32.0,
  // the base64 encoded binary recognition image data
  'image': util.encodeFileBase64('./images/argon.jpg'),
  // indicates whether or not the target is active for query
  'active_flag': true,
  // the base64 encoded application metadata associated with the target
  'application_metadata': util.encodeBase64('here is some data')
};

client.addTarget(target, function (error, result) {

  if (error) { // e.g. [Error: AuthenticationFailure]

      console.error(result);
      /* result would look like
          {
          result_code: 'AuthenticationFailure',
          transaction_id: '58b51ddc7a2c4ac58d405027acf5f99a'
          }
          */

  } else {

      console.log(result);
      /* result will look like
          {
          target_id: '93fd6681f1r74b76bg80tf736a11b6a9',
          result_code: 'TargetCreated',
          transaction_id: 'xf157g63179641c4920728f1650d1626'
          }
          */
  }
});

app.use('/category', routeCategory);
app.use('/item', routeProduct);
app.use('/admin', routeAdmin);
app.use('/variation', routeVariation);



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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
global.__basedir = __dirname;



// routes
var routeCategory = require('./app_server/routes/route.category.js');
var routeProduct = require('./app_server/routes/route.product.js');
var routeAdmin = require('./app_server/routes/route.admin.js');
var routeVariation = require('./app_server/routes/route.variation.js');
var routeMenu = require('./app_server/routes/route.menu.js');
var routeCompany = require('./app_server/routes/route.company.js');
var routeLanguage = require('./app_server/routes/route.language.js');
var routeTranslation = require('./app_server/routes/route.translation.js');
var routeParts = require('./app_server/routes/route.parts.js');
var routeTexture = require('./app_server/routes/route.texture.js');
var routeTranslationCategory = require('./app_server/routes/route.translationcategories.js');
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

app.use('/category', routeCategory);
app.use('/products', routeProduct);
app.use('/admin', routeAdmin);
app.use('/variation', routeVariation);
app.use('/menu', routeMenu);
app.use('/company',routeCompany);
app.use('/language',routeLanguage);
app.use('/translation',routeTranslation);
app.use('/parts',routeParts);
app.use('/texture',routeTexture);
app.use('/transCat',routeTranslationCategory);


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

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});



module.exports = app;

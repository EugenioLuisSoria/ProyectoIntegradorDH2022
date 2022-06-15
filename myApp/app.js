const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const session = require('express-session')

//ROUTERs
const mainRouter = require('./src/routes/mainRouter');
const productsRouter = require('./src/routes/productsRouter');
const userRouter = require('./src/routes/userRouter');
const productsApiRouter = require('./src/routes/api/productsApiRouter')
const userApiRouter = require('./src/routes/api/userApiRouter')

const app = express();
//MIDDLEWAREs
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')

// view engine setup
app.set('views', path.resolve('./src/views'));   
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))
app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false
}));

//a Router
app.use('/', userLoggedMiddleware, mainRouter);
app.use('/products', userLoggedMiddleware, productsRouter);
app.use('/user', userLoggedMiddleware, userRouter);
app.use('/api/products/', productsApiRouter);
app.use('/api/users/', userApiRouter);


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

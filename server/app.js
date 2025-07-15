const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bikesRouter = require('./routes/bikesRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

//1)global middleware
//set security http headers
app.use(helmet());
//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit request from same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this ip, please try again in an hour',
});
app.use('/api', limiter);

//body parser, reading datafrom body to req.body
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//data sanitization against nosql query
app.use(mongoSanitize());
//data sanitization against xss
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'difficulty',
      'price',
    ],
  }),
);
//serving static files
app.use(express.static(`${__dirname}/public`));
//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/bikes', bikesRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in this server`);
  // err.statusCode = 404;
  // err.status = 'failed';
  next(new AppError(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

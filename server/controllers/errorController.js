const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(
    /dup key: { name: "([^"]+)" }/,
  )[1];
  const message = `duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('invalid token. Please login again', 401);

const handleJWTExpiredError = () =>
  new AppError('your token has expired. Please login again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  ////programming or other unknown error: don't leak error details
  else {
    //1) log error
    console.error('ERROR!!!', err);

    //2)send generic message
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack); //to print out where error happend with entire call stack
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(Object.getPrototypeOf(err));
    Object.defineProperties(error, Object.getOwnPropertyDescriptors(err));

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDublicateFieldsDB(error);
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    } else if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};

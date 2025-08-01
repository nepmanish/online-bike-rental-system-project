class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'err';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); //to not add constructor call of AppError class to stack trace
  }
}

module.exports = AppError;

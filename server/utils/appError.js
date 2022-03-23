class AppError extends Error {
  constructor(message, statusCode) {
    //parent call to set incoming message
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    //operational errors that i can predict
    this.isOperational = true;
    //shows where the error happened i.e the line it happened
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;

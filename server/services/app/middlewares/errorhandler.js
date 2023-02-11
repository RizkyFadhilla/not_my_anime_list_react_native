function ErrorHandler(err, req, res, next) {
  let code = "";
  let message = "";
  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Error";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = "Email Already Use";
  } else if ((err.name = "ERROR_INVALID_EMAIL_OR_PASSWORD")) {
    code = 401;
    message = "ERROR_INVALID_EMAIL_OR_PASSWORD";
  } else if ((err.name = "DATA_NOT_FOUND")) {
    code = 404;
    message = "DATA_NOT_FOUND";
  } else if ((err.name = "Please_Login")) {
    code = 403;
    message = "Please_Login";
  } else if ((err.name = "You Don't Have Authorize")) {
    code = 403;
    message = "You Don't Have Authorize";
  } else {
    code = 500;
    message = "Internal Service Error";
  }
  res.status(code).json({ message });
}
module.exports = ErrorHandler;

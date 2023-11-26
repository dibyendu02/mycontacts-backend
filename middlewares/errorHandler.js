const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERR:
      res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "not authorized", message: err.message, stackTrace: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "forbidden err", message: err.message, stackTrace: err.stack });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "not found", message: err.message, stackTrace: err.stack });
      break;
    case constants.SERVER_ERR:
      res.json({ title: "server error", message: err.message, stackTrace: err.stack });
      break;
    default:
      console.log("no error, all good")
      break;
  }
  res.json({ message: err.message, stackTrace: err.stack });
};

module.exports = { errorHandler };

const { GeneralError } = require("../utils/error");


const handleError = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    return res
      .status(code)
      .json({ code: err.getCode(), name: err.name, message: err.message });
  }

  return res.status(500).json({ code: 500, message: "internal sever error" });
};

 module.exports = handleError;
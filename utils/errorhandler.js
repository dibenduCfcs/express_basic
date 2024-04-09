const errorhandler = (error, req, res, next) => {
  console.log(error.message);
  res.status(200).json({
    meta: {
      status_code: 0,
      status_message: error.message,
    },
  });
  next();
};

module.exports = errorhandler;

module.exports = function (req, res, next) {
  req.query.id = req.query.appId;
  delete req.query.appId;
  next();
};


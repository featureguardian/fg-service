module.exports = function (req, res, next) {
  if (req.body) {
    req.body.id = req.body.appId;
    delete req.body.appId;
  }

  req.query.id = req.query.appId;
  delete req.query.appId;
  next();
};


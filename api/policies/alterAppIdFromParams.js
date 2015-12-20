module.exports = function (req, res, next) {
  req.query.id = req.query.app_id;
  delete req.query.app_id;
  next();
}; 
 

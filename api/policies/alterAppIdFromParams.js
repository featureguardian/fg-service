module.exports = function (req, res, next) {
  if(req.body){
  	req.body.id = req.body.app_id;
  	delete req.body.app_id;
  }
  
  req.query.id = req.query.app_id;
  delete req.query.app_id;
  next();
}; 
 

/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
/* jshint undef:false */
/* eslint no-undef: 0 */

module.exports = function (req, res, next) {

  //if authenticated from login ui, allow access to api
  if(req.session.authenticated){
    if(req.body){
      req.body.app_id = req.session.app_id;
    }
    
    req.query.app_id = req.session.app_id;
    return next();
  } 

  var token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0],
        credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('authToken')) {
    token = req.param('authToken');

    // We delete the token from param to not mess with blueprints
    delete req.query.authToken;
  } else {
    return res.json(401, { err: 'No Authorization header was found' });
  }

  jwToken.verify(token, function (err, token) {
    if (err) return res.json(401, {err: 'Invalid Token!'});
    req.token = token; // This is the decrypted token or the payload you provided
    // Add app_id to query to prevent access to other apps in featureguardian
    if(req.body){
      req.body.app_id = token.id;
    }
    
    req.query.app_id = token.id;
    next();
  });
};

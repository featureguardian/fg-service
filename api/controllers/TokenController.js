/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {
	find: function(req, res) {
		//var userCriteria = {provider_id: req.param('provider_id'), app_id: req.param('app_id'), email: req.param('email')};
		Application.findOne({ id: req.param('app_id') }, function(err, app) {
		    if(err) return res.json(400, err);
		    if(!app) return res.json(401, {success: false, message: 'Unauthorized: application does not exist'});

		    var token = jwt.sign(app, sails.config.authSecret.secret, {
			  expiresIn: '1d' // expires in 24 hours
		    });

		    // return the information including token as JSON
		   res.json({
		     success: true,
		     message: 'Enjoy your token!',
		     token: token
		   });
		});
    	}
};
	

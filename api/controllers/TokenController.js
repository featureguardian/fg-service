/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	find: function(req, res) {
		//var userCriteria = {provider_id: req.param('provider_id'), app_id: req.param('app_id'), email: req.param('email')};
		Application.findOne({ id: req.param('app_id') }, function(err, app) {
		    if(err) return res.json(400, err);
		    if(!app) return res.json(401, {success: false, message: 'Unauthorized: application does not exist'});

		    // return the information including token as JSON
		   res.json({
		     success: true,
		     message: 'Enjoy your token!',
		     token: jwToken.issue(app)
		   });
		});
    	}
};
	

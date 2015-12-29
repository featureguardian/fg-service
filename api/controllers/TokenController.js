/**
 * TokenController
 *
 * @description :: Server-side logic for managing tokens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */
/* jshint undef:false */

module.exports = {

  /**
   * Returns a token for an application
   * @param req requires 'appId' to be provided
   * @param res
     */
  find: function (req, res) {
    //const userCriteria = {provider_id: req.param('provider_id'), appId: req.param('appId'), email: req.param('email')};
    Application.findOne({ id: req.param('appId') }, function (err, app) {
      if (err) return res.json(400, err);
      if (!app) return res.json(401, { success: false, message: 'Unauthorized: application does not exist' });

		    // return the information including token as JSON
		   res.json({
		     success: true,
		     message: 'Enjoy your token!',
		     token: jwToken.issue(app)
		   });
		});
    	},
    findByAppEmail: function(req, res){
    	Application.findOne({ id: req.param('app_id'), email: req.param('email') }, function(err, app) {
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


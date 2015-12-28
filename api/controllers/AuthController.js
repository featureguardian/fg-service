/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (request, response) {
	    return response.view('Auth/index', {
	      currentDate: (new Date()).toString(), 
	      layout: 'authLayout'
	    });
    },

    login: function function_name (req, res) {
    	Application.findOne(req.body, function(err, app){
    		if(err) return res.view('Auth/index');
    		if(!app) return res.view('Auth/index');
    		//send to admin index and start Angular SPA from that point on
    		req.session.authenticated = true;
    		req.session.app_id = app.id;
    		res.redirect('/admin');
    	});
    }
	
};


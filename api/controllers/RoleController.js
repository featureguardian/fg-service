/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOrCreate: function(req, res) {
		var roleCriteria = {app_id: req.param('app_id'), name: req.param('name')};
		RoleService.findOrCreate(roleCriteria, req.allParams(), function(err, role) {
		    if(err) return res.json(400, err);
		    res.json(role);
		});
    	}
};


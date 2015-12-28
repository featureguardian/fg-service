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
    	},

	find: function(req, res){
		var custom_attrs;
		if(req.query.custom_attributes){
			if(_.isArray(req.query.custom_attributes)){
				custom_attrs = req.query.custom_attributes;
			}
			else{
				custom_attrs = [];
				custom_attrs.push(req.query.custom_attributes);
			}
		}
		
		delete req.query.custom_attributes;
		var attrs = [];
		
		Role.find(req.query).populateAll().exec(function(err, roles){
			if(err) return res.json(400, err);
			if(custom_attrs){
				_.forEach(custom_attrs, function(s){
					var arr = s.split(':');
					var o = { key: arr[0], value: arr[1] };
					attrs.push(o);
				});
				var rs = _.filter(roles, function(r){
					var retVal = false;
					_.forEach(attrs, function(attr){
						retVal = _.some(r.custom_attributes, attr);
						if(retVal){
							//break loop
							return false;
						}
					});
					return retVal;
				});
				return res.json(rs);
				//return res.json(_.where(roles, { custom_attributes: attrs }));

			}
			res.json(roles);
		});
	}
	/*create: function(req, res){
		console.log(req.body.custom_attributes);
		var custom_attrs = JSON.parse(req.body.custom_attributes);

		delete req.body.custom_attributes;
		console.log(req.body);
		Role.create(req.allParams(), function(err, role){
			if(err) return res.json(400, err);
			if(custom_attrs){
				_.forEach(custom_attrs, function(attr){
					attr.role_id = role.id;
				});
				console.log(custom_attrs);
			}
			res.json(role);
		});
	}*/
};


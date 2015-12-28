/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findOrCreate: function(req, res) {
        var userCriteria = {provider_id: req.param('provider_id'), app_id: req.param('app_id'), email: req.param('email')};
        UserService.findOrCreate(userCriteria, req.allParams(), function(err, user) {
	    if(err) return res.json(400, err);
            res.json(user);
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
		
		User.find(req.query).populateAll().exec(function(err, users){
			if(err) return res.json(400, err);
			if(custom_attrs){
				_.forEach(custom_attrs, function(s){
					var arr = s.split(':');
					var o = { key: arr[0], value: arr[1] };
					attrs.push(o);
				});
				var usrs = _.filter(users, function(u){
					var retVal = false;
					_.forEach(attrs, function(attr){
						retVal = _.some(u.custom_attributes, attr);
						if(retVal){
							//break loop
							return false;
						}
					});
					return retVal;
				});
				return res.json(usrs);
				//return res.json(_.where(roles, { custom_attributes: attrs }));

			}
			res.json(users);
		});
	},
    assignToRole: function(req, res) {
	var roleId = req.param('role_id');
		User.findOne({id: req.param('user_id')}, function(err, user) {
		    if(err) return res.json(400, err);
		    if(!user) return res.json(401, 'User not found');

		    Role.findOne({id: roleId}, function(err, role){
				if(err) return res.json(400, err);
				if(!role) return res.json(401, 'Role not found');
				if(role.app_id != user.app_id) return res.json(400, 'Role does not belong to this users application');
				user.roles.add(roleId);
		    	user.save(function(err, user){
		    		//User.findOne({id: req.param('user_id')}).populateAll().exec(function(err, user){
		    		res.json(user);
		    		//});
		    	});
		    	
		    	
	        });
	    });
    },
    rolesNotIn: function(req, res){
    	var userId = req.param('user_id');
    	Role.find(req.query).populate('users').exec(function(err, roles){
    		if(err) return res.json(400, err);
    		var filtered = 
    			_.filter(roles, function(role){
    				var inRole = _.some(role.users, {id: userId});
    				return !inRole;
    			});
    		res.json(filtered);
    	});
    },
    removeFromRole: function(req, res) {
		var roleId = req.param('role_id');
		UserService.findOne({id: req.param('user_id')}, function(err, user) {
		    if(err) return res.json(400, err);
		    if(!user) return res.json(401, 'User not found');
		    if(_.isArray(roleId)){
				_.forEach(roleId, function(id){
					user.roles.remove(id);
				});
		    }
		    else {
				user.roles.remove(roleId);
		    }
		    
		    user.save(function(err, user){
		    	res.json(user);
		    });
		    	
	    });
    },
    entitlementsNotIn: function(req, res){
    	var userId = req.param('user_id');
    	Entitlement.find(req.query).populate('users').exec(function(err, entitlements){
    		if(err) return res.json(400, err);
    		var filtered = 
    			_.filter(entitlements, function(entitlement){
    				var hasEntitlement = _.some(entitlement.users, {id: userId});
    				return !hasEntitlement;
    			});
    		res.json(filtered);
    	});
    },
    giveEntitlement: function(req, res) {
		var entitlementId = req.param('entitlement_id');
		UserService.findOne({id: req.param('user_id')}, function(err, user) {
		    if(err) return res.json(400, err);
		    if(!user) return res.json(401, 'User not found');
		    
		    Entitlement.findOne({id: entitlementId}, function(err, entitlement){
				if(err) return res.json(400, err);
				if(!entitlement) return res.json(401, 'Entitlement not found');
				if(entitlement.app_id != user.app_id) return res.json(400, 'Entitlement does not belong to this users application');
				user.entitlements.add(entitlementId);
		    	user.save(function(err, user){
		    		res.json(user);
		    	});
		    	
	        });
	    });
    },
    removeEntitlement: function(req, res) {
		var entitlementId = req.param('entitlement_id');
		UserService.findOne({id: req.param('user_id')}, function(err, user) {
		    if(err) return res.json(400, err);
		    if(!user) return res.json(401, 'User not found');
		    if(_.isArray(entitlementId)){
				_.forEach(entitlementId, function(id){
					user.entitlements.remove(id);
				});
		    }
		    else {
				user.entitlements.remove(entitlementId);
		    }
		    
		    user.save(function(err, user){
		    	res.json(user);
		    });
		    
	    });
    }
};


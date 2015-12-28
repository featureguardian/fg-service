/**
* Entitlement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  
  attributes: {
	
	name: { type: 'string', required: true },
	app_id: { type: 'string', required: true, model: 'application' },
	roles: { collection: 'role', via: 'entitlements' },
	users: { collection: 'user', via: 'entitlements' },
	custom_attributes: { collection: 'customattribute', via: 'entitlement_id' },
	type: { type: 'integer' }
  },

  beforeCreate: function (values, cb) {
    

    async.parallel([
    function(callback){
        Application.find({id: values.app_id}).exec(function(err, apps){
		if(err) return callback(err);
		if(apps.length == 0){
		   var err = {
		      code: 'E_UNIQUE',
		      details: 'Invalid app_id',
		      model: 'application',
		      invalidAttributes: {
			app_id: values.app_id
		      },
		      status: 400
		   }
		   return callback(err);
		}
		callback(null);
    	});
    },
    function(callback){
	/*if(values.role_id){
		Role.find({id: values.role_id, app_id: values.app_id}).exec(function(err, roles){
			if(err) return callback(err);
			if(roles.length == 0){
			   var err = {
			      code: 'E_UNIQUE',
			      details: 'Invalid role_id',
			      model: 'entitlement',
			      invalidAttributes: {
				role_id: values.role_id
			      },
			      status: 400
			   }
			   return callback(err);
			}
			return callback(null);
    		});
	} 
	else {
        	callback(null);
	}*/
	callback(null);
    }],
    function(err, results){
    	if(err) return cb(err);
	cb();
    });

  },
  afterDestroy: function(destroyedRecords, cb) {
        
        RoleEntitlementUserRestriction.destroy({entitlement_id: _.pluck(destroyedRecords, 'id')}).exec(function(){
        	CustomAttribute.destroy({entitlement_id: _.pluck(destroyedRecords, 'id')}).exec(cb);
        });
        
  }
};


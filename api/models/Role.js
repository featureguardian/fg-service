/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
	name: { type: 'string', required: true, unique: true },
	app_id: { type: 'string', required: true, model: 'application' },
	users: { collection: 'user', via: 'roles' },
	entitlements: { collection: 'entitlement', via: 'roles' }
  },

  beforeCreate: function (values, cb) {
    Application.find({id: values.app_id}).exec(function(err, apps){
	if(err) return cb(err);
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
	   return cb(err);
	}
	cb();
    });
  },

  beforeDestroy: function(criteria, cb) {
     //Role.find(criteria).exec(function(err, rolesToDestroy) {	
	//_.forEach(rolesToDestroy, function(role){
		
	//});
     //});
	cb();
  },
  afterDestroy: function(destroyedRecords, cb) {
        
        RoleEntitlementUserRestriction.destroy({role_id: _.pluck(destroyedRecords, 'id')}).exec(cb);
  }
};


/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	email: { type: 'email', required: true },
	app_id: { type: 'string', required: true, model: 'application' },
	provider_id: { type: 'string', required: true },
	roles: { collection: 'role', via: 'users' },
	entitlements: { collection: 'entitlement', via: 'users' },
	roleEntitlementRestrictions: { collection: 'roleentitlementuserrestriction', via: 'user_id' }
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
  afterDestroy: function(destroyedRecords, cb) {
        
        RoleEntitlementUserRestriction.destroy({user_id: _.pluck(destroyedRecords, 'id')}).exec(cb);
  }
};


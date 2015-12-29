/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/* jshint undef:false */

module.exports = {

  schema: true,

  attributes: {
	email: { type: 'email', required: true },
	app_id: { type: 'string', required: true, model: 'application' },
	provider_id: { type: 'string', required: true },
	roles: { collection: 'role', via: 'users' },
	entitlements: { collection: 'entitlement', via: 'users' },
	roleEntitlementRestrictions: { collection: 'roleentitlementuserrestriction', via: 'userId' },
	custom_attributes: { collection: 'customattribute', via: 'user_id' },
	type: { type: 'integer' }
  },

  beforeCreate: function (values, cb) {
    Application.find({ id: values.appId }).exec(function (err, apps) {
      if (err) return cb(err);
      if (apps.length === 0) {
        const err2 = {
          code: 'E_UNIQUE',
          details: 'Invalid appId',
          model: 'application',
          invalidAttributes: {
            appId: values.appId
          },
          status: 400
        };
        return cb(err2);
      }

      cb();
    });
  },
  afterDestroy: function(destroyedRecords, cb) {

        RoleEntitlementUserRestriction.destroy({user_id: _.pluck(destroyedRecords, 'id')}).exec(function(){
        	CustomAttribute.destroy({user_id: _.pluck(destroyedRecords, 'id')}).exec(cb);
        });

  }
};


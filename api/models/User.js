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
    appId: { type: 'string', required: true, model: 'application' },
    providerId: { type: 'string', required: true },
    roles: { collection: 'role', via: 'users' },
    entitlements: { collection: 'entitlement', via: 'users' },
    roleEntitlementRestrictions: { collection: 'roleentitlementuserrestriction', via: 'userId' },
    customAttributes: { collection: 'customattribute', via: 'userId' },
    type: { type: 'string' }
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

  afterDestroy: function (destroyedRecords, cb) {

    RoleEntitlementUserRestriction.destroy({ userId: _.pluck(destroyedRecords, 'id') }).exec(function () {
      CustomAttribute.destroy({ userId: _.pluck(destroyedRecords, 'id') }).exec(cb);
    });

  }
};


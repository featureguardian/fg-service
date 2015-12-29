/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/* jshint undef:false */

module.exports = {

  schema: true,

  attributes: {
    name: { type: 'string', required: true, unique: true },
    appId: { type: 'string', required: true, model: 'application' },
    users: { collection: 'user', via: 'roles' },
    entitlements: { collection: 'entitlement', via: 'roles' },
    customAttributes: { collection: 'customattribute', via: 'roleId' },
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

  beforeDestroy: function (criteria, cb) {
    //Role.find(criteria).exec(function(err, rolesToDestroy) {
    //_.forEach(rolesToDestroy, function(role){

    //});
    //});
    cb();
  },

  afterDestroy: function (destroyedRecords, cb) {

    RoleEntitlementUserRestriction.destroy({ roleId: _.pluck(destroyedRecords, 'id') }).exec(function () {
      CustomAttribute.destroy({ roleId: _.pluck(destroyedRecords, 'id') }).exec(cb);
    });

  }
};


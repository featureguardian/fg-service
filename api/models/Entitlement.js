/**
 * Entitlement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/* jshint undef:false */

module.exports = {

  schema: true,

  attributes: {

    name: { type: 'string', required: true },
    appId: { type: 'string', required: true, model: 'application' },
    roles: { collection: 'role', via: 'entitlements' },
    users: { collection: 'user', via: 'entitlements' },
    customAttributes: { type: 'array' },
    type: { type: 'integer' }
  },

  beforeCreate: function (values, cb) {

    async.parallel([
      function (callback) {
        Application.find({ id: values.appId }).exec(function (err, apps) {
          if (err) return callback(err);
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
            return callback(err2);
          }

          callback(null);
        });
      },

      function (callback) {
          /*if(values.role_id){
           Role.find({id: values.role_id, appId: values.appId}).exec(function(err, roles){
           if(err) return callback(err);
           if(roles.length == 0){
           const err = {
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

      function (err /*, results*/) {
        if (err) return cb(err);
        cb();
      });

  },

  afterDestroy: function (destroyedRecords, cb) {

    RoleEntitlementUserRestriction.destroy({ entitlementId: _.pluck(destroyedRecords, 'id') }).exec(cb);
  }
};

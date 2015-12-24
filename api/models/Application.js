/**
 * Application.js
 *
 * @description :: An application must be created by a client application and is where all entitlements and users
 * will be maintained and kept in isolation from all other applicaitons.
 *
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {
    name: {type: 'string', required: true, unique: false},
    email: {type: 'email', required: true, unique: false},
    custom_attributes: {type: 'array'}
  },

  afterDestroy: function (destroyedRecords, cb) {

    RoleEntitlementUserRestriction.destroy({app_id: _.pluck(destroyedRecords, 'id')}).exec(cb);

  }
};


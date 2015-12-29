/**
 * Application.js
 *
 * @description :: An application must be created by a client application and is where all entitlements and users
 * will be maintained and kept in isolation from all other applicaitons.
 *
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
/* jshint undef:false */

module.exports = {

  schema: true,

  attributes: {

    name: {type: 'string', required: true, unique: false},
    email: {type: 'email', required: true, unique: false},
    custom_attributes: { collection: 'customattribute', via: 'application_id' }

  },

  afterDestroy: function (destroyedRecords, cb) {


    RoleEntitlementUserRestriction.destroy({app_id: _.pluck(destroyedRecords, 'id')}).exec(function(){
    	CustomAttribute.destroy({applicationId: _.pluck(destroyedRecords, 'id')}).exec(cb);
    });


  }
};


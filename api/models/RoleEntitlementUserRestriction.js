/**
* RoleEntitlementUserRestriction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	appId: { type: 'string', required: true, model: 'application' },
	roleId: { type: 'string', required: true, model: 'role' },
	entitlementId: { type: 'string', required: true, model: 'entitlement' },
	userId: { type: 'string', required: true, model: 'user' }
  }

};


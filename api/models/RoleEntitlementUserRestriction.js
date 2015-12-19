/**
* RoleEntitlementUserRestriction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	role_id: { type: 'string', required: true, model: 'role' },
	entitlement_id: { type: 'string', required: true, model: 'entitlement' },
	user_id: { type: 'string', required: true, model: 'user' }
  }

};


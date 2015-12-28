/**
* CustomAttribute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

  	app_id: { type: 'string' },
  	key: { type: 'string', required: true },
  	value: { type: 'string', required: true },
  	user_id: { model: 'user' },
  	role_id: { model: 'role' },
  	entitlement_id: { model: 'entitlement' },
  	application_id: { model: 'application' }

  }
};


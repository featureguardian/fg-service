/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
/* jshint undef:false */

module.exports.bootstrap = function(cb) {

  /*
  Nate: Multi-column constraints are not supported yet in Sails.  Will have to deal with this
  explicitly if we want a unique constraint on name/e-mail.  E-mail was added to represent
  a primary owner of an application.  Eventually can be used to support an OAuth handshake.

	Application.native(function(err, collection) {
	  collection.ensureIndex('name', {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });
  */

   Role.native(function(err, collection) {
	  collection.ensureIndex({name: 1, appId: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   Entitlement.native(function(err, collection) {
	  collection.ensureIndex({name: 1, appId: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   User.native(function(err, collection) {
	  collection.ensureIndex({email: 1, appId: 1, providerId: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   RoleEntitlementUserRestriction.native(function(err, collection) {
	  collection.ensureIndex({roleId: 1, entitlementId: 1, userId: 1, appId: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   CustomAttribute.native(function(err, collection) {
	  collection.ensureIndex({key: 1, application_id: 1, user_id: 1, entitlement_id: 1, role_id: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

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

module.exports.bootstrap = function(cb) {

	Application.native(function(err, collection) {
	  collection.ensureIndex('name', {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   Role.native(function(err, collection) {
	  collection.ensureIndex({name: 1, app_id: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   Entitlement.native(function(err, collection) {
	  collection.ensureIndex({name: 1, app_id: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   User.native(function(err, collection) {
	  collection.ensureIndex({email: 1, app_id: 1, provider_id: 1}, {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
   });

   RoleEntitlementUserRestriction.native(function(err, collection) {
	  collection.ensureIndex({role_id: 1, entitlement_id: 1, user_id: 1}, {
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

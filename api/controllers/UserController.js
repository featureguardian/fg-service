/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */
/* jshint undef:false */

module.exports = {
  findOrCreate: function (req, res) {
    var userCriteria = { providerId: req.param('provider_id'), appId: req.param('appId'), email: req.param('email') };
    UserService.findOrCreate(userCriteria, req.allParams(), function (err, user) {
      if (err) return res.json(400, err);
      res.json(user);
    });
  },

  assignToRole: function (req, res) {
    var roleId = req.param('role_id');
    UserService.findOne({ id: req.param('user_id') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');

      Role.findOne({ id: roleId }, function (err, role) {
        if (err) return res.json(400, err);
        if (!role) return res.json(401, 'Role not found');
        if (role.appId !== user.appId) return res.json(400, 'Role does not belong to this users application');
        user.roles.add(roleId);
        user.save(console.log);
        res.json(user);
      });
    });
  },

  removeFromRole: function (req, res) {
    var roleId = req.param('role_id');
    UserService.findOne({ id: req.param('user_id') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');
      if (_.isArray(roleId)) {
        _.forEach(roleId, function (id) {
          user.roles.remove(id);
        });
      } else {
        user.roles.remove(roleId);
      }

      user.save(console.log);
      res.json(user);
    });
  },

  giveEntitlement: function (req, res) {
    var entitlementId = req.param('entitlement_id');
    UserService.findOne({ id: req.param('user_id') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');
      /*var hasEntitlement = false;
       _.forEach(user.roles, function(role){
       var ent = _.findWhere(role.entitlements, { id: entitlementId });
       if(ent){
       hasEntitlement = true;
       return false;
       }
       });
       if(hasEntitlement){
       return res.json(user);
       }*/
      Entitlement.findOne({ id: entitlementId }, function (err, entitlement) {
        if (err) return res.json(400, err);
        if (!entitlement) return res.json(401, 'Entitlement not found');
        if (entitlement.appId !== user.appId) return res.json(400, 'Entitlement does not belong to this users application');
        user.entitlements.add(entitlementId);
        user.save(console.log);
        res.json(user);
      });
    });
  },

  removeEntitlement: function (req, res) {
    var entitlementId = req.param('entitlement_id');
    UserService.findOne({ id: req.param('user_id') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');
      if (_.isArray(entitlementId)) {
        _.forEach(entitlementId, function (id) {
          user.entitlements.remove(id);
        });
      } else {
        user.entitlements.remove(entitlementId);
      }

      user.save(console.log);
      res.json(user);
    });
  }
};


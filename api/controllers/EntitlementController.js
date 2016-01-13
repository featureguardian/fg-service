/**
 * EntitlementController
 *
 * @description :: Server-side logic for managing entitlements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 * jshint undef:false
 */
/* jshint undef:false */

module.exports = {
  assignToRole: function (req, res) {
    const roleId = req.param('roleId');
    const appId = req.param('appId');
    const entitlementId = req.param('entitlementId');
    Entitlement.findOne({ id: entitlementId, appId: appId }, function (entFindError, entitlement) {
      if (entFindError) return res.json(400, entFindError);
      if (!entitlement) return res.json(401, 'Entitlement not found');

      Role.findOne({ id: roleId, appId: appId }, function (findError, role) {
        if (findError) return res.json(400, findError);
        if (!role) return res.json(401, 'Role not found');
        if (role.appId !== entitlement.appId) return res.json(400, 'Entitlement does not belong to this users application');
        role.entitlements.add(entitlement.id);
        role.save(function(err) {
          if (err) return res.json(400, err);
          res.json(entitlement);
        });
      });
    });
  },

  removeFromRole: function (req, res) {
    const roleId = req.param('roleId');
    const entitlementId = req.param('entitlementId');
    const appId = req.param('appId');
    Role.findOne({ id: roleId, appId: appId }, function (err, role) {
      if (err) return res.json(400, err);
      if (!role) return res.json(401, 'Role not found');
      if (_.isArray(entitlementId)) {
        _.forEach(entitlementId, function (id) {
          role.entitlements.remove(id);
        });
      } else {
        role.entitlements.remove(entitlementId);
      }

      role.save(function(err, r) {
        RoleEntitlementUserRestriction.destroy({entitlementId: entitlementId, roleId: roleId, appId: appId}, function(err, r) {
          //just delete for now
        });

        Entitlement.findOne({ id: entitlementId, appId: appId }, function (err, entitlement) {
          res.json(entitlement);
        });
      });
    });
  },

  entitlementsNotInRole: function(req, res) {
    const roleId = req.param('roleId');
    Entitlement.find(req.query).populate('roles').exec(function (err, entitlements) {
      if (err) return res.json(400, err);
      const filtered =
        _.filter(entitlements, function (entitlement) {
          const hasRole = _.some(entitlement.roles, { id: roleId });
          return !hasRole;
        });

      res.json(filtered);
    });
  },

  usersNotInEntitlement: function(req, res) {
    'use strict';
    const appId = req.param('appId');
    const entitlementId = req.param('entitlementId');
    User.find({appId: appId}).populate('entitlements').exec(function (err, users) {
      if (err) return res.json(400, err);
      const filtered =
        _.filter(users, function (user) {
          const hasEntitlement = _.some(user.entitlements, { id: entitlementId });
          return !hasEntitlement;
        });

      res.json(filtered);
    });
  }
};

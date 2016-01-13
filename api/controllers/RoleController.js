/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */
/* jshint undef:false */

module.exports = {
  findOrCreate: function (req, res) {
    'use strict';
    const roleCriteria = { appId: req.param('appId'), name: req.param('name') };
    RoleService.findOrCreate(roleCriteria, req.allParams(), function (err, role) {
      if (err) return res.json(400, err);
      res.json(role);
    });
  },

  find: function (req, res) {
    'use strict';
    let customAttrs;
    if (req.query.customAttributes) {
      if (_.isArray(req.query.customAttributes)) {
        customAttrs = req.query.customAttributes;
      } else {
        customAttrs = [];
        customAttrs.push(req.query.customAttributes);
      }
    }

    delete req.query.customAttributes;
    const attrs = [];

    Role.find(req.query).populateAll().exec(function (err, roles) {
      if (err) return res.json(400, err);
      if (customAttrs) {
        _.forEach(customAttrs, function (s) {
          const arr = s.split(':');
          const o = { key: arr[0], value: arr[1] };
          attrs.push(o);
        });

        const rs = _.filter(roles, function (r) {
          let retVal = false;
          _.forEach(attrs, function (attr) {
            retVal = _.some(r.customAttributes, attr);
            if (retVal) {
              //break loop
              return false;
            }
          });

          return retVal;
        });

        return res.json(rs);

        //return res.json(_.where(roles, { customAttributes: attrs }));

      }

      res.json(roles);
    });
  },

  addToEntitlement: function (req, res) {
    const roleId = req.param('roleId');
    const appId = req.param('appId');
    const entitlementId = req.param('entitlementId');
    Entitlement.findOne({ id: entitlementId, appId: appId }, function (err, entitlement) {
      if (err) return res.json(400, err);
      if (!entitlement) return res.json(401, 'Entitlement not found');

      Role.findOne({ id: roleId, appId: appId }, function (findError, role) {
        if (findError) return res.json(400, findError);
        if (!role) return res.json(401, 'Role not found');
        if (role.appId !== entitlement.appId) return res.json(400, 'Entitlement does not belong to this users application');
        role.entitlements.add(entitlement.id);
        role.save(function(err, role) {
          res.json(role);
        });
      });
    });
  },

  removeFromEntitlement: function (req, res) {
    const roleId = req.param('roleId');
    const entitlementId = req.param('entitlementId');
    const appId = req.param('appId');
    Entitlement.findOne({ id: entitlementId, appId: appId }, function (err, entitlement) {
      if (err) return res.json(400, err);
      if (!entitlement) return res.json(401, 'Entitlement not found');
      if (_.isArray(roleId)) {
        _.forEach(roleId, function (id) {
          entitlement.roles.remove(id);
        });
      } else {
        entitlement.roles.remove(roleId);
      }

      entitlement.save(function(err, r) {
        RoleEntitlementUserRestriction.destroy({entitlementId: entitlementId, roleId: roleId, appId: appId}, function(err, r) {
          //just delete for now
        });

        Role.findOne({ id: roleId, appId: appId }, function (err, role) {
          res.json(role);
        });
      });
    });
  },

  rolesNotInEntitlement: function(req, res) {
    const entitlementId = req.param('entitlementId');
    Role.find(req.query).populate('entitlements').exec(function (err, roles) {
      if (err) return res.json(400, err);
      const filtered =
        _.filter(roles, function (role) {
          const hasEntitlement = _.some(role.entitlements, { id: entitlementId });
          return !hasEntitlement;
        });

      res.json(filtered);
    });
  }
};


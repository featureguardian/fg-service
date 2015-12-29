/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */
/* jshint undef:false */

const Controller = require('./Controller.js');

module.exports = {

  findOrCreate: function (req, res) {
    'use strict';
    const userCriteria = {
      providerId: req.param('providerId'),
      appId: req.param('appId'),
      email: req.param('email')
    };
    UserService.findOrCreate(userCriteria, req.allParams(), function (err, user) {
      if (err) return res.json(400, err);
      res.json(user);
    });
  },

  /**
   * Overrides built-in sales find method
   * @param req
   * @param res
   */
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

    User.find(req.query).populateAll().exec(function (err, users) {
      if (err) return res.json(400, err);
      if (customAttrs) {
        _.forEach(customAttrs, function (s) {
          const arr = s.split(':');
          const o = { key: arr[0], value: arr[1] };
          attrs.push(o);
        });

        const usrs = _.filter(users, function (u) {
          let retVal = false;
          _.forEach(attrs, function (attr) {
            retVal = _.some(u.customAttributes, attr);
            if (retVal) {
              //break loop
              return false;
            }
          });

          return retVal;
        });

        return res.json(usrs);

        //return res.json(_.where(roles, { customAttributes: attrs }));

      }

      res.json(users);
    });
  },

  assignToRole: function (req, res) {
    'use strict';
    const userId = req.param('userId');
    const roleId = req.param('roleId');

    //Look for the user
    User.findOne({ id: userId }, function (err, user) {

      let response = Controller.checkResponseForData(res, err, user, 'User not found');
      if (!response) {

        //Look for the role
        Role.findOne({ id: roleId }, function (err2, role) {

          let response = Controller.checkResponseForData(res, err2, role, 'Role not found');
          if (!response) {

            if (role.appId !== user.appId) {
              response = res.json(400, 'Role does not belong to this users application');
            }
            else {
              user.roles.add(roleId);
              user.save(function (e, u) {
                //User.findOne({id: req.param('userId')}).populateAll().exec(function(err, user){
                response = res.json(u);
                //});
              });
            }
          }
        });
      }
      return response;
    });
  },

  rolesNotIn: function (req, res) {
    'use strict';
    const userId = req.param('userId');
    Role.find(req.query).populate('users').exec(function (err, roles) {
      if (err) return res.json(400, err);
      const filtered =
        _.filter(roles, function (role) {
          const inRole = _.some(role.users, { id: userId });
          return !inRole;
        });

      res.json(filtered);
    });
  },

  removeFromRole: function (req, res) {
    const roleId = req.param('roleId');
    UserService.findOne({ id: req.param('userId') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');
      if (_.isArray(roleId)) {
        _.forEach(roleId, function (id) {
          user.roles.remove(id);
        });
      } else {

        user.roles.remove(roleId);
      }

      user.save(function (e, u) {
        res.json(u);
      });
    });
  },

  entitlementsNotIn: function (req, res) {
    'use strict';
    const userId = req.param('userId');
    Entitlement.find(req.query).populate('users').exec(function (err, entitlements) {
      if (err) return res.json(400, err);
      const filtered =
        _.filter(entitlements, function (entitlement) {
          const hasEntitlement = _.some(entitlement.users, { id: userId });
          return !hasEntitlement;
        });

      res.json(filtered);
    });
  },

  giveEntitlement: function (req, res) {
    'use strict';
    const entitlementId = req.param('entitlementId');
    UserService.findOne({ id: req.param('userId') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');

      Entitlement.findOne({ id: entitlementId }, function (err2, entitlement) {
        if (err2) return res.json(400, err2);
        if (!entitlement) return res.json(401, 'Entitlement not found');
        if (entitlement.appId !== user.appId) return res.json(400, 'Entitlement does not belong to this users application');
        user.entitlements.add(entitlementId);
        user.save(function (e, u) {
          res.json(u);
        });
      });
    });
  },

  removeEntitlement: function (req, res) {
    'use strict';
    const entitlementId = req.param('entitlementId');
    UserService.findOne({ id: req.param('userId') }, function (err, user) {
      if (err) return res.json(400, err);
      if (!user) return res.json(401, 'User not found');
      if (_.isArray(entitlementId)) {
        _.forEach(entitlementId, function (id) {
          user.entitlements.remove(id);
        });
      } else {

        user.entitlements.remove(entitlementId);
      }

      user.save(function (e, u) {
        res.json(u);
      });
    });
  }
};

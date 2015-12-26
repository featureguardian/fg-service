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
    var roleId = req.param('role_id');
    Entitlement.findOne({id: req.param('entitlement_id')}, function (err, entitlement) {
      if (err) return res.json(400, err);
      if (!entitlement) return res.json(401, 'Entitlement not found');

      Role.findOne({id: roleId}, function (err, role) {
        if (err) return res.json(400, err);
        if (!role) return res.json(401, 'Role not found');
        if (role.appId !== entitlement.appId) return res.json(400, 'Entitlement does not belong to this users application');
        role.entitlements.add(entitlement.id);
        role.save(console.log);
        res.json(role);
      });
    });
  },
  removeFromRole: function (req, res) {
    var roleId = req.param('role_id');
    var entitlementId = req.param('entitlement_id');
    Role.findOne({id: roleId}, function (err, role) {
      if (err) return res.json(400, err);
      if (!role) return res.json(401, 'Role not found');
      if (_.isArray(entitlementId)) {
        _.forEach(entitlementId, function (id) {
          role.entitlements.remove(id);
        });
      }
      else {
        role.entitlements.remove(entitlementId);
      }

      role.save(console.log);
      res.json(role);
    });
  }
};


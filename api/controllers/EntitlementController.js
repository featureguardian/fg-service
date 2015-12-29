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
    Entitlement.findOne({ id: req.param('entitlementId') }, function (err, entitlement) {
      if (err) return res.json(400, err);
      if (!entitlement) return res.json(401, 'Entitlement not found');

      Role.findOne({ id: roleId }, function (findError, role) {
        if (findError) return res.json(400, findError);
        if (!role) return res.json(401, 'Role not found');
        if (role.appId !== entitlement.appId) return res.json(400, 'Entitlement does not belong to this users application');
        role.entitlements.add(entitlement.id);
        role.save(sails.log);
        res.json(role);
      });
    });
  },

  removeFromRole: function (req, res) {
    const roleId = req.param('roleId');
    const entitlementId = req.param('entitlementId');
    Role.findOne({ id: roleId }, function (err, role) {
      if (err) return res.json(400, err);
      if (!role) return res.json(401, 'Role not found');
      if (_.isArray(entitlementId)) {
        _.forEach(entitlementId, function (id) {
          role.entitlements.remove(id);
        });
      } else {
        role.entitlements.remove(entitlementId);
      }

      role.save(sails.log);
      res.json(role);
    });
  }
};

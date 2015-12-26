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
    var roleCriteria = {appId: req.param('appId'), name: req.param('name')};
    RoleService.findOrCreate(roleCriteria, req.allParams(), function (err, role) {
      if (err) return res.json(400, err);
      res.json(role);
    });
  },

  find: function (req, res) {
    var customAttrs;
    if (req.query.customAttributes) {
      if (_.isArray(req.query.customAttributes)) {
        customAttrs = req.query.customAttributes;
      }
      else {
        customAttrs = [];
        customAttrs.push(req.query.customAttributes);
      }
    }

    delete req.query.customAttributes;
    var attrs = [];

    Role.find(req.query, function (err, roles) {
      if (err) return res.json(400, err);
      if (customAttrs) {
        _.forEach(customAttrs, function (s) {
          var arr = s.split(':');
          var o = {key: arr[0], value: arr[1]};
          attrs.push(o);
        });
        var rs = _.filter(roles, function (r) {
          var retVal = false;
          _.forEach(attrs, function (attr) {
            retVal = _.some(r.customAttributes, attr);
          });
          return retVal;
        });
        return res.json(rs);
        //return res.json(_.where(roles, { customAttributes: attrs }));

      }
      res.json(roles);
    });
  }
};


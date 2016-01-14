/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

 var blueprintConfig = require('./blueprints');

var ROUTE_PREFIX = blueprintConfig.blueprints.prefix || "";

// add global prefix to manually defined routes
function addGlobalPrefix(routes) {
  var paths = Object.keys(routes),
      newRoutes = {};

  if(ROUTE_PREFIX === "") {
    return routes;
  }

  paths.forEach(function(path) {
    var pathParts = path.split(" "),
        uri = pathParts.pop(),
        prefixedURI = "", newPath = "";

      prefixedURI = ROUTE_PREFIX + uri;

      pathParts.push(prefixedURI);

      newPath = pathParts.join(" ");
      // construct the new routes
      newRoutes[newPath] = routes[path];
  });

  return newRoutes;
};

module.exports.routes = addGlobalPrefix({

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'post /user/assignToRole/:userId/:roleId': {
    controller: 'UserController',
    action: 'assignToRole',
    skipAssets: true
  },

  'post /user/removeFromRole/:userId/:roleId' : {
    controller: 'UserController',
    action: 'removeFromRole',
    skipAssets: true
  },

  'get /user/rolesNotIn/:userId': {
    controller: 'UserController',
    action: 'rolesNotIn',
    skipAssets: true
  },

  'get /user/notInRole/:roleId': {
    controller: 'UserController',
    action: 'notInRole',
    skipAssets: true
  },

  'post /user/giveEntitlement/:userId/:entitlementId' : {
    controller: 'UserController',
    action: 'giveEntitlement',
    skipAssets: true
  },

  'post /user/removeEntitlement/:userId/:entitlementId' : {
    controller: 'UserController',
    action: 'removeEntitlement',
    skipAssets: true
  },

  'get /user/entitlementsNotIn/:userId': {
    controller: 'UserController',
    action: 'entitlementsNotIn',
    skipAssets: true
  },

  'get /entitlement/entitlementsNotInRole/:roleId': {
    controller: 'EntitlementController',
    action: 'entitlementsNotInRole',
    skipAssets: true
  },

  'post /entitlement/removeFromRole/:roleId/:entitlementId': {
    controller: 'EntitlementController',
    action: 'removeFromRole',
    skipAssets: true
  },

  'post /entitlement/assignToRole/:roleId/:entitlementId': {
    controller: 'EntitlementController',
    action: 'assignToRole',
    skipAssets: true
  },

  'get /entitlement/usersNotInEntitlement/:entitlementId': {
    controller: 'EntitlementController',
    action: 'usersNotInEntitlement',
    skipAssets: true
  },

  'post /role/removeFromEntitlement/:entitlementId/:roleId': {
    controller: 'RoleController',
    action: 'removeFromEntitlement',
    skipAssets: true
  },

  'get /role/rolesNotInEntitlement/:entitlementId' : {
    controller: 'RoleController',
    action: 'rolesNotInEntitlement',
    skipAssets: true
  },

  'post /role/addToEntitlement/:entitlementId/:roleId' : {
    controller: 'RoleController',
    action: 'addToEntitlement',
    skipAssets: true
  }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

});

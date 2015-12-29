/* jshint undef:false */

module.exports = {

  findOrCreate: function (userCriteria, user, next) {
    User.findOrCreate(userCriteria, user).exec(function (err, u) {
      if (err) return next(err, null);
      next(null, u);
    });
  },

  findOne: function (userCriteria, next) {
    User.findOne(userCriteria).exec(function (err, u) {
      if (err) return next(err, null);
      next(null, u);
    });
  }

};

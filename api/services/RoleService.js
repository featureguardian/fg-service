module.exports = {
 
  findOrCreate: function(roleCriteria, role, next) {
    Role.findOrCreate(roleCriteria, role).exec(function(err, r) {
      if(err) return next(err, null);
      next(null, r);
    });
  }

};

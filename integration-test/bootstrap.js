var Sails = require('sails');
var sails;

module.exports = {

  before: function (done) {

    if (!sails) {

      // Increase the Mocha timeout so that Sails has enough time to lift.
      this.timeout(5000);

      Sails.lift({
        // configuration for testing purposes
      }, function (err, server) {
        sails = server;
        if (err) return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
      });

      //request(sails.hooks.http.app).post('/user').send({ email: 'userOne@fg.com', appId: 'app1', providerId: 'userOneProvider' });

    } else
    {
      done();
    }

  },

  after: function (done) {
    // here you can clear fixtures, etc.
    Sails.lower(done);
  }
}




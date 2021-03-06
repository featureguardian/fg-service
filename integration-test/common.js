var Sails = require('sails');
var sails;


before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    // configuration for testing purposes
  }, function (err, server) {
    sails = server;
    if (err) {
      console.log('Error occurred:', err);
      return done(err);
    }
    // here you can load fixtures, etc.

    done(err, sails);
  });

  //request(sails.hooks.http.app).post('/user').send({ email: 'userOne@fg.com', appId: 'app1', providerId: 'userOneProvider' });
});

after(function (done) {
  // here you can clear fixtures, etc.
  Sails.lower(function () {
    sails.log.info('Sails are down');
    done();
  });

});

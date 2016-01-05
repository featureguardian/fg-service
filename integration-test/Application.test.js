/**
 * Created by nate on 12/22/15.
 */
var expect = require('chai').expect;
var request = require('supertest');
var common = require('./common');

//var Bootstrap = require('./bootstrap');
//before(Bootstrap.before);
//after(Bootstrap.after);

describe('Create Application', function () {
  describe('should return a new application', function () {

    var createPayload = { name: 'IT Post Test App', email: 'admin@featureguardian.com' };

    it('when email and name are provided', function (done) {
      request(sails.hooks.http.app)
        .post('/application')
        .send(createPayload)
        .expect(201).expect(responseChecker)
        .end(done);
    });

    it('when a duplicate email and name are provided', function (done) {
      request(sails.hooks.http.app)
        .post('/application')
        .send(createPayload)
        .expect(201).expect(responseChecker)
        .end(done);
    });

    function responseChecker(res) {
      if (!res.body.id) throw new Error("ID was not generated");
      if (!res.body.name) throw new Error("Name was not returned");
      //console.log(res.body);
    }

  });
});


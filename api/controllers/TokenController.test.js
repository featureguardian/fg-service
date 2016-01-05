
const ControllerTest = require('./_Controller.test');

const expect = require('chai').expect;
const wolfpack = require('wolfpack');

//Module under test
const TokenController = require('./TokenController');

describe('Token Controller', function () {

  //Wolfpack didn't work with the service, this was easy enough
  global.jwToken = {
    issue: function () {
      return 'tokenvalue';
    }
  };

  beforeEach(function () {
    ControllerTest.reset();
  });

  //*****************************************************************
  //*********************** BEGIN TEST CASES ************************
  //*****************************************************************
  describe('Find', function () {

    it('should return new token when appId is provided and Application is found', function () {
      wolfpack.setFindResults({
        id: '123'
      });
      const res = ControllerTest.getResponse();

      TokenController.find(ControllerTest.getRequest('123'), res);

      const json = res.json.lastCall.args[0];
      expect(json.message).to.equal('Enjoy your token!');
      expect(json.token).to.equal('tokenvalue');
    });

    it('should return 401 response code when appId is not provided', function () {
      const res = ControllerTest.getResponse();

      TokenController.find(ControllerTest.getRequest(undefined), res);

      expect(res.json.lastCall.args[0]).to.equal(401);
      expect(res.json.lastCall.args[1].message).to.equal('Unauthorized: application does not exist');
    });

  });
});

var expect = require('chai').expect;
var sinon = require('sinon');
var wolfpack = require('wolfpack');

//Module under test
var TokenController = require('./TokenController');

//No need to do any mocking of the request here, just provide a vanilla stub
function getRequest(appId) {
  return {
    param: function(name) {
      return name === 'app_id' ? appId : 'Wrong Param Name';
    }
  };
}

//Use Sinon to create a stub so we can verify the response
function getResponse() {
  return {
    json: sinon.stub() // stub the function to check results only.
  };
}

describe('Token Controller', function() {

  //Wolfpack gets us true unit tests for Sails, read more on the Github page
  global.Application = wolfpack('api/models/Application');
  //Wolfpack didn't work with the service, this was easy enough
  global.jwToken = {
    issue: function(app) {
      return "tokenvalue";
    }
  };

  beforeEach(function() {
    wolfpack.resetSpies();
    //clears any fake db responses that have been previously set by any or all of the setFindResults, setCreateResults, and/or setUpdateResults methods, no exceptions whatsoever.
    wolfpack.clearResults();
  });

  //*****************************************************************
  //*********************** BEGIN TEST CASES ************************
  //*****************************************************************
  describe('Find', function() {

    it('should return new token when app_id is provided and Application is found', function() {
      wolfpack.setFindResults({
        id: '123'
      });
      var res = getResponse();

      TokenController.find(getRequest('123'), res);

      var json = res.json.lastCall.args[0];
      expect(json.message).to.equal('Enjoy your token!');
      expect(json.token).to.equal('tokenvalue');
    });

    it('should return 401 response code when app_id is not provided', function() {
      var res = getResponse();

      TokenController.find(getRequest(undefined), res);

      expect(res.json.lastCall.args[0]).to.equal(401);
      expect(res.json.lastCall.args[1].message).to.equal('Unauthorized: application does not exist');
    });


  });
});

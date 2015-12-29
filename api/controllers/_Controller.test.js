const expect = require('chai').expect;
const sinon = require('sinon');
const wolfpack = require('wolfpack');

//Wolfpack gets us true unit tests for Sails, read more on the Github page
global.Application = wolfpack('api/models/Application');
global.Role = wolfpack('api/models/Role');
global.User = wolfpack('api/models/User');

module.exports = {

  /**
   * Resets wolfpack spies and results for the next test run.
   */
  reset: function () {
    wolfpack.resetSpies();

    //clears any fake db responses that have been previously set by any or all of the setFindResults, setCreateResults, and/or setUpdateResults methods, no exceptions whatsoever.
    wolfpack.clearResults();
  },

  /**
   * Constructs a request object for testing controllers
   * @param
   * @returns {{param: param}}
   */
  getRequest: function (appId) {
    //No need to do any mocking of the request here, just provide a vanilla stub
    return {
      param: function (name) {
        return name === 'appId' ? appId : 'Wrong Param Name';
      }
    };
  },

  /**
   * Use Sinon to create a stub so we can verify the response
   * @returns {{json: SinonStub}}
   */
  getResponse: function () {
    return {
      json: sinon.stub() // stub the function to check results only.
    };
  }

};

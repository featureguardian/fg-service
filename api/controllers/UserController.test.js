const ControllerTest = require('./_Controller.test');
const expect = require('chai').expect;
const sinon = require('sinon');
const wolfpack = require('wolfpack');

//Module under test
const UserController = require('./UserController');


describe('User Controller', function () {

  beforeEach(function () {
    ControllerTest.reset();
  });

  //*****************************************************************
  //*********************** BEGIN TEST CASES ************************
  //*****************************************************************

  describe('Assign to Role', function () {

    it('Role is added to use when valid role and app are provided', function () {

      //Arrange
      var addedRole;
      const mockUser = sinon.mock(User);
      //Simulate a save
      mockUser.save = function( cb ) { cb(undefined, { data: 'mockResponse' } ); };
      //Expect the right role to be added
      mockUser.roles = { add: function(roleId) { addedRole = roleId } };
      mockUser.appId = 'appId';
      User.setFindResults({ id: 1 }, [mockUser]);
      Role.setFindResults({ id: 2 }, { id: 2, appId: 'appId' });

      const res = ControllerTest.getResponse();
      const req = {
        param: function (name) {
          return name === 'userId' ? 1 :
            name === 'roleId' ? 2 : '';
        }
      }

      //Act
      UserController.assignToRole(req, res);

      //Assert
      expect(addedRole).to.equal(2);
      const json = res.json.lastCall.args[0];
      expect(json.data).to.equal('mockResponse');

    });

  });


});

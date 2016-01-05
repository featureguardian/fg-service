const ControllerTest = require('./_Controller.test');
const expect = require('chai').expect;
const sinon = require('sinon');

//Module under test
const UserController = require('./UserController');

describe('User Controller', function () {

  'use strict';

  beforeEach(function () {
    ControllerTest.reset();
  });

  //*****************************************************************
  //*********************** BEGIN TEST CASES ************************
  //*****************************************************************

  describe('Assign to Role', function () {

    it('Role is added to use when valid role and app are provided', function () {

      //Arrange
      let addedRole;
      const mockUser = sinon.mock(User);

      //Simulate a save
      mockUser.save = function (cb) {
        cb(undefined, { data: 'mockResponse' });
      };

      //Expect the right role to be added
      mockUser.roles = {
        add: function (roleId) {
          addedRole = roleId;
        }
      };

      mockUser.appId = 'appId';
      User.setFindResults({ id: 1 }, [mockUser]);
      Role.setFindResults({ id: 2 }, { id: 2, appId: 'appId' });

      const res = ControllerTest.getResponse();
      const req = {
        param: function (name) {
          let value = '';
          if (name === 'userId') value = 1;
          else if (name === 'roleId') value = 2;
          return value;
        }
      };

      //Act
      UserController.assignToRole(req, res);

      //Assert
      expect(addedRole).to.equal(2);
      const json = res.json.lastCall.args[0];
      expect(json.data).to.equal('mockResponse');

    });

  });

});

'use strict';

var userServices = angular.module('userServices', ['ngRoute', 'ngResource']);

var SERVICE_ROOT = 'http://localhost:8080/';

userServices.factory('User', ['$resource',
  function(res) {
    return res(SERVICE_ROOT + 'user/:userId');
  }]);

userServices.factory('Group', ['$resource',
  function(res) {
    return res(SERVICE_ROOT + 'group/:groupId');
  }]);

userServices.factory('UsersGroup', ['$resource',
  function(res) {
    return res(SERVICE_ROOT + 'user/:userId/group/:groupId', {userId: '@userId'});
  }]);

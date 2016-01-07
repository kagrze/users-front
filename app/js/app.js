'use strict';

var userApp = angular.module('userApp', ['ngRoute', 'ngResource', 'userControllers']);

userApp.config(['$routeProvider', function(rp) {
  rp.
    when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'UserListCtrl'
    }).
    when('/user', {
      templateUrl: 'partials/new-user.html',
      controller: 'NewUserCtrl'
    }).
    when('/user/:userId', {
      templateUrl: 'partials/users-groups.html',
      controller: 'UsersGroupsCtrl'
    }).
    when('/user/:userId/group', {
      templateUrl: 'partials/new-users-group.html',
      controller: 'NewUsersGroupCtrl'
    }).
    when('/groups', {
      templateUrl: 'partials/groups.html',
      controller: 'GroupListCtrl'
    }).
    when('/group', {
      templateUrl: 'partials/new-group.html',
      controller: 'NewGroupCtrl'
    }).
    otherwise({
      redirectTo: '/users'
    });
}]);

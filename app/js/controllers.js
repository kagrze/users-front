'use strict';

var userControllers = angular.module('userControllers', ['ngRoute', 'ngResource', 'userServices']);

var errorHandler = function() { alert('Operation not permitted or something went wrong in the back-end. Check server logs.'); };

userControllers.controller('UserListCtrl', ['$scope', 'User',
  function(scp, Usr) {
    scp.users = Usr.query();

    scp.remove = function(userId) {
      Usr.remove({userId: userId}, function() {
        scp.users = Usr.query();
      }).$promise.catch(errorHandler);
    };
  }]);

userControllers.controller('UsersGroupsCtrl', ['$scope', '$routeParams', 'User', 'UsersGroup', 'Group',
  function(sc, rp, Usr, UsrsGroup, Grp) {
    sc.user = Usr.get({userId: rp.userId});
    var tmp = UsrsGroup.query({userId: rp.userId}, function() {
      sc.userGroups = tmp.map(function(usersGrp) { return Grp.get({groupId: usersGrp.groupId}) });
    });

    sc.remove = function(groupId) {
      UsrsGroup.remove({userId: rp.userId, groupId: groupId}, function() {
        var tmp = UsrsGroup.query({userId: rp.userId}, function() {
          sc.userGroups = tmp.map(function(usersGrp) { return Grp.get({groupId: usersGrp.groupId}) });
        });
      });
    };
  }]);

userControllers.controller('NewUsersGroupCtrl', ['$scope', '$routeParams', '$location', 'User', 'UsersGroup', 'Group',
  function(sc, rp, loc, Usr, UsrsGroup, Grp) {
    sc.user = Usr.get({userId: rp.userId});
    sc.userGroups = UsrsGroup.query({userId: rp.userId}, function() {
      var allGroups = Grp.query(function() {
        sc.allNonAssignedGroups = allGroups.filter(
          function(grp) {
            var intersection = sc.userGroups.filter(function(usersGroup) { return usersGroup.groupId == grp.id; });
            return intersection.length == 0;
        });
      });
    });
    sc.newUserGroup = new UsrsGroup({userId: rp.userId});

    sc.assign = function() {
      sc.newUserGroup.groupId = sc.selectedGroup.id;
      sc.newUserGroup.$save(function() {
        loc.path('/user/' + rp.userId);
      });
    };
  }]);

userControllers.controller('NewUserCtrl', ['$scope', '$location', 'User',
  function(sc, loc, Usr) {
    sc.user = new Usr();

    sc.save = function() {
      sc.user.$save(function() {
        loc.path('/users');
      });
    };
  }]);

userControllers.controller('GroupListCtrl', ['$scope', 'Group',
  function(scp, Grp) {
    scp.groups = Grp.query();

    scp.remove = function(groupId) {
      Grp.remove({groupId: groupId}, function() {
        scp.groups = Grp.query();
      }).$promise.catch(errorHandler);
    };
  }]);

userControllers.controller('NewGroupCtrl', ['$scope', '$location', 'Group',
  function(sc, loc, Grp) {
    sc.group = new Grp();

    sc.save = function() {
      sc.group.$save(function() {
        loc.path('/groups');
      });
    };
  }]);

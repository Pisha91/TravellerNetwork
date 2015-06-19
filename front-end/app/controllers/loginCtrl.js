'use strict';

angular.module('travellerNetwork')
.controller('loginCtrl', ['$scope', function($scope) {
        $scope.SignIn = function(){
          console.log('sign in ' + $scope.login + ' ' + $scope.password);
        };
}]);
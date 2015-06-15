'use strict';

angular.module('travellerNetwork')
.controller('loginCtrl', ['$scope', function($scope) {
        console.log('Hi!');
        $scope.SignIn = function(){
          console.log('sign in ' + $scope.login + ' ' + $scope.password);
        };
}]);
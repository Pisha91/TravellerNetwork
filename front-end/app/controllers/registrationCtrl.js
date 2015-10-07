'use strict';

var travellerNetwork = angular.module('travellerNetwork')
travellerNetwork.controller('registrationCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.submited = false;
    $scope.submit = function(account){
        $scope.submited = true;
        if($scope.registartionForm.$valid) {
            $http.post('http://localhost:3000/registration', account)
                .then(
                function (response) {
                    $location.path('/registratonsuccess');
                },
                function (response) {
                    console.log(response);
                    $scope.submited = false;
                });
        }
    };
}]);
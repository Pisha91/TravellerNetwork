'use strict';

angular.module('travellerNetwork')
.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.signIn = function(){
          console.log('sign in ' + $scope.email + ' ' + $scope.password);
            var tokendata = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post('http://localhost:3000/signin', tokendata).then(
                function(response){
                    console.log(response);
                },
                function(response){
                    console.log(response);
                }
            );
        };
}]);
'use strict';

// Declare app level module which depends on views, and components
angular.module('travellerNetwork', ['ngRoute', 'ngMessages']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl : 'views/main.html'
      })
      .when('/login',{
          templateUrl : 'views/login.html',
          controller : 'loginCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'registrationCtrl'
      })
      .when('/registratonsuccess',{
          templateUrl: 'Views/registration_success.html'
      });
}]);

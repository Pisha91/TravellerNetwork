/**
 * Created by pisha91 on 8/26/15.
 */

var module = angular.module('travellerNetwork');

module.directive('confirmPassword', function(){
    return {
        require: "ngModel",
        scope: {
            passwordModelValue: "=confirmPassword"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.confirmPassword = function (modelValue) {
                return modelValue == scope.passwordModelValue;
            };

            scope.$watch("passwordModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});
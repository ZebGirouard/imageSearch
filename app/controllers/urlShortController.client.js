'use strict';

(function() {
    var app = angular.module('clementineApp', ['ngResource', 'ngRoute']);
        app.controller('urlShortCTRL', ['$scope', '$resource', '$route', '$routeParams', '$location', function ($scope, $resource, $route, $routeParams, $location) {
            $scope.result = {};
            $scope.choice = {};
            var allPath = $location.absUrl().split("/");
        }]);
})();
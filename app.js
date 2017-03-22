'use strict';

(function () {
    var app = angular.module("accountTypeApp", ['ngRoute', 'angular-loading-bar']);
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/type", {
            templateUrl: 'app/views/type.html',
            controller: "TypeCtrl"
        })
        .when("/type/:typeId", {
            templateUrl: 'app/views/type.html',
            controller: "TypeAddressCtrl"
        })
        .otherwise({ redirectTo: "/type" })
    });
}());

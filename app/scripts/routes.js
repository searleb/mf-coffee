'use strict';
/**
 * @ngdoc overview
 * @name mfcoffeeApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('mfcoffeeApp')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/order.html',
        controller: 'CoffeeCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);

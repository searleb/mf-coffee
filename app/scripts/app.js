'use strict';

/**
 * @ngdoc overview
 * @name mfcoffeeApp
 * @description
 * # mfcoffeeApp
 *
 * Main module of the application.
 */
angular.module('mfcoffeeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'ngMaterial',
  ])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});

"use strict";angular.module("mfcoffeeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase","firebase.ref","ngMaterial"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("brown").accentPalette("deep-purple")}]),angular.module("firebase.config",[]).constant("FBURL","https://mf-coffee.firebaseio.com"),angular.module("firebase.ref",["firebase","firebase.config"]).factory("Ref",["$window","FBURL",function(a,b){return new a.Firebase(b)}]),angular.module("mfcoffeeApp").controller("CoffeeCtrl",["$scope","Ref","$firebaseArray","$timeout","$cookies",function(a,b,c,d,e){function f(b){a.err=b,d(function(){a.err=null},5e3)}a.orders=c(b.child("orders")),a.newOrder={};var g=e.get("mfcoffee");if(g){var g=g.split(",");a.newOrder.name=g[0],a.newOrder.order=g[1],a.newOrder.notes=g[2]}a.empty=function(){for(var b=a.orders,c=0;c<b.length;c++){var d=b[c];b.$remove(d)}},a.orders.$loaded()["catch"](f),a.addOrder=function(b){if(b){var c=b.order.toLowerCase().indexOf("whisk"),d=b.order.toLowerCase().indexOf("big mac");-1!=c?b.whiskey=!0:-1!=d&&(b.bigmac=!0);var g=[b.name,b.order,b.notes];e.put("mfcoffee",g),b.time=Firebase.ServerValue.TIMESTAMP,b.complete=!1,a.orders.$add({details:b})["catch"](f)}},a.updateModel=function(b){var c=a.orders.$indexFor(b);a.orders.$save(c)}}]),angular.module("mfcoffeeApp").filter("reverse",function(){return function(a){return angular.isArray(a)?a.slice().reverse():[]}}),angular.module("mfcoffeeApp").directive("ngReallyClick",[function(){return{restrict:"A",link:function(a,b,c){b.bind("click",function(){var b=c.ngReallyMessage;b&&confirm(b)&&a.$apply(c.ngReallyClick)})}}}]),angular.module("mfcoffeeApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/order.html",controller:"CoffeeCtrl"}).otherwise({redirectTo:"/"})}]);
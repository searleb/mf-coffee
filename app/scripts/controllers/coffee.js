'use strict';
/**
 * @ngdoc function
 * @name mfcoffeeApp.controller:CoffeeCtrl
 * @description
 * # CoffeeCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('mfcoffeeApp')
  .controller('CoffeeCtrl', function ($scope, Ref, $firebaseArray, $timeout, $cookies) {
    // synchronize a read-only, synchronized array of orders, limit to most recent 10
    $scope.orders = $firebaseArray(Ref.child('orders'));
    $scope.newOrder = {};

    var myLastOrder = $cookies.get('mfcoffee');
    if (myLastOrder){
      var myLastOrder = myLastOrder.split(',');
      $scope.newOrder.name = myLastOrder[0];
      $scope.newOrder.order = myLastOrder[1];
      $scope.newOrder.notes = myLastOrder[2];
    }

    // clear all orders
    $scope.empty = function(){
      var list = $scope.orders;
      for (var i = 0; i < list.length; i++) {
        var item = list[i]
        console.log(item);
        list.$remove(item);
      };
    };

    // display any errors
    $scope.orders.$loaded().catch(alert);

    // provide a method for adding an order
    $scope.addOrder = function(newOrder) {
      if( newOrder ) {
          var isWhiskey = newOrder.order.toLowerCase().indexOf("whiskey");
          if (isWhiskey >= 0) {
            newOrder.whiskey = true;
          }; 
          var cookieInfo = [newOrder.name, newOrder.order, newOrder.notes];
          $cookies.put('mfcoffee', cookieInfo);
          newOrder.time = Firebase.ServerValue.TIMESTAMP;
          newOrder.complete = false;
        // push an order to the end of the array
        $scope.orders.$add({details:newOrder})
          // display any errors
          .catch(alert);
      }
    };

    $scope.updateModel = function(id){
      var toUpdate = $scope.orders.$indexFor(id);
      $scope.orders.$save(toUpdate);
    };
    

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });

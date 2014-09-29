/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.factory('Socket', [
  'Global', '$rootScope',
  function(Global, $rootScope) {
    var socket = io(Global.SOCKETHOST);

    socket.on('reset', function(data){
      $rootScope.$apply(function(){
        $rootScope.$broadcast('socket:reset', data);
      });
    });

    socket.on('alert-take', function(data){
      $rootScope.$apply(function(){
        $rootScope.$broadcast('socket:alert-take', data);
      });
    });

    socket.on('alert-close', function(data){
      $rootScope.$apply(function(){
        $rootScope.$broadcast('socket:alert-close', data);
      });
    });

    return socket;
}]);
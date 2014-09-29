/* global angular:true */
'use strict';

// Create module
var app = angular.module('alertsDashboard', ['ui.bootstrap']);

app.run([
  '$rootScope', 'Socket',
  function($rootScope, Socket) {
    // Init and add socket object to rootScope so that every child scope will have socket object
    $rootScope.socket = Socket;
}]);
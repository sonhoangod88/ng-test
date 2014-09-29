/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.factory('Global', function() {
  return {
    APIHOST: '/',
    SOCKETHOST: '78.47.72.44:3000'
  }
});
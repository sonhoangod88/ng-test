/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.factory('Alerts', [
  '$http', 'Global',
  function($http, Global) {
    return {
      /**
       * Caculate level value of an alert
       * @return {Object} alert object
       */
      calcLevel: function(alert) {
        if (alert.level === 'RED') alert.levelNumber = 1;
        else if (alert.level === 'YELLOW') alert.levelNumber = 2;
        else alert.levelNumber = 3;

        // If alert have employee this is not high level anymore
        if (alert.employee) alert.levelNumber += 10;

        return alert;
      },

      /**
       * Get all alerts
       * @return {Object} Promise object
       */
      all: function() {
        return $http.get(Global.APIHOST + 'alerts');
      },

      /**
       * Get an Alert by id.
       * @param  {String} aid Id of the Alert to load.
       * @return {Object} Promise object with success data { ok: 1, alert: Alert }
       */
      detail: function(aid) {
        return $http.get(Global.APIHOST + 'alert/' + aid);
      },

      /**
       * Take the Alert for handling by the provided employee name.
       * @param  {String} aid Id of the Alert to load.
       * @param  {String} employee Name of employee
       * @return {Object} Promise object with success data { ok: 1, alert: Alert }
       */
      take: function(aid, employee) {
        return $http.post(Global.APIHOST + 'alert/' + aid + '/take', { employee: employee });
      },

      /**
       * Close the Alert with a Note.
       * @param  {String} aid Id of the Alert to load.
       * @param  {String} note Note to close alert
       * @return {Object} Promise object with success data { ok: 1, alert: Alert }
       */
      close: function(aid, note) {
        return $http.post(Global.APIHOST + 'alert/' + aid + '/close', { note: note });
      }

    }
}]);
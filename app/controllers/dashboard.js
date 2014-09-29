/* global angular:true, console:true */
'use strict';

var app = angular.module('alertsDashboard');

app.controller('dashboardCtrl', [
  '$scope', 'Alerts', '$modal',
  function($scope, Alerts, $modal){
    // List alerts
    $scope.alerts = [];
    $scope.employeeName = 'John Doe';

    /**
     * Scope init function
     */
    $scope.init = function(){
      // Get all alerts
      Alerts.all().then(
        function(res){
          var alerts = res.data.alerts;

          // Convert level to number
          for(var i=0, len=alerts.length; i<len; i++) {
            $scope.alerts.push(Alerts.calcLevel(alerts[i]));
          }
        }, function(errorData){
          console.log(errorData);
        });
    };

    /**
     * Update alert info in list if there is alert with the same aid or push new alert to list
     * @param  {Object} alert Alert object
     */
    $scope.pushAlert = function(alert) {
      for(var i=0, len=$scope.alerts.length; i<len; i++) {
        if ($scope.alerts[i].aid === alert.aid){
          $scope.alerts[i] = alert;
          return;
        }
      }

      // Push new alert if not exist
      $scope.alerts.push(alert);
    };

    /**
     * Take alert
     * @param  {Object} alert alert object
     */
    $scope.takeAlert = function(alert) {
      Alerts.take(alert.aid, $scope.employeeName);
    };

    /**
     * Add note and close alert
     * @param  {Object} alert alert object
     */
    $scope.addNote = function(alert) {
      var modalInstance = $modal.open({
        templateUrl: 'noteModalTemplate.html',
        controller: 'modalNoteCtrl',
        resolve: {
          alert: function () {
            return alert;
          }
        }
      });

      modalInstance.result.then(function (note) {
        // Close alert
        if (note) {
          Alerts.close(alert.aid, note);
        }
      });
    };

    /**
     * Handle when having taken event
     */
    $scope.$on('socket:alert-take', function(event, data){
      var alert = data.alert;
      alert.takeTime = new Date();
      $scope.pushAlert(Alerts.calcLevel(alert));
    });

    /**
     * Handle when having close event
     */
    $scope.$on('socket:alert-close', function(event, data){
      var alert = data.alert;
      $scope.pushAlert(Alerts.calcLevel(alert));
    });

    /**
     * Handle when having reset event
     */
    $scope.$on('socket:reset', function(event, data){
      $scope.alerts = [];
      $scope.init();
    });
}]);
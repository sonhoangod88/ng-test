/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.controller('modalNoteCtrl', ['$scope', '$modalInstance', 'alert',
  function($scope, $modalInstance, alert){
    $scope.note = { content : '', title: '' };

    $scope.save = function () {
      $modalInstance.close($scope.note);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
}]);
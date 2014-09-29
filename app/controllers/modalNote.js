/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.controller('modalNoteCtrl', ['$scope', '$modalInstance', 'alert',
  function($scope, $modalInstance, alert){
    $scope.note = { content : '' };

    $scope.save = function () {
      $modalInstance.close($scope.note.content);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
}]);
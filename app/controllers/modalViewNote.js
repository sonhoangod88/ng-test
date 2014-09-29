/* global angular:true */
'use strict';

var app = angular.module('alertsDashboard');

app.controller('modalViewNoteCtrl', ['$scope', '$modalInstance', 'Alerts', 'alert',
  function($scope, $modalInstance, Alerts, alert){
    $scope.note = {title: '', body: ''};

    Alerts.getNote(alert.note_id).then(function(res){
      $scope.note.title = res.data.note.title;
      $scope.note.body = res.data.note.body;
    });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
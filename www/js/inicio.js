var inicio = angular.module('starter.inicio', []);

inicio.controller("InicioCtrl",['$scope', 'NavigationFactory', '$http', 'url_api', function($scope, NavigationFactory, $http, url_api){  
  $scope.changeState = function(estado){
    NavigationFactory.navigation(estado);
  };  
}])
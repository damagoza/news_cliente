var news = angular.module('starter.news', []);

news.controller("NewsCtrl",['$scope', 'NavigationFactory', '$http', 'url_api', '$rootScope', '$rootScope', function($scope, NavigationFactory, $http, url_api, $rootScope, $rootScope){  
  $scope.news = $rootScope.news_extract;
  console.log('NewsCtrl');
  $scope.changeState = function(estado){
    NavigationFactory.navigation(estado);
  };

  $scope.logout = function(){
    $rootScope.user_id = 0;
    $rootScope.user_name = '';
    $rootScope.user_email = '';
    NavigationFactory.navigation(0);
  }   


  
}])
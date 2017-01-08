var category = angular.module('starter.category', []);

category.controller("CategoryCtrl",['$scope', 'NavigationFactory', '$http', 'url_api', '$rootScope', 'NewsFactory',function($scope, NavigationFactory, $http, url_api, $rootScope, NewsFactory){  
  console.log('CategoryCtrl');
  $scope.changeState = function(estado){
    NavigationFactory.navigation(estado);
  };
  var url = url_api+'category/all';

  $http.get(url).success(function(data){
    $scope.categories = data      
  })
  .error(function(data){
    console.log("ERROR " + data.header)
  });

  $scope.logout = function(){
    $rootScope.user_id = 0;
    $rootScope.user_name = '';
    $rootScope.user_email = '';
    NavigationFactory.navigation(0);
  };    

  $scope.news = function(filter, category_id, medium_id){
    NewsFactory.news(filter, category_id, medium_id);
  };
  
}])
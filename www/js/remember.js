var remember = angular.module('starter.remember', []);

remember.controller("RememberCtrl",['$scope', 'NavigationFactory', '$ionicPopup', 'MessageFactory', 'SetDataFactory', 'url_api', function($scope, NavigationFactory, $ionicPopup, MessageFactory, SetDataFactory, url_api){
  $scope.email = "";
  $scope.changeState = function(estado){
      NavigationFactory.navigation(estado);
  }
  $scope.remember = function(email){
    if (email != '' && email != undefined) {
      var params = {'email': email};
      var url = url_api+'user/remember';   
      SetDataFactory.set_data(url, params, 4);
    }else{
      MessageFactory.message("E-mail invalid.");
    }
    
  }  
}])
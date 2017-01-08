var signup = angular.module('starter.signup', []);

signup.controller("SignUpCtrl",['$scope', 'NavigationFactory', '$ionicPopup', 'MessageFactory', 'SetDataFactory', 'url_api', function($scope, NavigationFactory, $ionicPopup, MessageFactory, SetDataFactory, url_api){
  $scope.email = "@gmail.com";
  $scope.password = "";  
  $scope.repeatPassword = "";    
  $scope.changeState = function(estado){
      NavigationFactory.navigation(estado);
  }

  $scope.signup = function(user_name, email, password, repeatPassword){
    if (email != '' && password != '' && repeatPassword != '' && email != undefined && password == repeatPassword){
      var params = {'email': email, 'password': password};
      var url = url_api+'user/create';   
      SetDataFactory.set_data(url, params, 4);
    }else{
      MessageFactory.message("E-mail or password invalid. remember to confirm your password.");       
    }    
  }
}])
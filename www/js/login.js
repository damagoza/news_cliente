var login = angular.module('starter.login', []);

login.controller("LogInCtrl",['$scope', 'NavigationFactory', 'MessageFactory', 'LoginFactory', 'url_api', function($scope, NavigationFactory, MessageFactory, LoginFactory, url_api){
  $scope.email = "damagoza@gmail.com";
  $scope.password = "cataratas";
  $scope.changeState = function(estado){
      NavigationFactory.navigation(estado);
  }
  $scope.login = function(email, password){
    if ( email != '' && password != '' && email != undefined){
      var params = {'email': email, 'password': password};
      var url = url_api+'user/login';   
      LoginFactory.login(url, params, 4);
    }else{      
      MessageFactory.message("E-mail or password invalid.");
    }    
  }
}])
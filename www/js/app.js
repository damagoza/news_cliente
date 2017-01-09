// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.category', 'starter.inicio', 'starter.login', 'starter.signup', 'starter.remember', 'starter.news'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.factory("NewsFactory",['$ionicPopup', 'url_api', '$http', 'NavigationFactory', '$rootScope', function($ionicPopup, url_api, $http, NavigationFactory, $rootScope) {
  return {
    news:function(filter, category_id, medium_id) {
      url_news = url_api+"news_extract/";    
      params = {};
      switch(filter) {
        case 1:
            url_news += "news_for_category"; 
            params = {"category_id":category_id}
            break;        
        case 2:
            url_news += "news_for_medium"; 
            params = {"medium_id":medium_id}          
            break;
        case 3:
            url_news += "news_for_medium_and_category"; 
            params = {"category_id":category_id, "medium_id":medium_id}          
            break;
      }    
      console.log("news " +  url_news);
      $http.post(url_news, params).success(function(data){
        $rootScope.news_extract = data;
        console.log("datos --> " + data)
        NavigationFactory.navigation(5);
      })
      .error(function(data){
        console.log("ERROR " + data.header)
      });    
    }    
  }
}])

.factory("MessageFactory",['$ionicPopup', function($ionicPopup) {
  return {
    message:function(mess) {
      var alertPopup = $ionicPopup.alert({
         title: 'Upps',
         template: mess,
         buttons: [{text: 'OK', type: 'button-balanced'}]
      });

      alertPopup.then(function(res) {
       
      });            
    }    
  }
}])

.constant('url_api', 'http://localhost:3000/api/')
// .constant('url_api', 'https://finanzas-web-api-damagoza.c9users.io/api/')

.factory("LoginFactory",['$http', 'NavigationFactory', '$rootScope', function($http, NavigationFactory, $rootScope) {
  return {
    login:function(url, params, redirection) {
      $http.post(url, params).then(function(response){
        console.log("****+"+JSON.stringify(response)+"****");
        if (JSON.stringify(response['data']['respuesta']) == '1'){
          if (JSON.stringify(response['data']['respuesta']) != 0){
            console.log(JSON.stringify(response['data']['user_id']), JSON.stringify(response['data']['user_email'])); 
            $rootScope.user_id = JSON.stringify(response['data']['user_id']);
            $rootScope.user_email = JSON.stringify(response['data']['user_email']);
            // console.log("galleta " + $cookies.getAll());
            NavigationFactory.navigation(redirection);          
          }
          
        }else{

        }
      }, function(response){

      });
    }    
  }
}])

.factory("SetDataFactory",['$http', 'NavigationFactory', function($http, NavigationFactory) {
  return {
    set_data:function(url, params, redirection) {
      $http.post(url, params).then(function(response){
        console.log("****+"+JSON.stringify(response)+"****");
        if (JSON.stringify(response['data']['respuesta']) == '1'){
          NavigationFactory.navigation(redirection);          
        }else{

        }
      }, function(response){

      });
    }    
  }
}])

.factory("GetDataFactory",['$http', 'NavigationFactory', function($http, NavigationFactory) {
  return {
    get_data:function(url) {
      var result = {};  
      $http.get(url).success(function(data){
        result = data;
      })
      .error(function(data){

      });  
      console.log("get_data " + result);
      return result;
    }    
  }
}])

.factory("NavigationFactory",['$state', function($state) {
  return {
    navigation:function(state) {
      switch(state) {
        case 0:
            $state.go('inicio');
            break;        
        case 1:
            $state.go('login');
            break;
        case 2:
            $state.go('signup');
            break;
        case 3:
            $state.go('remember');
            break;              
        case 4:
            $state.go('category');
            break;
        case 5:
            $state.go('news');
            break;            
      }
    }         
  } 
}])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('inicio', {
    url: "/inicio",
    templateUrl: "templates/inicio.html",
    controller: 'InicioCtrl'
  })  

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LogInCtrl'
  })

  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignUpCtrl'
  })

  .state('remember', {
    url: "/remember",
    templateUrl: "templates/remember.html",
    controller: 'RememberCtrl'
  })

  .state('category', {
    url: "/category",
    templateUrl: "templates/category.html",
    controller: 'CategoryCtrl'
  })

  .state('news', {
    url: "/news",
    templateUrl: "templates/news.html",
    controller: 'NewsCtrl'
  });

  $urlRouterProvider.otherwise('/inicio');

});
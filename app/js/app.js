'use strict';

/* INIT */
function blob404(){
  
}

/* App Module */

var offlineAnimeApp = angular.module('offlineAnimeApp', [
  'ngRoute',
  'offlineAnimeControllers'
]);

// offlineAnimeApp.factory('UserService', function() {
//   var blob;
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(){
//       if (this.readyState == 4 && this.status == 200){
//           console.log(this.response);
//           blob = this.response; 
//       }
//   }
//   xhr.open('GET', 'http://localhost:8888/offlineanime/app/img/404.png');
//   xhr.responseType = 'blob';
//   xhr.send();     
//   return {
//       data : blob
//   };
// });

offlineAnimeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/animes/', {
        templateUrl: 'partials/anime-list.html',
        controller: 'AnimeListCtrl'
      }).
      when('/animes/:slug', {
        templateUrl: 'partials/anime-detail.html',
        controller: 'AnimeDetailCtrl'
      }).
      otherwise({
        redirectTo: '/animes'
      });
  }]);
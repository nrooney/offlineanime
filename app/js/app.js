'use strict';

/* App Module */

var offlineAnimeApp = angular.module('offlineAnimeApp', [
  'ngRoute',
  'offlineAnimeControllers'
]);

offlineAnimeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/animes', {
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
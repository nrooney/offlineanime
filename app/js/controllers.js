'use strict';

/* Controllers */

var offlineAnimeControllers = angular.module('offlineAnimeControllers', []);

offlineAnimeControllers.controller('AnimeListCtrl', ['$scope', '$http',
  function AnimeListCtrl($scope, $http) {
    $http.get('/offlineanime/anime.json').success(function(data) {
      $scope.animes = data;
    });

    $scope.orderProp = 'show_type';
  }]);

offlineAnimeControllers.controller('AnimeDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('/offlineanime/anime.json').success(function(data) {
    	for (var i = 0; i < data.length; ++i) {
		    if(data[i].slug == $routeParams.slug){
    			$scope.anime = data[i];
    			break;
    		}
		}
    });
  }]);

// offlineAnimeControllers.controller('AnimeListCtrl', ['$scope', '$http', function AnimeListCtrl($scope, $http) {
// 	var NamesOfAnime = ["steins-gate", "lucky-star", "genshiken", "cowboy-bebop","naruto"];
// 	$scope.animes = new Array();

// 	NamesOfAnime.forEach(function (eachName, index){
// 		$http({
// 		    url: "https://hummingbirdv1.p.mashape.com/anime/" + eachName,
// 		    method: "GET",
// 		    headers: {"X-Mashape-Authorization":"0hyAhVOeMH7ypTFLqOqTwgOJzs37vZ9e"} //should be hiding this
// 		}).success(function(data, status, headers, config) {
// 		    $scope.animes.push(data);
// 		});
// 	});
//   	$scope.orderProp = 'releaseDate';
// }]);


// offlineAnimeControllers.controller('AnimeDetailCtrl', ['$scope', '$routeParams', '$http',
//   function($scope, $routeParams, $http) {
//     $http({
// 	    url: "https://hummingbirdv1.p.mashape.com/anime/" + $routeParams.slug,
// 	    method: "GET",
// 	    headers: {"X-Mashape-Authorization":"0hyAhVOeMH7ypTFLqOqTwgOJzs37vZ9e"} //should be hiding this
// 	}).success(function(data, status, headers, config) {
// 	    $scope.anime = data;
// 	});
//  }]);
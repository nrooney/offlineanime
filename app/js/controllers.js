'use strict';

// getStorage();

// addEvent(document.querySelector('#local'), 'keyup', function () {
//   localStorage.setItem('value', this.value);
//   localStorage.setItem('timestamp', (new Date()).getTime());
// });

// addEvent(document.querySelector('#clear'), 'click', function () {
//   sessionStorage.clear();
//   localStorage.clear();
  
//   document.querySelector('#previous').innerHTML = '';
//   getStorage('local');
//   getStorage('session');
// });

/* Local Storage Functions*/
function getStorage(){
	//localStorage.clear();
	if (localStorage.getItem('appData')) { //try local storage
    	var appData = JSON.parse(localStorage.getItem('appData'));
    	return appData;
	} 
	else{ 
		return null;
	}
}
function setStorage(appData){
	var dataToStore = JSON.stringify(appData);
	localStorage.setItem('appData', dataToStore);
}

/* Controllers */
var offlineAnimeControllers = angular.module('offlineAnimeControllers', []);

offlineAnimeControllers.controller('AnimeListCtrl', ['$scope', '$http',
  function AnimeListCtrl($scope, $http) {
  	var appData = getStorage();
  	
  	if (appData) {
  		console.log('Loading Data from Storage');
    	$scope.animes = appData;
	} 
	else {
		console.log('Storage is empty - Loading from remote JSON File');
		$http.get('/offlineanime/anime.json').success(function(data) {
			setStorage(data)
			$scope.animes = data;
    	});
	}
    $scope.orderProp = 'show_type';
  }]);

offlineAnimeControllers.controller('AnimeDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var appData = getStorage();
	for (var i = 0; i < appData.length; ++i) {
	    if(appData[i].slug == $routeParams.slug){
			$scope.anime = appData[i];
			break;
		}
	}
}]);

offlineAnimeControllers.controller('findAnimeFormCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.submit = function() {
		var appData = getStorage();
		var slug = this.anime.slug;

		//check if we have it already
		var haveitalready = false;
		for (var i = 0; i < appData.length; ++i) {
		    if(appData[i].slug == slug){
				$scope.anime = appData[i];
				haveitalready = true;
				console.log('We already have "' + slug + '" anime');
				$location.path('/animes/' + slug);
				break;
			}
		}
		//if so display note to user
		//if not go get it
		if(!haveitalready){
			console.log('looking for it');
			$http({
			    url: "https://hummingbirdv1.p.mashape.com/anime/" + slug,
			    method: "GET",
			    headers: {"X-Mashape-Authorization":"0hyAhVOeMH7ypTFLqOqTwgOJzs37vZ9e"} //HIDE
			}).success(function(data, status, headers, config) {
				if(data.slug == slug){
					 //add to DB and push back to local storage
					console.log('Found "' + slug + '" anime, adding to LocalStorage');
					$scope.anime = data;
					appData.push(data);
			    	setStorage(appData);
			    	$location.path('/animes/' + slug);
				}
				else{
					console.log('Cannot find "' + slug + '" anime');
				}
			});
		}
		//display it
		
  	};
}]);

// offlineAnimeControllers.controller('AnimeListCtrl', ['$scope', '$http', function AnimeListCtrl($scope, $http) {
// 	var NamesOfAnime = ["steins-gate", "lucky-st	ar", "genshiken", "cowboy-bebop","naruto"];
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
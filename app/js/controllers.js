'use strict';

/*
 * CONTROLLERS
 */
var offlineAnimeControllers = angular.module('offlineAnimeControllers', []);

/*
 * CONTROLLERS: ANIME LIST
 */
offlineAnimeControllers.controller('AnimeListCtrl', ['$scope', '$http',
  function AnimeListCtrl($scope, $http) {
  	var appData = getStorage(); // LOCAL STORAGE: Go get our storage!
  	
  	// LOCAL STORAGE: if storage returned data then load into controller!
  	if (appData) {
  		console.log('LOCAL STORAGE: Loading Data from Storage');
    	$scope.animes = appData;
	} 
	// LOCAL STORAGE: if not then reload from JSON file and store to storage (if online! Error otherwise)
	else {
		console.log('LOCAL STORAGE: Storage is empty - Loading from remote JSON File');
		$http.get('/offlineanime/anime.json').success(function(data) {
			setStorage(data)
			$scope.animes = data;
    	});
	}
    $scope.orderProp = 'show_type';
  }]);

/*
 * CONTROLLERS: ANIME DETAIL
 */
offlineAnimeControllers.controller('AnimeDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var appData = getStorage();
	for (var i = 0; i < appData.length; ++i) {
	    if(appData[i].slug == $routeParams.slug){
			$scope.anime = appData[i];
			break;
		}
	}
}]);

/*
 * CONTROLLERS: FORM
 */
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
				console.log('APP FUNCTIONALITY: We already have "' + slug + '" anime');
				$location.path('/animes/' + slug); //if so display note to user
				break;
			}
		}
		
		//if not go get it
		if(!haveitalready){
			console.log('APP FUNCTIONALITY: looking for it ' + slug);
			$http({
			    url: "https://hummingbirdv1.p.mashape.com/anime/" + slug,
			    method: "GET",
			    headers: {"X-Mashape-Authorization":"0hyAhVOeMH7ypTFLqOqTwgOJzs37vZ9e"}, //HIDE
			    cache: false
			}).success(function(data, status, headers, config) {
				if(data.slug == slug){
					 //add to DB and push back to local storage
					console.log('APP FUNCTIONALITY: Found "' + slug + '" anime');
					console.log('LOCAL STORAGE: adding to LocalStorage');
					$scope.anime = data;
					appData.push(data);
			    	setStorage(appData);
			    	$location.path('/animes/' + slug); //display it
				}
				else{
					console.log('APP FUNCTIONALITY: Cannot find "' + slug + '" anime');
					document.getElementById('errorMessage').innerHTML='Cannot find "' + slug + '" anime';;
				}
			});
		}
  	};
}]);

/*
 * LOCAL STORAGE FUNCTIONS
 */
function getStorage(){
	
	// DO STUFF

}
function setStorage(appData){
	
	// DO STUFF
	
}

/*
 * IMAGE DETECT ON ERROR AND SHOW CACHED IMAGE
 */
function imageError(){	
	console.log('IMAGE ERROR: Cannot find images');      
    var imgs = document.getElementsByClassName('offlineImage');
	for(var i=0; i<imgs.length; i++) { 
	  imgs[i].src = "/offlineanime/app/img/404.png";  
	}
}


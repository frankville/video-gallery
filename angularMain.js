var app = angular.module("videoGallery", ["ngRoute","ngResource","ui.bootstrap","scrollable-table"]);

		app.config(function($routeProvider){
				$routeProvider.when("/",{
					controller: "mainViewController",
					templateUrl: "views/mainView.html"
				})
				
				.when("/wall",{
					controller: "wallController",
					templateUrl: "views/wall.html"

				})
				
				.otherwise({ redirectTo:"/" });
			});

		app.factory('videoListService', ['$resource',
		  function($resource){
		    return $resource('/videoList', {}, {
		      query: {method:'GET', isArray:true}
		    });
		 }]);

		app.factory('videoPlayService', ['$resource',
		  function($resource){
		    return $resource('/playVideo/:videoName', {}, {
		      query: {method:'GET', params:{videoName:"videoName"}, isArray:false}
		    });
		 }]);



		app.controller("wallController",function($scope,videoListService,videoPlayService){

		});


		app.controller("mainViewController",function($scope,videoListService,videoPlayService,$routeParams){
			$scope.videoList = [];
			$scope.videosrc = "";

			init();

			$scope.playVideo = function(vidName){
				
				
				var queryObj=videoPlayService.get({videoName: vidName});
				queryObj.$promise.then(function(response){
						console.log("estte es el url stream "+response.url);
						$scope.videosrc = decodeURI(response.url);
					});				
			}
				
			function init(){
				$scope.videoList = videoListService.query(function(){
					
				});

			    $scope.$watch('selected', function(fac) {
			       $scope.$broadcast("rowSelected", fac);
			    });
					
			}


		});
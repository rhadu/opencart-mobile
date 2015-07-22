'use strict';
(function () {
	var app = angular.module('Tapitoo.StartUpService', ['ui.router']);

	//factory for HTTP requests
	app.factory('StartUpService', function (TAPITOO_CONFIG, OC_CONFIG, $http, $ionicPlatform, ShopService, $ionicPopup, $state, $cordovaGeolocation, $cordovaNetwork, $timeout, $ImageCacheFactory) {
		var service = {};

		service.initialization = function  () {

			console.log('aaaaa');

			//cache background image
			$ImageCacheFactory.Cache(["../img/bg.jpg"]).then(function () {
				console.log("done preloading!");
			});

			/* hide splashscreen*/
			$timeout(function () {
				//navigator.splashscreen.hide();
			}, 2500, false);

			//check for internet connection
//			//var isOffline = $cordovaNetwork.isOffline();
//			if (isOffline === true) {
//				$state.go("noInternet");
//				return false;
//			}

			//facebook initialization
			var appID = "271360646354244";
			var device = ionic.Platform.device();
			try {
				if (device && device.model) {
					FB.init({appId: appID, nativeInterface: CDV.FB, useCachedDialogs: false, status: true});
				} else {
					FB.init({appId: appID, status: true});
				}
			} catch (e) {
				console.log("fb init error" + e);
			}

			$http.defaults.headers.common.Authorization = OC_CONFIG.TOKEN;

		}
		return service;
	});
})();

'use strict';
(function () {
	var app = angular.module('TapitooPortal', ['ionic',
		'app.routes',
		'Tapitoo.RestaurantServices',
		'Tapitoo.GeocoderService',
		'Tapitoo.DeliveryInfoService',
		'Tapitoo.CartService',
		'Tapitoo.LocationServices',
		'Tapitoo.googleMap',
		'Tapitoo.filterModifiers',
		'HomeCtrl',
		'DeliveryCtrl',
		'CategoriesCtrl',
		'ProductsCtrl',
		'ProductsDetailsCtrl',
		'CartCtrl',
		'OrderHistoryCtrl',
		'DeliveryInformationCtrl',
		'AddressListCtrl',
		'PersonalInfoCtrl',
		'GoodbyeCtrl',
		'ngStorage',
		'ngCordova',
		'ion-google-place',
		'cordova',
		'ionic.ion.imageCacheFactory',
		'ionic.ion.headerShrink',
		'pascalprecht.translate']);


	app.run(function ($ionicPlatform, RestaurantService, $ionicPopup, $state, $cordovaGeolocation, $cordovaNetwork, $timeout, $ImageCacheFactory) {
		$ImageCacheFactory.Cache(["../img/bg.jpg"]).then(function () {
			console.log("done preloading!");
		});

		$ionicPlatform.ready(function () {
			/* comment the next 7 lines for web debugging*/

			$timeout(function () {
				navigator.splashscreen.hide();
			}, 2500, false);

			//check for internet connection
			var isOffline = $cordovaNetwork.isOffline();
			if (isOffline === true) {
				$state.go("noInternet");
				return false;
			}

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
		});
	});


	app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {
		//routes fallback
		$urlRouterProvider.otherwise("/drawer/welcome");

		$ionicConfigProvider.views.transition('customAnim');
		$ionicConfigProvider.navBar.alignTitle('center')

		// configures staticFilesLoader
		$translateProvider.useStaticFilesLoader({
			prefix: 'languages/translate-',
			suffix: '.json'
		});
		// load 'en' table on startup
		$translateProvider.preferredLanguage('en');
	});

	app.controller('AppInitController', function ($scope, $state,RestaurantService, $ionicScrollDelegate, $timeout, $ionicSideMenuDelegate) {

		$scope.$on('locationLoaded', function (event, loc) {
			$timeout(function () {
				$scope.loc = loc;
			}, 0, false);
		});
		$scope.toggleDrawer = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

				$scope.checkTest = function(){
					//$state.reload('addresses')
					$state.go('addresses');
					//$state.transitionTo("addresses",  { }, { reload: true });
				}

		// var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

	});
})();

angular.element(document).ready(function () {
	angular.bootstrap(document, ['TapitooPortal']);
});

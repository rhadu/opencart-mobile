'use strict';
(function () {
	var app = angular.module('TapitooPortal', ['ionic',
											   'app.routes',
											   'app.config',
											   'Tapitoo.StartUpService',
											   'Tapitoo.ShopService',
											   'Tapitoo.GeocoderService',
											   'Tapitoo.DeliveryInfoService',
											   'Tapitoo.CartService',
											   'Tapitoo.LocationServices',
											   'Tapitoo.googleMap',
											   'Tapitoo.filterModifiers',
											   'Tapitoo.HomeViewController',
											   'Tapitoo.ManufacturersController',
											   'Tapitoo.WishlistCtrl',
											   'HomeCtrl',
											   'DeliveryCtrl',
											   'CategoriesCtrl',
											   'ProductsCtrl',
											   'ProductsDetailsCtrl',
											   'CartCtrl',
											   'CheckoutCtrl',
											   'DeliveryDetailsCtrl',
											   'PaymentDetailsCtrl',
											   'OrderHistoryCtrl',
											   'DeliveryInformationCtrl',
											   'AddressListCtrl',
											   'PersonalInfoCtrl',
											   'GoodbyeCtrl',
											   'ngStorage',
											   'ngCordova',
											   'ion-google-place',
											   'horizontalScroll',
//											   'starRating',
											   'cordova',
											   'tabSlideBox',
											   'angular-inview',
											   'ionic.ion.imageCacheFactory',
											   'ionic.ion.headerShrink',
											   'pascalprecht.translate']);

	app.run(function (StartUpService, $http, OC_CONFIG ) {

		StartUpService.initialization();
		//$http.defaults.headers.common.Authorization = OC_CONFIG.TOKEN;
	});


	app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {
		//routes fallback
		$urlRouterProvider.otherwise("/drawer/home");

		$ionicConfigProvider.views.transition('ios');
		$ionicConfigProvider.navBar.alignTitle('center')
		$ionicConfigProvider.views.swipeBackEnabled(false);

		// configures staticFilesLoader
		$translateProvider.useStaticFilesLoader({
			prefix: 'languages/translate-',
			suffix: '.json'
		});
		// load 'en' table on startup
		$translateProvider.preferredLanguage('en');


	});

	app.controller('AppInitController', function ($scope, $rootScope, $state,ShopService, $ionicScrollDelegate, $timeout, $ionicSideMenuDelegate) {

		$scope.$on('locationLoaded', function (event, loc) {
			$timeout(function () {
				$scope.loc = loc;
			}, 0, false);
		});
		$scope.toggleDrawer = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};
		$rootScope.noShadow = "header-shadow";
	});
})();

angular.element(document).ready(function () {
	angular.bootstrap(document, ['TapitooPortal']);
});

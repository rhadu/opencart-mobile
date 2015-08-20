'use strict';
(function () {
	var app = angular.module('TapitooPortal', ['ionic',
											   'app.routes',
											   'app.config',
											   'Tapitoo.StartUpService',
											   'Tapitoo.ShopService',
											   'Tapitoo.HomeViewController',
											   'Tapitoo.ManufacturersController',
											   'Tapitoo.WishlistCtrl',
											   'CategoriesCtrl',
											   'ProductsCtrl',
											   'ProductsDetailsCtrl',
											   'CartCtrl',
											   'CheckoutCtrl',
											   'UserAccountCtrl',
											   'DeliveryDetailsCtrl',
											   'PaymentDetailsCtrl',
											   'AddressesCtrl',
											   'PersonalInfoCtrl',
											   'ngStorage',
											   'ngCordova',
											   'horizontalScroll',
											   'starRating',
											   'cordova',
											   'tabSlideBox',
											   'ionic.ion.imageCacheFactory',
											   'gavruk.card',
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
		$scope.toggleDrawer = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};
		$rootScope.noShadow = "header-shadow";
	});
})();

angular.element(document).ready(function () {
	angular.bootstrap(document, ['TapitooPortal']);
});

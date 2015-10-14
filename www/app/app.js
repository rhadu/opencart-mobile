'use strict';
(function () {
	var app = angular.module('TapitooPortal', ['ionic',
											   'app.routes',
											   'app.config',
											   'Tapitoo.StartUpService',
											   'Tapitoo.ShopService',
											   'Tapitoo.ProductService',
											   'Tapitoo.CartService',
											   'Tapitoo.CheckoutService',
											   'Tapitoo.CheckoutProcessService',
											   'Tapitoo.AccountService',
											   'Tapitoo.CommonService',
											   'Tapitoo.HomeViewController',
											   'Tapitoo.ManufacturersController',
											   'Tapitoo.WishlistCtrl',
											   'CategoriesCtrl',
											   'ProductsCtrl',
											   'ProductsDetailsCtrl',
											   'CartCtrl',
											   'CheckoutCtrl',
											   'CreditCardCtrl',
											   'UserAccountCtrl',
											   'DeliveryDetailsCtrl',
											   'PaymentDetailsCtrl',
											   'AddressesCtrl',
											   'PersonalInfoCtrl',
											   'SettingsCtrl',
											   'GeocoderService',
											   'ngStorage',
											   'ngCordova',
											   'horizontalScroll',
											   'starRating',
											   'tabSlideBox',
											   'ionic.ion.imageCacheFactory',
											   'ionic-datepicker',
											   'ionic-timepicker',
											   'ionic-toast',
											   'angularPayments',
											   'pascalprecht.translate']);

	app.run(function (StartUpService,$ionicPlatform,$localStorage, $http, OC_CONFIG, $state, $urlRouter) {
//		$localStorage.ACCESS_TOKEN= 'X68AWVTSMNblJki5OzcSnYLtw3HxPWdgyGevyiE4';
		$ionicPlatform.ready(function () {
			console.log("local storage ACCESS TOKEN: " + $localStorage.ACCESS_TOKEN);
			if($localStorage.ACCESS_TOKEN){
				//console.log($localStorage.ACCESS_TOKEN);
				OC_CONFIG.TOKEN = $localStorage.ACCESS_TOKEN;
				StartUpService.initialization();
			}
			else {
				var promise = StartUpService.generateToken();
				promise.then(
					function (response) {
						StartUpService.initialization();
					});

			}
		});

	});


	app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $localStorageProvider) {
		//routes fallback
//		$urlRouterProvider.otherwise("/drawer/home");

		if(ionic.Platform.isAndroid()===true){
			$ionicConfigProvider.views.transition('none');
		}
		else
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

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
			// hide iOS status bar
			if(window.StatusBar) {
				StatusBar.hide();
				ionic.Platform.fullScreen();
			}

			//set access token if it's not the first time the app is open
			if($localStorage.ACCESS_TOKEN){
				//console.log($localStorage.ACCESS_TOKEN);
				OC_CONFIG.TOKEN = $localStorage.ACCESS_TOKEN;
				StartUpService.initialization();
			}
			// generate access token if the app is opened for the first time
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

		// disable views transition animation on android
		if(ionic.Platform.isAndroid()===true){
			$ionicConfigProvider.views.transition('none');
		}
		else
			$ionicConfigProvider.views.transition('ios');

		// center Header Logo
		$ionicConfigProvider.navBar.alignTitle('center')

		// disable swipe back on iOS
		$ionicConfigProvider.views.swipeBackEnabled(false);

		// configures staticFilesLoader
		$translateProvider.useStaticFilesLoader({
			prefix: 'languages/translate-',
			suffix: '.json'
		});
		// load 'en' table on startup
		$translateProvider.preferredLanguage('en');
	});

	app.controller('AppInitController', function ($scope, $rootScope,$ionicLoading, $state,ShopService, $ionicScrollDelegate, $timeout, $ionicSideMenuDelegate) {
		$scope.toggleDrawer = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};
		$rootScope.noShadow = "header-shadow";

		// show loading template after 100ms
		$scope.$on('$stateChangeStart',
				   function(event, toState, toParams, fromState, fromParams){
			$timeout(function(){
				$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			},100);
		});

		// hide loading template after 200ms
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$timeout(function(){
				$ionicLoading.hide()
			},200);
		});

	});
})();

angular.element(document).ready(function () {
	angular.bootstrap(document, ['TapitooPortal']);
});

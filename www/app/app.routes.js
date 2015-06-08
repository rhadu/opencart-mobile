'use strict';
(function () {
	var app = angular.module('app.routes', ['ui.router']);

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('leftdrawer', {
			url: "/drawer",
			abstract: true,
			templateUrl: "templates/left-drawer.html"
		})
			.state('leftdrawer.categories', {
			url: "/menu/:restaurantName",
			cache: false,
			views: {
				'menuContent': {
					templateUrl: "templates/menuCategories.html",
					controller: 'CategoriesController',
				}
			}
		})
			.state('leftdrawer.welcome', {
			url: '/welcome',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/welcome.html',
					controller: 'WelcomeController'
				}
			}
		})
			.state('leftdrawer.home', {
			url: '/home',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeViewController'
				}
			}
		})
			.state('orderDelivery', {
			url: '/orderDelivery',
			cache: false,
			templateUrl: 'templates/orderDelivery.html',
			controller: 'DeliveryController'
		})
			.state('orderPickUp', {
			url: '/orderPickUp',
			cache: false,
			templateUrl: 'templates/orderPickUp.html',
			controller: 'DeliveryController'
		})
			.state('locationsList', {
			url: '/locationsList',
			cache: false,
			templateUrl: 'templates/locationsList.html',
			controller: 'DeliveryController'
		})
			.state('products', {
			url: '/menu/:restaurantName/:categoryId',
			cache: false,
			templateUrl: 'templates/menuProductsDetails.html',
			controller: 'ProductsController'
		})
			.state('productInfo', {
			url: '/menu/:restaurantName/:categoryId/:productId',
			cache: false,
			templateUrl: 'templates/menuProductInfo.html',
			controller: 'ProductDetailsController'
		})
			.state('cart', {
			url: '/cart',
			cache: false,
			templateUrl: 'templates/cart.html',
			controller: 'CartController'
		})
			.state('addresses', {
			url: '/addresses',
			cache: false,
			templateUrl: 'templates/addresses.html',
			controller: 'AddressesController'
		})
			.state('deliveryinfo', {
			url: '/delivery',
			cache: false,
			templateUrl: 'templates/delivery.html',
			controller: 'DeliveryInformationController'
		})
			.state('location', {
			url: '/location',
			cache: false,
			templateUrl: 'templates/location.html',
			controller: 'MapController'
		})
			.state('personalInfo', {
			url: '/personalInfo',
			cache: false,
			templateUrl: 'templates/personalInfo.html',
			controller: 'PersonalInfoController'
		})
			.state('personalInfoEdit', {
			url: '/personalInfoEdit',
			cache: false,
			templateUrl: 'templates/personalInfoEdit.html',
			controller: 'PersonalInfoController'
		})
			.state('orderHistory', {
			url: '/orderHistory',
			cache: false,
			templateUrl: 'templates/orderHistory.html',
			controller: 'OrderHistoryController'
		})
			.state('goodbye', {
			url: '/goodbye',
			templateUrl: 'templates/goodbye.html',
			controller: 'GoodbyeController'
		})
			.state('noInternet', {
			url: '/noInternet',
			templateUrl: 'templates/noInternet.html'
		});
	});

})();

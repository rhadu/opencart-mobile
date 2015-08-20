'use strict';
(function () {
	var app = angular.module('app.routes', ['ui.router']);

	app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('leftdrawer', {
			url: "/drawer",
			cache: false,
//			abstract: true,
			templateUrl: "templates/left-drawer.html",
			controller: "PersonalInfoController"
		})
			.state('leftdrawer.categories', {
			url: "/menu/categories",
			cache: false,
			views: {
				'menuContent': {
					templateUrl: "templates/menuCategories.html",
					controller: 'CategoriesController',
					resolve: {
						categories: function(ShopService){
							return ShopService.getAllCategories();
						}
					}
				}
			}
		})
			.state('leftdrawer.subCategories', {
			url: "/menu/categories/subcategories",
			cache: false,
			views: {
				'menuContent': {
					templateUrl: "templates/menuSubCategories.html",
					controller: 'CategoriesController',
					resolve: {
						categories: function(ShopService){
							return ShopService.getAllCategories();
						}
					}
				}
			}
		})
			.state('leftdrawer.products', {
			url: "/products/",
			cache: false,
			views: {
				'menuContent': {
					templateUrl: "templates/menuProducts.html",
					controller: 'ProductsController'
				}
			}
		})
			.state('leftdrawer.home', {
			url: '/home',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeViewController',
					resolve: {
						featuredProducts: function(ShopService){
							return ShopService.getCategoryProducts(20);
						}
					}
				}
			}
		})
			.state('leftdrawer.manufacturers', {
			url: '/manufacturers',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/manufacturers.html',
					controller: 'ManufacturersController',
					resolve: {
						manufacturers: function(ShopService){
							return ShopService.getManufacturers();
						}
					}
				}
			}
		})
			.state('userAccount', {
			url: '/account',
			cache: false,
			templateUrl: 'templates/userAccount.html',
			controller: 'UserAccountController',
			resolve: {
				account: function (ShopService) {
					return ShopService.userAccount();
				}
			}
		})
			.state('wishlist', {
			url: '/wishlist',
			cache: false,
			templateUrl: 'templates/wishlist.html',
			controller: 'WishlistController',
			resolve: {
				wishlist: function(ShopService){
					return ShopService.getWishlist();
				}
			}
		})
			.state('leftdrawer.productInfo', {
			url: '/product/:productId',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/menuProductInfo.html',
					controller: 'ProductDetailsController',
					resolve: {
						product: function($stateParams, ShopService) {
							return ShopService.getProduct($stateParams.productId);
						},
						reviews: function ($stateParams, ShopService) {
							return ShopService.getProductReviews($stateParams.productId)
						}
					}
				}
			}
		})
			.state('cart', {
			url: '/cart',
			cache: false,
			templateUrl: 'templates/cart.html',
			controller: 'CartController',
			resolve: {
				cart: function( ShopService) {
					return ShopService.getCart();
				}
			}
		})
			.state('checkout', {
			url: '/checkout',
			cache: false,
			templateUrl: 'templates/checkout.html',
			controller: 'CheckoutController',
			resolve: {
				cart: function(ShopService) {
					return ShopService.getCart();
				},
				account: function (ShopService) {
					return ShopService.userAccount();
				}
			}
		})
			.state('paymentAddress', {
			url: '/paymentAddress',
			cache: false,
			templateUrl: 'templates/checkoutPaymentAddress.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(ShopService) {
					return ShopService.getAddresses();
				}
			}
		})
			.state('shippingAddress', {
			url: '/shippingAddress',
			cache: false,
			templateUrl: 'templates/checkoutShippingAddress.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(ShopService) {
					return ShopService.getAddresses();
				}
			}
		})
			.state('shippingMethod', {
			url: '/shippingMethod',
			cache: false,
			templateUrl: 'templates/checkoutShippingMethod.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(ShopService) {
					return ShopService.getShippingMethod();
				}
			}
		})
			.state('paymentDetails', {
			url: '/paymentDetails',
			cache: false,
			templateUrl: 'templates/paymentDetails.html',
			controller: 'PaymentDetailsController',
			resolve: {
				paymentMethods: function(ShopService) {
					return ShopService.getPaymentMethod();
				}
			}
		})
			.state('newAddress', {
			url: '/newAddress',
			cache: false,
			templateUrl: 'templates/addNewAddress.html',
			controller: 'AddressesController'
		})
			.state('leftdrawer.userLogin', {
			url: '/login',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/userLogin.html',
					controller: 'PersonalInfoController'
				}
			}
		})
			.state('leftdrawer.userRegister', {
			url: '/register',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/userRegister.html',
					controller: 'PersonalInfoController'
				}
			}
		})
			.state('addCard', {
			url: '/addCard',
			cache: false,
			templateUrl: 'templates/checkoutAddCard.html',
			controller: 'PersonalInfoController'
		})
			.state('noInternet', {
			url: '/noInternet',
			templateUrl: 'templates/noInternet.html'
		});
	});

})();

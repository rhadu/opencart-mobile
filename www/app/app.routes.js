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
			.state('leftdrawer.productInfo', {
			url: '/product/:productId',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/productInfo.html',
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

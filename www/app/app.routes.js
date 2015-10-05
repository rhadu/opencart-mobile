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
			.state('leftdrawer.home', {
			url: '/home',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeViewController',
					resolve: {
						featuredCategory: function (CommonService) {
//							var x = 20;
//							return x;
							return CommonService.getFeaturedCategory();
						},
						featuredProducts: function(featuredCategory ,ProductService){
//							var x = {"category_id":20,"name":"Desktops","description":"<p>\r\n\tExample of category description text</p>\r\n","thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/compaq_presario-80x80.jpg","products":[{"product_id":46,"name":"Sony VAIO","description":"\r\n\tUnprecedented power. The next generation of processing technology has arrived. Built into the new..","price":"$1,000.00","special":null,"tax":"$1,000.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/sony_vaio_1-228x228.jpg"},{"product_id":44,"name":"MacBook Air","description":"\r\n\tMacBook Air is ultrathin, ultraportable, and ultra unlike anything else. But you don’t lose..","price":"$1,000.00","special":null,"tax":"$1,000.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/macbook_air_1-228x228.jpg"},{"product_id":43,"name":"MacBook","description":"\r\n\t\r\n\t\tIntel Core 2 Duo processor\r\n\t\r\n\t\tPowered by an Intel Core 2 Duo processor at speeds up to 2.1..","price":"$500.00","special":null,"tax":"$500.00","rating":4,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/macbook_1-228x228.jpg"},{"product_id":29,"name":"Palm Treo Pro","description":"\r\n\tRedefine your workday with the Palm Treo Pro smartphone. Perfectly balanced, you can respond to b..","price":"$279.99","special":null,"tax":"$279.99","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/palm_treo_pro_1-228x228.jpg"},{"product_id":33,"name":"Samsung SyncMaster 941BW","description":"\r\n\tImagine the advantages of going big without slowing down. The big 19\" 941BW monitor combines..","price":"$200.00","special":null,"tax":"$200.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/samsung_syncmaster_941bw-228x228.jpg"},{"product_id":40,"name":"iPhone","description":"\r\n\tiPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a nam..","price":"$101.00","special":null,"tax":"$101.00","rating":4,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/iphone_1-228x228.jpg"},{"product_id":35,"name":"Product 8","description":"\r\n\tProduct 8\r\n..","price":"$100.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/placeholder-228x228.png"},{"product_id":48,"name":"iPod Classic","description":"\r\n\t\r\n\t\t\r\n\t\t\tMore room to move.\r\n\t\t\r\n\t\t\tWith 80GB or 160GB of storage and up to 40 hours of battery l..","price":"$100.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/ipod_classic_1-228x228.jpg"},{"product_id":28,"name":"HTC Touch HD","description":"\r\n\tHTC Touch - in High Definition. Watch music videos and streaming content in awe-inspiring high de..","price":"$100.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/htc_touch_hd_1-228x228.jpg"},{"product_id":47,"name":"HP LP3065","description":"\r\n\tStop your co-workers in their tracks with the stunning new 30-inch diagonal HP LP3065 Flat Panel ..","price":"$100.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/hp_1-228x228.jpg"},{"product_id":42,"name":"Apple Cinema 30\"","description":"\r\n\tThe 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed sp..","price":"$100.00","special":"$90.00","tax":"$90.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/apple_cinema_30-228x228.jpg"},{"product_id":30,"name":"Canon EOS 5D","description":"\r\n\tCanon\'s press material for the EOS 5D states that it \'defines (a) new D-SLR category\', while we\'r..","price":"$100.00","special":"$80.00","tax":"$80.00","rating":0,"thumb_image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/canon_eos_5d_1-228x228.jpg"}],"filtergroups":[]};
//							return x;
							return ProductService.getCategoryProducts(featuredCategory.data.selectedCategoryId);
						},
						cart: function (CartService) {
							return CartService.getCart();
						},
						banner : function (CommonService) {
//							var x ={"banners":[{"title":"Htc HD","link":"http://185.16.40.144/opencart-2.0.1.0/upload/index.php?route=product/product&path=24&product_id=28","image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/htc_touch_hd_1-320x160.jpg"},{"title":"iPhone 6","link":"index.php?route=product/product&path=57&product_id=49","image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/banners/iPhone6-320x160.jpg"},{"title":"MacBookAir","link":"http://185.16.40.144/opencart-2.0.1.0/upload/index.php?route=product/category&path=20_27","image":"http://185.16.40.144/opencart-2.0.1.0/upload/image/cache/catalog/demo/banners/MacBookAir-320x160.jpg"}]};
//							return x;
							return CommonService.getBanner();
						}
					}
				}
			}
		})
			.state('leftdrawer.categories', {
			url: "/menu/categories",
			cache: false,
			views: {
				'menuContent': {
					templateUrl: "templates/menuCategories.html",
					controller: 'CategoriesController',
					resolve: {
						categories: function(ProductService){
							return ProductService.getAllCategories();
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
						categories: function(ProductService){
							return ProductService.getAllCategories();
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
			.state('leftdrawer.manufacturers', {
			url: '/manufacturers',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/manufacturers.html',
					controller: 'ManufacturersController',
					resolve: {
						manufacturers: function(ProductService){
							return ProductService.getManufacturers();
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
				account: function (AccountService) {
					return AccountService.userAccount();
				}
			}
		})
			.state('wishlist', {
			url: '/wishlist',
			cache: false,
			templateUrl: 'templates/wishlist.html',
			controller: 'WishlistController',
			resolve: {
				wishlist: function(AccountService){
					return AccountService.getWishlist();
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
						product: function($stateParams, ProductService) {
							return ProductService.getProduct($stateParams.productId);
						},
						reviews: function ($stateParams, ProductService) {
							return ProductService.getProductReviews($stateParams.productId)
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
				cart: function( CartService) {
					return CartService.getCart();
				}
			}
		})
			.state('checkout', {
			url: '/checkout',
			cache: false,
			templateUrl: 'templates/checkout.html',
			controller: 'CheckoutController',
			resolve: {
				cart: function(CartService) {
					return CartService.getCart();
				},
				account: function (AccountService) {
					return AccountService.userAccount();
				}
			}
		})
			.state('paymentAddress', {
			url: '/paymentAddress',
			cache: false,
			templateUrl: 'templates/checkoutPaymentAddress.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(AccountService) {
					return AccountService.getAddresses();
				}
			}
		})
			.state('shippingAddress', {
			url: '/shippingAddress',
			cache: false,
			templateUrl: 'templates/checkoutShippingAddress.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(AccountService) {
					return AccountService.getAddresses();
				}
			}
		})
			.state('shippingMethod', {
			url: '/shippingMethod',
			cache: false,
			templateUrl: 'templates/checkoutShippingMethod.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(CheckoutService) {
					return CheckoutService.getShippingMethod();
				}
			}
		})
			.state('paymentDetails', {
			url: '/paymentDetails',
			cache: false,
			templateUrl: 'templates/paymentDetails.html',
			controller: 'PaymentDetailsController',
			resolve: {
				paymentMethods: function(CheckoutService) {
					return CheckoutService.getPaymentMethod();
				}
			}
		})
			.state('newAddress', {
			url: '/newAddress',
			cache: false,
			templateUrl: 'templates/addNewAddress.html',
			controller: 'AddressesController'
		})

			.state('editAddress', {
			url: '/editAddress',
			cache: false,
			templateUrl: 'templates/editAddresses.html',
			controller: 'DeliveryDetailsController',
			resolve: {
				deliveryData: function(AccountService) {
					return AccountService.getAddresses();
				}
			}
		})
			.state('accountDetails', {
			url: '/accountDetails',
			cache: false,
			templateUrl: 'templates/accountDetails.html',
			controller: 'UserAccountController',
			resolve: {
				account: function (AccountService) {
					return AccountService.userAccount();
				}
			}
		})
			.state('changePassword', {
				url: '/changePassword',
				cache: false,
				templateUrl: 'templates/changePassword.html',
				controller: 'UserAccountController',
				resolve: {
					account: function (AccountService) {
						return AccountService.userAccount();
					}
				}
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
			controller: 'CheckoutController',
			resolve: {
				cart: function(CartService) {
					return CartService.getCart();
				},
				account: function (AccountService) {
					return AccountService.userAccount();
				}
			}
		})
			.state('goodbye', {
			url: '/goodbye',
			cache: false,
			templateUrl: 'templates/goodbye.html',
			controller: 'PersonalInfoController'
		})
			.state('settings', {
			url: '/settings',
			cache: false,
			templateUrl: 'templates/settings.html',
			controller: 'SettingsController',
			resolve: {
				notifications: function ($localStorage) {
					return $localStorage.notifications
				}
			}

		})
			.state('messages', {
			url: '/messages',
			cache: false,
			templateUrl: 'templates/messages.html',
			controller: 'SettingsController',
			resolve: {
				notifications: function ($localStorage) {
					return $localStorage.notifications
				}
			}
		})
			.state('noInternet', {
			url: '/noInternet',
			templateUrl: 'templates/noInternet.html'
		});
	});

})();

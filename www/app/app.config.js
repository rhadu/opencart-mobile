'use strict';
(function () {
	var app = angular.module('app.config', ['ui.router']);

	app.constant('TAPITOO_CONFIG', {
		backend: 'http://185.16.40.144',
		restaurantID: '9016e8c1-0c3d-4da2-9823-4a64d8dc5b43',
		facebookID: '271360646354244'
	});

	app.constant('OC_CONFIG', (function() {
//		var backend = 'http://apitoo.gungoos.com/opencart-2.0.0.0/upload/api/v1';
//		var backend = 'http://185.16.40.144/opencart-2.0.0.0/upload/api/v1';
		var backend = 'http://185.16.40.144/opencart-2.0.1.0/upload/api/v1';
//		var backend = 'http://185.16.40.144/opencart-2.0.2.0/upload/api/v1';
		return {
//			TOKEN: '8PaRv1SKlKZYxOTzbM0b3UZ9uRC6vUut7FZFNJPD', // gungoos
//			TOKEN: '297zUnNSL6QtjwAZvG5FaCVyOen8pu6kcHblOaLb', // 2.0.0.0
			TOKEN: 'X68AWVTSMNblJki5OzcSnYLtw3HxPWdgyGevyiE4', // 2.0.1.0
//			TOKEN: 'Z8LMyppPFlg8keJD0XDPL2sP8YUUv8qIfKqKmndg', // 2.0.2.0
			BACKEND : backend,
			CATEGORIES: backend + '/product/category/',
			PRODUCT: backend + '/product/product/',
			REVIEWS: backend + '/product/review/',
			SPECIAL: backend + '/product/special/',
			MANUFACTURER: backend + '/product/manufacturer/',
			SEARCH: backend + '/product/search',
			CART: backend + '/cart/product/',
			EDIT_CART: backend + '/cart/',
			GET_CART: backend + '/cart/cart/',
			ACCOUNT: backend + '/account/',
			CHECKOUT: backend + '/checkout/',
			WISHLIST: backend + '/account/wishlist/',
			COMMON: backend + '/common/'
		}
	})());

})();

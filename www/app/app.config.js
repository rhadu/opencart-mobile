'use strict';
(function () {
	var app = angular.module('app.config', ['ui.router']);

	app.constant('TAPITOO_CONFIG', {
		backend: 'http://185.16.40.144',
		restaurantID: '9016e8c1-0c3d-4da2-9823-4a64d8dc5b43',
		facebookID: '271360646354244'
	});

	app.constant('OC_CONFIG', (function() {
		// Define backend url
		var backend = 'http://apitoo.gungoos.com/opencart-2.0.0.0/upload/api/v1';
		// Use the variable backend to build constants
		return {
			TOKEN: '8PaRv1SKlKZYxOTzbM0b3UZ9uRC6vUut7FZFNJPD',
			BACKEND : backend,
			CATEGORIES: backend + '/product/category/',
			PRODUCT: backend + '/product/product/'
		}
	}));

})();

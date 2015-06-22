'use strict';
(function () {
	var app = angular.module('Tapitoo.HomeViewController', ['ui.router']);
	//factory for cart operations
	app.controller('HomeViewController', function ($scope,$state, $rootScope, featuredProducts, $ionicSlideBoxDelegate, $ionicGesture, $timeout,  ShopService) {

		$scope.featuredProducts = featuredProducts;
		console.log($scope.featuredProducts);
		//ShopService.getManufacturers();


		//ShopService.getAllCategories();
		//ShopService.getCategoryProducts('20');
		//ShopService.getProduct('44');

		// function (search, tag, description, category_id, sub_category, sort, order, page, limit)
		ShopService.searchProducts('mac', 'laptop' , false, '20', false, 'price', 'ASC' );

		$scope.goToProduct = function(id) {
			$state.go("leftdrawer.productInfo", {productId: id})
		}
	})

})();



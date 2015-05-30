'use strict';
(function () {
	var app = angular.module('ProductsDetailsCtrl', ['ui.router']);

	app.controller('ProductDetailsController', function ($scope, $timeout, $state, RestaurantService, CartService) {
		$scope.restaurantName = RestaurantService.restaurantName;
		//$scope.menuProducts = RestaurantService.products;
		$scope.productInfo = RestaurantService.productInfo;
		console.log($scope.productInfo.categoryId);
		$scope.productTotal = CartService.productPrice($scope.productInfo);
		$scope.url = RestaurantService.url;
		$scope.badgeTest = CartService.showTotal();
		$scope.addedToCart = true;


		$scope.selected = {};
		$scope.addModifier = function (modif, item) {
			$scope.productTotal = 0;
			if (modif.type === 'single') {
				angular.forEach(modif.modifierElement, function (item) {
					item.checked = false;
				});
				item.checked = true;
			}
			if (modif.type === 'multiple') {
				if (item.checked === true)
					item.checked = false;
				else
					item.checked = true;
			}

			$scope.productTotal = CartService.productPrice($scope.productInfo);
		};

		//add product to cart
		$scope.addToCart = function (item) {

			console.log(item);
			$scope.addedToCart = false;
			$timeout(function () {
				$scope.addedToCart = true;
			}, 700);
			item.quantity = CartService.incrementItem(item);
			CartService.addToOrder(item);
			$scope.badgeTest = CartService.showTotal();
			$state.go("products", {restaurantName: $scope.restaurantName, categoryId:item.categoryId})
		};
	});
})();

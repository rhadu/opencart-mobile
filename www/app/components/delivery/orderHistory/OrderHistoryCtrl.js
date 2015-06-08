'use strict';
(function () {
	var app = angular.module('OrderHistoryCtrl', ['ui.router']);

	app.controller('OrderHistoryController', function ($scope, $timeout, $state, DeliveryInfoService, CartService, ShopService, $rootScope) {
		//get orders saved in local storage
		$scope.restaurantName = ShopService.restaurantName
		$scope.orders = DeliveryInfoService.getOrders();
		console.log($scope.orders);

		//update cart with selected order
		$scope.orderToCart = function (order) {

			CartService.products = order.products;
			if (order.restaurantName !== ShopService.restaurantName) {
				ShopService.restaurantName = order.restaurantName;
				ShopService.setRestaurantIDs(order.restaurantId, order.locationId, order.restaurantName, order.info);
				$scope.$on('restaurantLoaded', function () {
					$timeout(function () {
						$rootScope.deliveryType = order.type;
						CartService.products = order.products;
						console.log($rootScope.deliveryType);
						$state.go('cart');
					}, 0, false);
				});
			}
			else {
				$state.go('cart');
			}
		};
	});
})();

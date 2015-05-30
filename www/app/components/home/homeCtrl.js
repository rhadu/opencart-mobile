'use strict';
(function () {
	var app = angular.module('HomeCtrl', ['ui.router']);
	app.controller('WelcomeController', function ($scope, DeliveryInfoService, CartService, RestaurantService, $state, $timeout, $translate, $ionicPopup, $rootScope, $http) {
		//get orders saved in local storage
		$scope.orders = DeliveryInfoService.getOrders();

		//update cart with selected order
		$scope.orderToCart = function () {
			if ($scope.orders !== false) {
				var order = $scope.orders[0];
				CartService.products = order.products;
				if (order.restaurantName !== RestaurantService.restaurantName) {
					RestaurantService.restaurantName = order.restaurantName;
					RestaurantService.setRestaurantIDs(order.restaurantId, order.locationId, order.restaurantName, order.info);
					$scope.$on('restaurantLoaded', function () {
						$timeout(function () {
							$rootScope.deliveryType = order.type;
							CartService.products = order.products;
							$state.go('cart');
						}, 0, false);
					});
				}
				else {
					$state.go('cart');
				}
			}

			if ($scope.orders === false)
				$translate(['popup.info', 'popup.no_orders']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.info'],
						template: translate['popup.no_orders'],
						buttons: [{
							text: 'OK',
							type: 'button-search'
						}]
					});
				});
		};
	});
})();

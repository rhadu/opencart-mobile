'use strict';
(function () {
	var app = angular.module('AddressListCtrl', ['ui.router']);

	app.controller('AddressesController', function ($scope, $state, DeliveryInfoService, CartService, RestaurantService) {
		$scope.restaurantName = RestaurantService.restaurantName;
		$scope.addressList = DeliveryInfoService.getAddresses();
				console.log('reload times');
		//select address
		$scope.selectAddress = function (adr) {
			console.log(adr);
			DeliveryInfoService.address = adr;
			if (CartService.products.length > 0)
				$state.go('cart');
			else
				$state.go('leftdrawer.categories', {restaurantName: $scope.restaurantName});
		};
		//check what view to show
		$scope.backFromAddresses = function () {
			if (CartService.products.length > 0)
				$state.go('cart');
			else
				$state.go('leftdrawer.categories', {restaurantName: $scope.restaurantName});
		};
	});
})();

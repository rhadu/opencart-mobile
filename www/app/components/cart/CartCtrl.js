'use strict';
(function () {
	var app = angular.module('CartCtrl', ['ui.router']);

	app.controller('CartController', function ($scope, $ionicPopup, $state, $translate, ShopService, CartService, DeliveryInfoService) {
		$scope.restaurantName = ShopService.restaurantName;
		$scope.categoryName = ShopService.categoryName;
		$scope.cartItems = CartService.products;
		$scope.address = DeliveryInfoService.address;
		$scope.user = DeliveryInfoService.getUserInfo();
		$scope.deliveryFee = ShopService.info.deliveryFee;

		var total = function () {
			return parseFloat(CartService.showTotal()) + parseFloat($scope.deliveryFee);
		};
		$scope.totalOrder = total();

		//increment product quantity
		$scope.incrementQuantity = function (item) {
			item.quantity = CartService.incrementItem(item);
			$scope.totalOrder = total();
		};
		//decrement product quantity
		$scope.decrementQuantity = function (item) {
			item.quantity = CartService.decrementItem(item);
			$scope.totalOrder = total();
		};
		//delete product
		$scope.deleteItem = function (item) {
			item.quantity = CartService.deleteItem(item);
			$scope.totalOrder = total();
		};
		//place order
		$scope.placeOrder = function () {
			//check if cart empty
			if ($scope.cartItems.length === 0) {
				$translate(['popup.cart', 'popup.add_products']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.cart'],
						template: translate['popup.add_products'],
						buttons: [{
							text: 'OK',
							type: 'button-search',
							onTap: function () {
								$state.go("leftdrawer.categories", {restaurantName: $scope.restaurantName});
							}
						}]
					});
					return false;
				});
			}
			//check if total order price is bigger than the minimum delivery fee
			if ($scope.totalOrder < ShopService.info.minDeliveryFee) {
				$translate(['popup.cart', 'popup.min_order',  'popup.add_prod']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.cart'],
						template: translate['popup.min_order'] +' '+ ShopService.info.minDeliveryFee + '. ' + translate['popup.add_prod'],
						buttons: [{
							text: 'OK',
							type: 'button-search'
						}]
					});
					return false;
				});
			}
			// check if address is set
			if (!$scope.address.street) {
				$translate(['popup.cart', 'popup.choose_address']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.cart'],
						template: translate['popup.choose_address'],
						buttons: [{
							text: 'OK',
							type: 'button-search',
							onTap: function () {
								$state.go("addresses");
							}
						}]
					});
					return false;
				});
			}
			if (!$scope.user) {
				$translate(['popup.cart', 'popup.personal_info']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.cart'],
						template: translate['popup.personal_info'],
						buttons: [{
							text: 'OK',
							type: 'button-search',
							onTap: function () {
								$state.go("personalInfoEdit");
							}
						}]
					});
					return false;
				});
			}
			//send order through factory
			ShopService.sendOrder();
		};
	});
})();

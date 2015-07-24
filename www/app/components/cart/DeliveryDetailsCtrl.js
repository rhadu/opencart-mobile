'use strict';
(function () {
	var app = angular.module('DeliveryDetailsCtrl', ['ui.router']);

	app.controller('DeliveryDetailsController', function (deliveryData,$rootScope, $scope, $ionicPopup, $state, $translate, ShopService) {
		$scope.deliveryData = deliveryData;

		$scope.setAddress = function (address) {
			console.log(address);
			$scope.address = address;
			$scope.address.existing = true;
		}

		$scope.chooseShippingMethod = function (method) {
			console.log(method);
			$scope.shippingMethod = method;
		}

		$scope.setPaymentAddress = function () {
			ShopService.postPaymentAddress($scope.address).finally(function () {
				$state.go('shippingAddress');
			});
		}

		$scope.setShippingAddress = function () {
			ShopService.postShippingAddress($scope.address).finally(function () {
				$state.go('shippingMethod');
			});
		}

		$scope.setShippingMethod = function () {
			ShopService.postShippingMethod($scope.shippingMethod).finally(function () {
				$state.go('paymentDetails');
			});
			$rootScope.checkoutStep1 = true;
		}

		$scope.getShippingMethod = function () {
			ShopService.getShippingMethod();
		}


	});
})();

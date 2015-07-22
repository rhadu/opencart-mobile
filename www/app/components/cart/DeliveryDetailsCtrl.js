'use strict';
(function () {
	var app = angular.module('DeliveryDetailsCtrl', ['ui.router']);

	app.controller('DeliveryDetailsController', function (addresses, deliveryType, $scope, $ionicPopup, $state, $translate, ShopService) {
		$scope.addresses = addresses;

		$scope.setAddress = function (address) {
			$scope.address = address;
			$scope.address.existing = true;
			console.log($scope.address);
		}

		$scope.saveAddress = function () {
//			var address = $scope.address;
//			address.existing = true;

		//	ShopService.postPaymentAddress(address);
//			ShopService.postShippingAddress(address);
//			ShopService.postShippingMethod();
			$state.go('checkout');
		}


		$scope.step1 = function () {
			ShopService.postPaymentAddress($scope.address);
		}

		$scope.step2 = function () {
			ShopService.postShippingAddress($scope.address);
		}

		$scope.step3 = function () {
			ShopService.getShippingMethod();
		}

		$scope.step4 = function () {
			ShopService.postShippingMethod();
		}

		$scope.checkout = function () {
			var address ={};
			var delivery = {};
			var payment = {};
			address.existing = true;
			address.id = '1';
			delivery.code = 'flat.flat'
			payment.code = 'cod'
			payment.agree = 'true'
			payment.comment = 'da da da'

			//			ShopService.postPaymentAddress(address);
			//			ShopService.postShippingAddress(address);
			//			ShopService.getShippingMethod();
			//			ShopService.postShippingMethod(delivery);
			//			ShopService.getPaymentMethod();
			//			ShopService.postPaymentMethod(payment);
			//			ShopService.getCheckoutConfirm();
			//			ShopService.getCheckoutPay()
			//			ShopService.getCheckoutSuccess();

		}
	});
})();

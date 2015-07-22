'use strict';
(function () {
	var app = angular.module('PaymentDetailsCtrl', ['ui.router']);

	app.controller('PaymentDetailsController', function ($scope, paymentMethods, $ionicPopup, $state, $translate, ShopService) {
		//$scope.addresses = addresses;
		$scope.paymentMethods = paymentMethods;

		$scope.setPayment = function (method) {
			$scope.method = method;
			console.log(method);
		}

		$scope.savePayment = function () {
			var method = $scope.method;
			//address.existing = true;

			ShopService.postPaymentMethod(method);
			$state.go('checkout');
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

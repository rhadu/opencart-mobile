'use strict';
(function () {
	var app = angular.module('CheckoutCtrl', ['ui.router']);

	app.controller('CheckoutController', function (cart, account, $scope, $ionicPopup, $state, $translate, ShopService) {
		$scope.cart = cart;
		$scope.account = account.data.account;
		$scope.address = ShopService.currentAddress;

		$scope.checkout = function () {
			console.log(account);
return;
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
			ShopService.getCheckoutConfirm();
			//			ShopService.getCheckoutPay()
			//			ShopService.getCheckoutSuccess();
			//			$state.go('leftdrawer.home');
		}

		$scope.step7 = function () {
			ShopService.getCheckoutPay()
		}
		$scope.step8 = function () {
			ShopService.getCheckoutSuccess();
			$state.go('leftdrawer.home');
		}
	});
})();

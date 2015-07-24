'use strict';
(function () {
	var app = angular.module('CheckoutCtrl', ['ui.router']);

	app.controller('CheckoutController', function (cart, account, $scope, $rootScope, $ionicPopup, $state, $translate, ShopService) {
		$scope.cart = cart;
		$scope.account = account.data.account;
		$scope.address = ShopService.currentAddress;
		$scope.payment = ShopService.currentPayment;

		$scope.checkout = function () {
//			if($rootScope.checkoutStep1 === true && $rootScope.checkoutStep2 === true){
//				ShopService.getCheckoutConfirm();
//			}

			if($rootScope.checkoutStep3 === true){
				ShopService.getCheckoutPay().finally(function () {
					$scope.step8();
				})
			}

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

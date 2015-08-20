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
				//				ShopService.getCheckoutPay();
				var promise = ShopService.getCheckoutPay();
				promise.then(
					function(response) {
						console.log(response.data);
						$scope.checkoutSuccess();
					},
					function(error) {
						console.log(error.data);

					});
			}
		}

		$scope.checkoutSuccess = function () {
			var promise = ShopService.getCheckoutSuccess();
			promise.then(
				function(response) {
					console.log(response);
					$state.go('leftdrawer.home');
				},
				function(error) {
					console.log(error);

				});
		}

	});
})();

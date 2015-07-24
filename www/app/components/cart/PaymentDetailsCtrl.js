'use strict';
(function () {
	var app = angular.module('PaymentDetailsCtrl', ['ui.router']);

	app.controller('PaymentDetailsController', function ($scope, $rootScope, paymentMethods, $ionicPopup, $state, $translate, ShopService) {
		//$scope.addresses = addresses;
		$scope.paymentMethods = paymentMethods;

		$scope.setPayment = function (method) {
			$scope.method = method;
			console.log(method);
		}

		$scope.savePayment = function () {
			var method = $scope.method;
			//address.existing = true;

			ShopService.postPaymentMethod(method).finally(function () {
				ShopService.currentPayment = method;
				$rootScope.checkoutStep2 = true;

				if($rootScope.checkoutStep1 === true ) {
					ShopService.getCheckoutConfirm();
					$rootScope.checkoutStep3 = true;
				}

				$state.go('checkout');
			});
			//
		}
	});
})();

'use strict';
(function () {
	var app = angular.module('PaymentDetailsCtrl', ['ui.router']);

	app.controller('PaymentDetailsController', function ($scope, $rootScope,$localStorage,$ionicHistory, paymentMethods, $ionicPopup, $state, $translate, ShopService, CheckoutService, CheckoutProcessService) {
		//$scope.addresses = addresses;
		$scope.paymentMethods = paymentMethods;

		$scope.goBack = function() {
			console.log("go back!");
			if($localStorage.shippingMethod && $localStorage.shippingMethod !== null){
				$ionicHistory.goBack();
			}
			else {
				$ionicHistory.goBack();
			}
		};

		$scope.setPayment = function (method) {
			for(var i=0 ; i < $scope.paymentMethods.length ;i++){
				if($scope.paymentMethods[i].code === method.code){
					$scope.paymentMethods[i].checked = true;
				}
				else{
					$scope.paymentMethods[i].checked = false;
				}
			}
		}

		if($localStorage.paymentMethod  && $localStorage.paymentMethod !== null){
			console.log( $localStorage.paymentMethod);
			console.log($scope.paymentMethods);
			for(var i=0; i<$scope.paymentMethods.length; i++){
				if($scope.paymentMethods[i].code === $localStorage.paymentMethod.code){
					$scope.paymentMethods[i].checked = true;
				}
				else{
					$scope.paymentMethods[i].checked = false;
				}
			}
		}

		$scope.savePayment = function () {
			for(var i=0 ; i < $scope.paymentMethods.length ;i++){
				if($scope.paymentMethods[i].checked === true){
					console.log($scope.paymentMethods[i]);
					$scope.method = $scope.paymentMethods[i];
				}
			}

			if(!$scope.method){
				$ionicPopup.alert({
					title: 	"Sorry",			//translate['popup.info'],
					template: "You have to choose a payment method",		//translate['popup.not_in_delivery_zone'],
					buttons: [{
						text: 'OK',
						type: 'button-calm'
					}]
				});
				return false;
			}
			$localStorage.paymentMethod = $scope.method;
			CheckoutService.currentPayment = $scope.method;
			CheckoutProcessService.checkout('confirm');
			//			$state.go('checkout');
		}
	});
})();

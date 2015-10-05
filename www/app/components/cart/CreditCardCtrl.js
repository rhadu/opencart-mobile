'use strict';
(function () {
	var app = angular.module('CreditCardCtrl', ['ui.router']);

	app.controller('CreditCardController', function ($scope,$ionicLoading, $rootScope, $localStorage, $ionicPopup, $state, $translate, CheckoutService, CheckoutProcessService) {
		$scope.card = {};
		$scope.number = '12312';

		$scope.savePayment = function (myform) {
//			console.log(myform.number);
			console.log($scope.card);
			console.log($scope.card.number);
			//			console.log($scope.myForm.card);
			//console.log($scope.card.number.$card);
			//			return;
			//			console.log($localStorage.paymentMethod);
				CheckoutService.payNow($localStorage.paymentMethod.code, $scope.cardData)

		}

	});
})();

'use strict';
(function () {
	var app = angular.module('PersonalInfoCtrl', ['ui.router']);

	app.controller('PersonalInfoController', function ($scope, $state, $translate, $ionicPopup, ShopService) {
		//save user info
		$scope.user = {};

		$scope.login = function () {
			console.log($scope.user);
			var promise = ShopService.userLogin($scope.user);
			promise.then(
				//if login was succesfull redirect to cart
				function(response) {
					console.log(response.data);
					$state.go("cart")
				},
				//throw error popup if credentials are wrong
				function(error) {
					console.log(error.data);
					//$state.go("leftdrawer.userLogin")
				});
		}
	});

})();

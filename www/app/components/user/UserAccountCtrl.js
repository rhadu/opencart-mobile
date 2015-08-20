'use strict';
(function () {
	var app = angular.module('UserAccountCtrl', ['ui.router']);

	app.controller('UserAccountController', function ($scope, account,$state,$timeout, $ionicModal, $translate, $ionicPopup, ShopService) {
		$scope.account = account;

		$scope.logOut = function () {
			console.log("asadasdaobj");
			ShopService.userLogout();
			$state.go('leftdrawer.home')

		}

	})
})();

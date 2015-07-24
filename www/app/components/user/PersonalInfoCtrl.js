'use strict';
(function () {
	var app = angular.module('PersonalInfoCtrl', ['ui.router']);

	app.controller('PersonalInfoController', function ($scope, $state,$timeout, $ionicModal, $translate, $ionicPopup, ShopService) {
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

		$ionicModal.fromTemplateUrl('templates/modal-country.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.countryModal = modal;
		})

		$ionicModal.fromTemplateUrl('templates/modal-zones.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.zonesModal = modal;
		})

		$scope.openModalCountry = function () {
			var promise = ShopService.getCountries();
			promise.then(
				function(response) {
					console.log(response.data.countries);
					$scope.countries = response.data.countries;
					$scope.countryModal.show()
				},
				function(error) {
					console.log(error.data);
				});
		}

		$scope.chooseCountry = function (country) {
			$timeout(function () {
				$scope.user.country_id = country.country_id
				$scope.user.country_name = country.name
				$scope.selectedCountry = country;
				$scope.countryModal.hide();
			}, 0, false);
		}

		$scope.openModalZoneID = function () {
			console.log($scope.selectedCountry);
			if($scope.selectedCountry){
				var promise = ShopService.getZoneIds($scope.selectedCountry.country_id);
				promise.then(
					function(response) {
						console.log(response.data.country.zones);
						$scope.zones = response.data.country.zones;
						$scope.zonesModal.show()
					},
					function(error) {
						console.log(error.data);
					});
			}
			else{
				return;
			}
		}

		$scope.chooseZone = function (zone) {
			console.log(zone);
			$timeout(function () {
				$scope.user.zone_id = zone.zone_id;
				$scope.user.zone_name = zone.name;
				$scope.selectedZone = zone;
				$scope.zonesModal.hide();
			}, 0, false);
		}

		$scope.register = function () {
//			ShopService.userAccount();
//			return;

			//			ShopService.userLogout();
			//			return

			$scope.user.agree = true;
			var promise = ShopService.userRegister($scope.user);
			promise.then(
				function(response) {
					console.log(response);
					$state.go("cart")
				},
				function(error) {
					console.log(error);
					$state.go("cart")
				});

		}

		$scope.logOut = function () {
			ShopService.userLogout();
		}
	});

})();

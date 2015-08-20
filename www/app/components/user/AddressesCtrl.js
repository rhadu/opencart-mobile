'use strict';
(function () {
	var app = angular.module('AddressesCtrl', ['ui.router']);

	app.controller('AddressesController', function ($scope, $state,$timeout, $rootScope,$ionicHistory, $ionicModal, $translate, $ionicPopup, ShopService) {
		//save user info
		$scope.address = {};

		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

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
				$scope.address.country_id = country.country_id
				$scope.address.country_name = country.name
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
				$scope.address.zone_id = zone.zone_id;
				$scope.address.zone_name = zone.name;
				$scope.selectedZone = zone;
				$scope.zonesModal.hide();
			}, 0, false);
		}

		$scope.addNewAddress = function () {
			$scope.address.firstname = $rootScope.account.firstname;
			$scope.address.lastname = $rootScope.account.lastname;
			var promise = ShopService.addAddress($scope.address);
			promise.then(
				function(response) {
					console.log(response);
					$ionicHistory.goBack();
				},
				function(error) {
					console.log(error);
				});

		}

	});

})();

'use strict';
(function () {
	var app = angular.module('DeliveryInformationCtrl', ['ui.router']);

	app.controller('DeliveryInformationController', function ($scope, $state, $ionicPopup, $translate, DeliveryInfoService, LocationServices, CartService, RestaurantService) {
		$scope.user = DeliveryInfoService.user;
		DeliveryInfoService.user = $scope.user;
		$scope.address = DeliveryInfoService.address;

		$scope.address.street = LocationServices.geoStreet;
		$scope.address.number = LocationServices.geoNumber;
		$scope.address.locality = LocationServices.geoLocality;

		$scope.getLocation = function () {
			RestaurantService.getCurrentLocation();
			$scope.$on('locationLoaded', function (event, loc) {
				$state.go('location');
			});
		};



		//facebook login
		$scope.facebookLogin = function () {
			facebookConnectPlugin.getLoginStatus(
					function (response) {
						if (response.status === 'connected') {
							FBlogin();
						}
						else
							facebookConnectPlugin.login(['email, public_profile'],
									function (response) {
										if (response.status === 'connected') {
											FBlogin();
										}
									});
					},
					function (error) {
						console.log(JSON.stringify(error));
					});
		};

		var FBlogin = function () {
			facebookConnectPlugin.api('/me/?fields=first_name,last_name,email', ['public_profile'],
					function (response) {
						DeliveryInfoService.user = response;
						$scope.user = response;
						$scope.$apply();
					},
					function (response) {
						console.log(JSON.stringify(response));
					});

		};

		//save info in local storage
		$scope.saveInfo = function (user, address) {
			var geoAddress = $scope.address.street + ' ' + $scope.address.number + ' ' + $scope.address.locality;

			LocationServices.geocodeAddress(geoAddress);
			$scope.$on('geocodedAddress', function () {
				setAddress();
			});

			function setAddress() {
				console.log(RestaurantService.loc);
				if ($scope.address.street && $scope.address.number && $scope.address.locality) {
					$scope.$apply();
					DeliveryInfoService.address = {street: $scope.address.street, number: $scope.address.number, locality: $scope.address.locality, coordinates: {lat: RestaurantService.loc.lat, lon: RestaurantService.loc.lon}};
					DeliveryInfoService.saveAddress(DeliveryInfoService.address);
					if (!window.localStorage.getItem("userInfo")) {
						$state.go("personalInfoEdit");
						return false;
					}
					if (CartService.products.length > 0)
						$state.go('cart');
					else
						$state.go('leftdrawer.categories', {restaurantName: RestaurantService.restaurantName});
				}
				else {
					$translate(['popup.delivery_info', 'popup.req_fields']).then(function (translate) {
						$ionicPopup.alert({
							title: translate['popup.delivery_info'],
							template: translate['popup.req_fields'],
							buttons: [{
									text: 'OK',
									type: 'button-search'
								}]
						});
						return false;
					});
				}
			}
		};
	});
})();

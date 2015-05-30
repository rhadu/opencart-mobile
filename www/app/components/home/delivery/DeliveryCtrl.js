'use strict';
(function () {
	var app = angular.module('DeliveryCtrl', ['ui.router']);
	app.controller('DeliveryController', function ($scope, $rootScope, $translate, RestaurantService, $state, $timeout, LocationServices, $ionicPopup) {

		$scope.restaurant = RestaurantService.restaurants;
		$scope.restaurantName = RestaurantService.restaurantName

		$scope.getRestaurant = function () {
			console.log(RestaurantService.loc);
			RestaurantService.getRestaurants(RestaurantService.loc, 'delivery');
			$rootScope.deliveryType = "delivery";
		};

		$scope.findNearby = function () {
			RestaurantService.getCurrentLocation();
			$scope.$on('locationLoaded', function (event, loc) {
				$timeout(function () {
					//geocode position
					LocationServices.geocodePosition();
					$scope.$on('addressLoaded', function () {
						console.log('aaaaa');
						//RestaurantService.getRestaurants(RestaurantService.loc, 'delivery');
					});
					$rootScope.deliveryType = "pickup";
				}, 0, false);
			});
		};

		$scope.getAllLocations = function () {
			console.log(RestaurantService.loc);
			if (RestaurantService.loc.length === 0) {
				$translate(['popup.location', 'popup.choose_location']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.location'],
						template: translate['popup.choose_location'],
						buttons: [{
							text: 'OK',
							type: 'button-search'
						}]
					});
					return false;
				});
			}
			else
				RestaurantService.getRestaurants(RestaurantService.loc, 'pickup');

			$scope.$on('restaurantFound', function () {
				$timeout(function () {
					$scope.restaurant = RestaurantService.restaurants;
					console.log($scope.restaurant.locations);
					$scope.$apply();
					$state.go('locationsList');
				}, 0, false);
			});
		};

		$scope.goToLocation = function (location) {
			console.log(location);
			console.log($scope.restaurant);
			RestaurantService.setRestaurantIDs($scope.restaurant.restaurantId, location.locationId, $scope.restaurant.restaurantName, location);
			$scope.$on('restaurantLoaded', function () {
				$timeout(function () {
					$state.go('leftdrawer.categories', {restaurantName: $scope.restaurantName});
				}, 0, false);
				$rootScope.deliveryType = "pickup";
			});
		};
	});

})();

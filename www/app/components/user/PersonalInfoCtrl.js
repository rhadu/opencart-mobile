'use strict';
(function () {
	var app = angular.module('PersonalInfoCtrl', ['ui.router']);

	app.controller('PersonalInfoController', function ($scope, $state, $translate, $ionicPopup, DeliveryInfoService, CartService, RestaurantService) {
		$scope.user = DeliveryInfoService.getUserInfo() || {};
		$scope.restaurantName = RestaurantService.restaurantName;
		//save user info
		$scope.saveInfo = function (user) {
			if ($scope.user.first_name && $scope.user.last_name && $scope.user.phone && $scope.user.email) {
				DeliveryInfoService.saveUserInfo(user);
				if (CartService.products.length > 0)
					$state.go('cart');
				else
					$state.go('personalInfo');
			}
			else {
				$translate(['popup.user_info', 'popup.all_fields_req']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.user_info'],
						template: translate['popup.all_fields_req'],
						buttons: [{
							text: 'OK',
							type: 'button-search'
						}]
					});
				});
			}
		};

		//facebook login
		$scope.facebookLogin = function () {
			facebookConnectPlugin.getLoginStatus(
				function (response) {
					console.log(JSON.stringify(response));
					if (response.status === 'connected') {
						FBlogin();
					}
					else
						facebookConnectPlugin.login(['email, public_profile'],
													function (response) {
							if (response.status === 'connected') {
								console.log(response);
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
	});

})();

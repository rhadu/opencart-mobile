'use strict';
(function () {
	var app = angular.module('CartCtrl', ['ui.router']);

	app.controller('CartController', function (cart,$log, $scope, $ionicPopup, $state, $translate, ShopService, CartService, DeliveryInfoService) {
		console.log(cart);
		$scope.restaurantName = ShopService.restaurantName;
		$scope.categoryName = ShopService.categoryName;
		$scope.cartItems = cart.products;
		$scope.cart = cart;
		$scope.address = DeliveryInfoService.address;
		$scope.user = DeliveryInfoService.getUserInfo();
		$scope.deliveryFee = ShopService.info.deliveryFee;

		var user1 = {};
		user1.email = "radu.turtoi@gmail.com";
		user1.password = "radubrau";
		$scope.checkLogin = function(){
			$state.go('leftdrawer.userLogin')
			//			ShopService.userLogin(user1);
			ShopService.userAccount();
		}

		$scope.cartCheckout = function () {
//			ShopService.userLogout();
//			return
//
//			ShopService.userLogin(user1);
//			return

			var promise = ShopService.userAccount();
			promise.then(
				//if user is logged in go to checkout
				function(response) {
					console.log(response.data);
					$state.go("checkout")
				},
				//is user is not logged in rediret to login
				function(error) {
					console.log(error.data);
					$state.go("leftdrawer.userLogin")
				});
		}


		$scope.totalOrder = function () {
			return parseFloat(CartService.showTotal()) + parseFloat($scope.deliveryFee);
		};


	});
})();

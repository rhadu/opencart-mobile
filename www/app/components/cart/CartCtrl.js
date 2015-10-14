'use strict';
(function () {
	var app = angular.module('CartCtrl', ['ui.router']);
	app.directive('clickForOptions', ['$ionicGesture','$rootScope', function($ionicGesture, $rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('tap', function(e){
					if($rootScope.canEditCart === true){
						// Grab the content
						var content = element.parent().parent().parent().parent()[0].querySelector('.item-content');

						// Grab the buttons and their width
						var buttons = element.parent().parent().parent().parent()[0].querySelector('.item-options');

						if (!buttons) {
							console.log('There are no option buttons');
							return;
						}
						var buttonsWidth = buttons.offsetWidth;

						if($rootScope.buttonsOpened === false){
							ionic.requestAnimationFrame(function() {
								content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';
								if (!buttons.classList.contains('invisible')) {
									$rootScope.buttonsOpened = false;
									content.style[ionic.CSS.TRANSFORM] = '';
									setTimeout(function() {
										buttons.classList.add('invisible');
									}, 250);
								} else {
									console.log('obj');
									if($rootScope.buttonsOpened === false){
										console.log('asasaxs');
										buttons.classList.remove('invisible');
										content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
										$rootScope.buttonsOpened = true;
										$rootScope.optionButtons = buttons;
										$rootScope.optionContent = content;
									}
								}
							});
						}
					}
				}, element);

			}
		};
	}])

	app.directive('clickForOptionsWrapper', ['$ionicGesture','$rootScope', function($ionicGesture, $rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('tap', function(e){
					if($rootScope.canEditCart === true){
						if ($rootScope.buttonsOpened === true) {
							$rootScope.buttonsOpened = false;
							$rootScope.optionContent.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function() {
								$rootScope.optionButtons.classList.add('invisible');
							}, 250);
						}
					}
				}, element);
			}
		};
	}])

	app.controller('CartController', function (cart,$log,$rootScope, $localStorage, $timeout,$scope,$ionicListDelegate, $ionicPopup, $state, $translate, ShopService, CartService, AccountService, CheckoutService) {
		console.log(cart);
		$rootScope.buttonsOpened = false;
		$rootScope.canEditCart = false;

		$localStorage.paymentAddress = null;
		$localStorage.paymentMethod = null;
		$localStorage.shippingAddress = null;
		$localStorage.shippingMethod = null;

		$scope.restaurantName = ShopService.restaurantName;
		$scope.categoryName = ShopService.categoryName;
		$scope.cartItems = cart.products;
		$scope.cart = cart;
		$scope.deliveryFee = ShopService.info.deliveryFee;
		$scope.editStatus = "Edit";

		$scope.editCart = function () {
			if($rootScope.canEditCart === false) {
				$scope.editStatus = "OK";
				$timeout( function(){
					$rootScope.canEditCart = true;
				});
			}
			else{
				$scope.editStatus = "Edit";
				$rootScope.canEditCart = false;
				if ($rootScope.buttonsOpened === true) {
					$rootScope.buttonsOpened = false;
					$rootScope.optionContent.style[ionic.CSS.TRANSFORM] = '';
					setTimeout(function() {
						$rootScope.optionButtons.classList.add('invisible');
					}, 250);
				}
			}
		}
		$scope.checkLogin = function(){
			$state.go('leftdrawer.userLogin')
			//			ShopService.userLogin(user1);
			AccountService.userAccount();
		}

		$scope.cartCheckout = function () {

			var promise = AccountService.userAccount();
			promise.then(
				//if user is logged in go to checkout
				function(response) {
					console.log(response.data);
					$state.go("paymentAddress")
				},
				//is user is not logged in rediret to login
				function(error) {
					console.log(error.data);
					$state.go("leftdrawer.userLogin")
				});
		}

		$scope.editQuantity = function (type, item) {
			console.log(item);
			if(type === "add"){
				var promise = CartService.postProductQuantity((item.quantity + 1), item.key)
				}
			if(type === "subtract"){
				var promise = CartService.postProductQuantity((item.quantity - 1), item.key)
				}

			promise.then(
				//if user is logged in go to checkout
				function(response) {
					//					console.log(response.data.cart.products);
					$timeout( function(){
						$scope.cart = response.data.cart;
						$scope.cartItems = response.data.cart.products;
					});
				},
				//is user is not logged in rediret to login
				function(error) {
					console.log(error.data);
				});
		}

		$scope.deleteProduct = function (item) {
			console.log(item);
			var promise = CartService.deleteProductFromCart(item.key);
			promise.then(
				function (response) {
					$timeout( function(){
						$scope.cart = response.data.cart;
						$scope.cartItems = response.data.cart.products;
					});
				},
				function(error){

				})

		}


	});
})();

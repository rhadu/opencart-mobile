'use strict';
(function () {
	var app = angular.module('CategoriesCtrl', ['ui.router']);

	app.controller('CategoriesController', function ($scope, $timeout, $translate, $ionicPopup, $state, ShopService, CartService, $ImageCacheFactory, $rootScope) {
		$scope.$on('locationLoaded', function (event, loc) {
			$timeout(function () {
				ShopService.getRestaurants(loc, 'delivery');
			}, 0, false);
		});


		$scope.$on('restaurantLoaded', function () {
			$timeout(function () {
				ShopService.cacheImages();
				$scope.menuCategories = chunk(ShopService.menu, 2);
				//$scope.menuCategories = ShopService.menu;
				$scope.restaurantName = ShopService.restaurantName;
				console.log($scope.menuCategories);
				$scope.$apply();
			}, 0, false);
		});

		ShopService.cacheImages();

		$scope.menuCategories = chunk(ShopService.menu, 2);
		//$scope.menuCategories = ShopService.menu;
		$scope.restaurantName = ShopService.restaurantName;
		//$scope.badgeTest = 0;
		$scope.badgeTest = CartService.showTotal();


		/*
		 * function to chunk the menu categories in 2
		 */
		function chunk(arr, size) {
			var newArr = [];
			for (var i = 0; i < arr.length; i += size) {
				newArr.push(arr.slice(i, i + size));
			}
			return newArr;
		}


		//filter products by category
		$scope.selectCategory = function (categ) {
			ShopService.updateProducts(categ);
			ShopService.cacheImages();
		};

		//check if cart has products before returning to restaurants list
		$scope.backToRestaurants = function () {
			if (CartService.products.length > 0) {
				$translate(['popup.confirmation', 'popup.leave_restaurant',  'popup.add_prod']).then(function (translate) {
					$ionicPopup.confirm({
						title: translate['popup.confirmation'],
						template: translate['popup.leave_restaurant'],
						buttons: [{
							text: translate['popup.cancel'],
							type: 'button-default'
						}, {
							text: 'OK',
							type: 'button-search',
							onTap: function () {
								$state.go('leftdrawer.categories', {restaurantName: ShopService.restaurantName});
								CartService.products = [];
							}
						}]
					});
				});
			}
			else
				$state.go('leftdrawer.categories', {restaurantName: ShopService.restaurantName});
		};
	});
})();

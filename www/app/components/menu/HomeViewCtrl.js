'use strict';
(function () {
	var app = angular.module('Tapitoo.HomeViewController', ['ui.router']);
	//factory for cart operations
	app.controller('HomeViewController', function ($scope,$state,$ionicPopover, $rootScope, featuredProducts, $ionicSlideBoxDelegate, $ionicGesture, $timeout,  ShopService) {

		$scope.featuredProducts = featuredProducts;
		console.log($scope.featuredProducts);
		//ShopService.getManufacturers();

		$scope.getCategories = function () {
			ShopService.getAllCategories();

		}

		$scope.openPopover = function (id, $event) {
			$scope.productID = id;
			document.body.classList.remove('platform-ios');
			document.body.classList.remove('platform-android');
			document.body.classList.add('platform-android');
			$scope.popover.show($event);
		}

		$ionicPopover.fromTemplateUrl('./templates/productDropdown.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.popover = popover;
		});

		//ShopService.getCategoryProducts('20');
		//ShopService.getProduct('44');

		// function (search, tag, description, category_id, sub_category, sort, order, page, limit)
		//		ShopService.searchProducts('mac', 'laptop' , false, '20', false, 'price', 'ASC' );

		$scope.goToProduct = function(id, e) {
			console.log(e.target.localName);
			if(e.target.localName !== "i"){
				//console.log("go to product with id:" + id);
				$state.go("leftdrawer.productInfo", {productId: id})
			}
		}

		$scope.getSpecial = function () {
			ShopService.getSpecialOffers();
			$state.go("leftdrawer.products")
		}

		$scope.addToCart = function () {
			$scope.popover.hide();
			$state.go("leftdrawer.productInfo", {productId: $scope.productID});
		}

		$scope.addToWishlist = function () {
			//ShopService.getWishlist();
			$state.go("wishlist")
			$scope.popover.hide();
//			ShopService.addProductToWishlist($scope.productID);
		}
	})

})();



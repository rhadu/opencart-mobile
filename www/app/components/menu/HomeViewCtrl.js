'use strict';
(function () {
	var app = angular.module('Tapitoo.HomeViewController', ['ui.router']);
	//factory for cart operations
	app.controller('HomeViewController', function ($scope,$state,$localStorage,$ionicPopover, GeocoderService, banner, $rootScope, featuredProducts, $ionicSlideBoxDelegate, $ionicGesture, CommonService,$timeout,  ShopService, ProductService, AccountService, CartService) {

		$scope.featuredProducts = featuredProducts.products;
		console.log(featuredProducts);
		$scope.slides = banner.data.banners;


		$scope.getCategories = function () {
			ProductService.getAllCategories();
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


		$scope.goToProduct = function(id, e) {
			console.log(e.target.localName);
			if(e.target.localName !== "i"){
//				var promise = ProductService.getProduct(id);
//				promise.then(
//					function(product) {
////						console.log(product);
////						if(product.options.length === 0){
////							CartService.addProductToCart(product.data);
////						}
////						else{
////							$state.go("leftdrawer.productInfo", {productId: id})
////						}
						$state.go("leftdrawer.productInfo", {productId: id})
//
//					},
//					function(error) {
//						console.log(error.data);
//					});
			}
		}

		$scope.getSpecial = function () {
//			$localStorage.$reset();
//			console.log($rootScope.account);
//			return;
//			AccountService.getWishlist();
//			return;

//			var wishlist = [40,41,46,44,43,29,33]
//			console.log(wishlist);
//			for(var i=0; i<wishlist.length; i++){
//				console.log(wishlist[i]);
//				AccountService.deleteProductFromWishlist(wishlist[i])
//			}
//			return;
			ProductService.getSpecialOffers();
			$state.go('leftdrawer.products');
		}

		$scope.addToCart = function () {
			$scope.popover.hide();
			var promise = ProductService.getProduct($scope.productID);
			promise.then(
				function(product) {
					console.log(product);
					if(product.options.length === 0){
						CartService.addProductToCart(product);
					}
					else{
						$state.go("leftdrawer.productInfo", {productId: $scope.productID})
					}
				},
				function(error) {
					console.log(error.data);
				});
		}

		$scope.addToWishlist = function () {
			//AccountService.getWishlist();
			AccountService.addProductToWishlist($scope.productID);
			$scope.popover.hide();
		}

		$scope.goToBannerLink = function (slide) {
			console.log(slide.link);
			var str = slide.link
			if(str.indexOf("product_id=")>1){
				var prodID = str.substring(str.indexOf("product_id=")+11)
				$state.go("leftdrawer.productInfo", {productId: prodID})
			}

			if(str.indexOf("category&path=")>1){
				var categID = str.substring(str.indexOf("category&path=")+14);
				if(categID.indexOf("_")>1){
					categID = categID.split('_').pop().trim();
				}
				ProductService.getCategoryProducts(categID);
				$state.go("leftdrawer.products")
			}
		}
	})

})();



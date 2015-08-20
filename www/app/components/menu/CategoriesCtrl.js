'use strict';
(function () {
	var app = angular.module('CategoriesCtrl', ['ui.router']);

	app.controller('CategoriesController', function (categories, $scope, $timeout, $translate, $ionicPopup, $state, ShopService, CartService, $ImageCacheFactory, $rootScope) {
		$scope.categories = categories;
		console.log($scope.categories);
		$scope.subCategories = ShopService.subCategories;

		$scope.getCategory1 = function (categ) {
			ShopService.categProducts.products = [];
			if(categ.categories.length>0){
				ShopService.subCategories = [];
				for(var i=0 ; i<categ.categories.length; i++){
					console.log(categ.categories[i]);
					ShopService.subCategories.push(categ.categories[i])
				}
				console.log($scope.subCategories);
				$state.go("leftdrawer.subCategories")
			}
			else {
				ShopService.getCategoryProducts(categ.category_id);
				$state.go("leftdrawer.products")
			}
		}

		$scope.getCategory = function (categ) {
			console.log(categ);

			if(categ.categories){
				if(categ.categories.length>0){
					console.log('subcateg');
					ShopService.getSubcategories(categ.category_id);
					ShopService.getCategoryProducts(categ.category_id);
					$state.go("leftdrawer.subCategories")
				}
				else{
					console.log('no subcateg');
					ShopService.getCategoryProducts(categ.category_id);
					$state.go("leftdrawer.products")
				}
			}
			else{
				ShopService.getCategoryProducts(categ.category_id);
				$state.go("leftdrawer.products")
			}
		}

		$scope.getProducts = function () {
			ShopService.getCategoryProducts(ShopService.categoryID);
			$state.go("leftdrawer.products")
		}

	});
})();

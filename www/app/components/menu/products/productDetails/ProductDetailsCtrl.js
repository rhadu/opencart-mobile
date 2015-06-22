'use strict';
(function () {
	var app = angular.module('ProductsDetailsCtrl', ['ui.router']);

	app.controller('ProductDetailsController', function ($scope,product, $ionicModal,$timeout, $state, ShopService, CartService, $ionicSlideBoxDelegate, $ionicGesture) {
		//$scope.restaurantName = ShopService.restaurantName;
		//$scope.menuProducts = ShopService.products;
		//$scope.productInfo = ShopService.productInfo;

		$scope.productDetails = product;

		//$scope.productTotal = CartService.productPrice($scope.productInfo);
		//$scope.url = ShopService.url;
		//$scope.badgeTest = CartService.showTotal();
		//$scope.addedToCart = true;

		$scope.rating = Math.round($scope.productDetails.rating);
		console.log($scope.rating);
		$scope.isReadonly = true;
		$scope.rateFunction = function(rating) {
			console.log("Rating selected: " + rating);
		};

		$scope.openOptionModal = function (option) {
			console.log(option);
			$scope.optionList = option;
			$scope.modal.show()

		}

		$ionicModal.fromTemplateUrl('templates/modal-option-radio.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.modal = modal
		})

		$scope.openModal = function() {
			$scope.modal.show()
		}

		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});


		$scope.selected = {};
		$scope.addModifier = function (modif, item) {
			$scope.productTotal = 0;
			if (modif.type === 'single') {
				angular.forEach(modif.modifierElement, function (item) {
					item.checked = false;
				});
				item.checked = true;
			}
			if (modif.type === 'multiple') {
				if (item.checked === true)
					item.checked = false;
				else
					item.checked = true;
			}

			$scope.productTotal = CartService.productPrice($scope.productInfo);
		};

		//add product to cart
		$scope.addToCart = function (item) {
			$scope.addedToCart = false;
			$timeout(function () {
				$scope.addedToCart = true;
			}, 700);
			item.quantity = CartService.incrementItem(item);
			CartService.addToOrder(item);
			$scope.badgeTest = CartService.showTotal();
			$state.go("products", {restaurantName: $scope.restaurantName, categoryId:item.categoryId})
		};

		var element;
		$scope.photoSlideDelegate = function () {
			var tabSlides = $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox');
			var photoSlides = $ionicSlideBoxDelegate.$getByHandle('productSlideBox');
			console.log(photoSlides.slidesCount());
			console.log(photoSlides.currentIndex());
			$ionicGesture.on('dragleft', function (event) {
				if(photoSlides.currentIndex() === photoSlides.slidesCount()-1){
					tabSlides.slide(1);
				}
			}, element);
		}

		//get photo slider element
		$timeout( function(){
			element = angular.element(document.querySelector('#producPhotoSlideBox'))
			$ionicSlideBoxDelegate.$getByHandle('productSlideBoxOne').enableSlide(false);
		},5);

		//disable tab slide box when user slides photos
		$timeout( function(){
			$ionicGesture.on('touch', function (event) {
				$scope.$apply(function () {
					$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
				});
			}, element);
		}, 10);

		//enable tab slide box
		$timeout( function(){
			$ionicGesture.on('release', function (event) {
				$scope.$apply(function () {
					$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(true);
				});
			}, element);
		}, 10);

	});
})();

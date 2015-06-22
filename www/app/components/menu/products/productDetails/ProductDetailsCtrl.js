'use strict';
(function () {
	var app = angular.module('ProductsDetailsCtrl', ['ui.router']);

	app.controller('ProductDetailsController', function ($scope,product, $ionicModal,$timeout, $state, ShopService, CartService, $ionicSlideBoxDelegate, $ionicGesture) {
		//$scope.restaurantName = ShopService.restaurantName;
		//$scope.menuProducts = ShopService.products;
		//$scope.productInfo = ShopService.productInfo;
		console.log("init slider");
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

		$scope.goToProduct = function(id) {
			$state.go("leftdrawer.productInfo", {productId: id})
		}


		$scope.dragLastSlide = function () {
			var tabSlides = $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox');
			var photoSlides = $ionicSlideBoxDelegate.$getByHandle('productSlideBox');
			console.log(photoSlides.currentIndex());
			console.log(photoSlides.slidesCount());
			if(photoSlides.currentIndex() === photoSlides.slidesCount()-1){
				tabSlides.slide(1);
			}
		}

		$scope.goNextTabSlide = function () {
			var tabSlides = $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox');
			tabSlides.slide(1);
		}

		//get photo slider element
		$timeout( function(){
			$ionicSlideBoxDelegate.$getByHandle('productSlideBoxOne').enableSlide(false);
		},5);

		//disable tab slide box when user slides photos



		//enable tab slide box


		$scope.disableTabSlide = function () {
			console.log("on touch");
				$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
		}

		$scope.enableTabSlide = function () {
				$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(true);
		}

	});
})();

'use strict';
(function () {
	var app = angular.module('ProductsDetailsCtrl', ['ui.router']);

	app.controller('ProductDetailsController', function ($scope, product, $ionicHistory, $ionicModal,$timeout, $state, ShopService, CartService, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture) {
		//$scope.restaurantName = ShopService.restaurantName;
		//$scope.menuProducts = ShopService.products;
		//$scope.productInfo = ShopService.productInfo;
		//console.log("init slider");
		$scope.productDetails = product;
		$ionicSlideBoxDelegate.update();
		$ionicScrollDelegate.resize();
		//$scope.productTotal = CartService.productPrice($scope.productInfo);
		//$scope.url = ShopService.url;
		//$scope.badgeTest = CartService.showTotal();
		//$scope.addedToCart = true;

		$scope.rating = Math.round($scope.productDetails.rating);
		//console.log($scope.rating);
		$scope.isReadonly = true;
		$scope.rateFunction = function(rating) {
			console.log("Rating selected: " + rating);
		};

		$scope.goBack = function() {
			$ionicHistory.goBack();
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
			//			console.log(modif);
			//			console.log(item);
			$scope.productTotal = 0;
			if (modif.type === 'radio' || modif.type === 'select') {
				angular.forEach(modif.modifierElement, function (item) {
					item.checked = false;
				});
				item.checked = true;
				modif.selectedOption = item;
			}
			if (modif.type === 'checkbox') {
				if(!modif.selectedOption)
					modif.selectedOption = [];
				if (item.checked === true){
					item.checked = false;
					for(var i = modif.selectedOption.length - 1; i >= 0; i--) {
						if(modif.selectedOption[i] === item) {
							modif.selectedOption.splice(i, 1);
						}
					}
				}
				else{
					item.checked = true;
					modif.selectedOption.push(item);
				}
			}
		};

		//add product to cart
		$scope.addToCart = function (item) {
			ShopService.addProductToCart(item);
		//	ShopService.getCart();
		};

		$scope.deleteFromCart = function () {
			ShopService.deleteProductFromCart();
		}

		$scope.goToProduct = function(id) {
			$state.go("leftdrawer.productInfo", {productId: id})
		}

		//get photo slider element
		$timeout( function(){
			$ionicSlideBoxDelegate.$getByHandle('productSlideBoxOne').enableSlide(false);
		},5);

		// check if photo in product photos slides is last and go to next slide
		$scope.dragLastSlide = function () {
			var tabSlides = $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox');
			var photoSlides = $ionicSlideBoxDelegate.$getByHandle('productSlideBox');
			if(photoSlides.currentIndex() === photoSlides.slidesCount()-1){
				tabSlides.slide(1);
			}
		}

		//go to next slide
		$scope.goNextTabSlide = function () {
			var tabSlides = $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox');
			tabSlides.slide(1);
		}

		//disable tab slide box when user slides photos
		$scope.disableTabSlide = function () {
			$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
		}


		$scope.disableProductScoller = function () {
			if($scope.productDetails.related_products.length * 130 > window.innerWidth){
				$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
			}
		}

		//enable tab slide box
		$scope.enableTabSlide = function () {
			$ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(true);
		}

		//change position of Cart Button
		$scope.getCurrentPosition = function () {
			var cartButton = document.getElementById('cartButton');
			var scrollPosition = $ionicScrollDelegate.$getByHandle('slide1Scroll').getScrollPosition().top;
			var bottomPosition = window.innerHeight - 412;
			if($ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').currentIndex()===0){

				if(scrollPosition <254){
					move(cartButton)
						.ease('in-out')
						.y(-scrollPosition)
						.duration('0s')
						.end();
				}

				if(scrollPosition > 254){
					move(cartButton)
						.ease('in-out')
						.y(bottomPosition)
						.duration('0.5s')
						.end();
				}
			}
		}
	});
})();

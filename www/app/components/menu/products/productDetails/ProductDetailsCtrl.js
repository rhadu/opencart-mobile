'use strict';
(function () {
	var app = angular.module('ProductsDetailsCtrl', ['ui.router']);

	app.controller('ProductDetailsController', function ($scope, $ionicPopover, product,$translate,$ionicPopup, AccountService, reviews, $ionicHistory, $ionicModal,$timeout, $state, ShopService,ProductService, CartService, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture) {


		$scope.openPopover = function (id, $event) {
			$scope.productID = id;
			document.body.classList.remove('platform-ios');
			document.body.classList.remove('platform-android');
			document.body.classList.add('platform-android');
			$scope.popover.show($event);
		}

		$ionicPopover.fromTemplateUrl('./templates/productAddWishlist.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.popover = popover;
		});

		$scope.addToWishlist = function (id) {
			console.log(id);
			//AccountService.getWishlist();
			AccountService.addProductToWishlist(id);
//			$scope.popover.hide();
		}

		// Init product details and reviews
		$scope.productDetails = product;
		$scope.reviews = reviews;

		$scope.maxRatingValue = 0;
		$scope.initRating = 0;
		$scope.stars = [
			{rating: 1, value: 0},
			{rating: 2, value: 0},
			{rating: 3, value: 0},
			{rating: 4, value: 0},
			{rating: 5, value: 0},
		];

		// init reviews tab
		if(reviews){
			for(var i=0; i<reviews.length; i++){
				for(var j=0; j<$scope.stars.length; j++){
					if(parseInt(reviews[i].rating) === $scope.stars[j].rating){
						$scope.stars[j].value++;
						if($scope.maxRatingValue < $scope.stars[j].value)
							$scope.maxRatingValue = $scope.stars[j].value;
					}
				}
			}
			console.log($scope.maxRatingValue);
		}

		//open review modal
		$scope.openReviewModal = function () {
			console.log($scope.productDetails.product_id);
			$scope.reviewModal.show();
		}

		$scope.closeReviewModal = function () {
			$scope.reviewModal.hide();
		}

		$scope.sendReview = function (review) {
			console.log(review);

			if(!review || !review.name || !review.text || !review.rating){
				$ionicPopup.alert({
					title: 	"Sorry",			//translate['popup.info'],
					template: "Your review is incomplete",		//translate['popup.not_in_delivery_zone'],
					buttons: [{
						text: 'OK',
						type: 'button-calm'
					}]
				});
				return false;
			}

			if(review.text.length<25 || review.text.length>1000){
				$ionicPopup.alert({
					title: 	"Sorry",			//translate['popup.info'],
					template: "Review Text must be between 25 and 1000 characters",		//translate['popup.not_in_delivery_zone'],
					buttons: [{
						text: 'OK',
						type: 'button-calm'
					}]
				});
				return false;
			}

			var promise = ProductService.postReview(review, $scope.productDetails.product_id);
			promise.then(
				//if user is logged in go to checkout
				function(response) {
					console.log(response.data);
					$scope.reviewModal.hide();
				},
				//is user is not logged in rediret to login
				function(error) {
					console.log(error.data);
					//					$state.go("leftdrawer.userLogin")
				});

		}

		$ionicSlideBoxDelegate.update();
		$ionicScrollDelegate.resize();


		$scope.productRating = Math.round($scope.productDetails.rating);

		$scope.rateFunction = function(rating) {
			console.log("Rating selected: " + rating);
		};

		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		$scope.datepickerObject = {};
		$scope.datepickerObject.inputDate = new Date();

		$scope.datepickerObject = {
			titleLabel: 'Date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: 'Close',  //Optional
			setLabel: 'Set',  //Optional
			setButtonType : 'button-light button-custom',  //Optional
			todayButtonType : 'button-light button-custom',  //Optional
			closeButtonType : 'button-stable ',  //Optional
			inputDate: $scope.datepickerObject.inputDate,    //Optional
			mondayFirst: true,    //Optional
			//			disabledDates: disabledDates, //Optional
			//			weekDaysList: weekDaysList,   //Optional
			//			monthList: monthList, //Optional
			templateType: 'popup', //Optional
			from: new Date(),   //Optional
			to: new Date(2018, 8, 25),    //Optional
			callback: function (val) {    //Mandatory
				datePickerCallback(val);
			}
		};

		var datePickerCallback = function (val) {
			if (typeof(val) === 'undefined') {
				console.log('No date selected');
			} else {
				if($scope.selectedOption.type === "date"){
					for(var i=0; i<$scope.productDetails.options.length; i++){
						if ($scope.productDetails.options[i].product_option_id === $scope.selectedOption.product_option_id){
							var year = val.getFullYear();
							var month = (val.getMonth() + 1);
							var day = val.getDate();
							if(month<10){
								month = "0"+month;
							}
							$scope.productDetails.options[i].value = year + "-" + month + "-" + day;// val.toLocaleDateString("en-US");
						}
					}
				}
				if($scope.selectedOption.type === "datetime"){

				}
			}
		};

		$scope.timePickerObject = {
			inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
			step: 15,  //Optional
			format: 12,  //Optional
			titleLabel: 'Time',  //Optional
			setLabel: 'Set',  //Optional
			closeLabel: 'Close',  //Optional
			setButtonType: 'button-light button-custom',  //Optional
			closeButtonType: 'button-stable ',  //Optional
			callback: function (val) {    //Mandatory
				timePickerCallback(val);
			}
		};

		function timePickerCallback(val) {
			if (typeof (val) === 'undefined') {
				console.log('Time not selected');
			} else {
				var selectedTime = new Date(val * 1000);
				if($scope.selectedOption.type === "time"){
					for(var i=0; i<$scope.productDetails.options.length; i++){
						if ($scope.productDetails.options[i].product_option_id === $scope.selectedOption.product_option_id){
							var hours = selectedTime.getUTCHours();
							var minutes = selectedTime.getUTCMinutes();
							if (minutes === 0){
								minutes = "00";
							}
							$scope.productDetails.options[i].value = hours + ':' + minutes
						}
					}
				}
			}
		}

		$scope.openOptionModal = function (option) {
			console.log(option);
			if(option.type === "radio" || option.type === "select" || option.type === "checkbox"){
				$scope.optionList = option;
				$scope.modalModifier.show()
			}
			if(option.type === "date" || option.type === "time"){
				$scope.selectedOption = option;
			}
			if(option.type === "text" || option.type === "textarea"){
				$scope.selectedOption = option;
				$scope.textModifierModal.show();
			}
		}



		$ionicModal.fromTemplateUrl('templates/modal-option-radio.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.modalModifier = modal;
		})

		$ionicModal.fromTemplateUrl('templates/modal-add-review.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.reviewModal = modal;
		})

		$ionicModal.fromTemplateUrl('templates/modal-text-modifier.html', {
			scope: $scope,
			animation: 'modal-fade'
		}).then(function(modal) {
			$scope.textModifierModal = modal;
		})

		$scope.closeModal = function() {
			$scope.modalModifier.hide();
			$scope.textModifierModal.hide();
		};

		$scope.$on('$destroy', function() {
			$scope.modalModifier.remove();
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
						console.log(item);
						for(var i=0; i<item.options.length ;i++ ){
							if(item.options[i].type === "date")
								console.log(item.options[i]);
						}

						for(var i=0; i<item.options.length ;i++ ){
							if(item.options[i].required === true){
								var modifiers = item.options[i].product_option_value;
								var selectedModifier = false;
								if(item.options[i].type === "radio" || item.options[i].type === "select" || item.options[i].type === "checkbox"){
									for(var j=0; j<modifiers.length; j++){
										if(modifiers[j].checked === true){
											selectedModifier = true;
										}
									}
								}
								if(item.options[i].type === "file"){
									selectedModifier = true;
								}
								else{
									if (item.options[i].value !== '') {
										selectedModifier = true;
									}
								}


								if(selectedModifier === false){
									//						$translate(['popup.info', 'popup.not_in_delivery_zone']).then(function (translate) {
									$ionicPopup.alert({
										title: 	item.title,			//translate['popup.info'],
										template: item.options[i].name + " is required",		//translate['popup.not_in_delivery_zone'],
										buttons: [{
											text: 'OK',
											type: 'button-calm'
										}]
									});
									return false;
									//						});
								}
							}
						}
			console.log("good to add to cart");
			CartService.addProductToCart(item);
		};

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

		//disable bounce effect on tab slides
//		$scope.myActiveSlide = 0;
//
//		$scope.$watch(function(scope) { return scope.myActiveSlide },
//					  function(newValue, oldValue) {
//			console.log("newValue: " + newValue);
//			console.log("oldValue: " + oldValue);
//			switch(newValue) {
//				case 0:		 $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
//				case 3:      $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(false);
//				break;
//			}
//		}
//					 );
//
//		$scope.enableSlide = function() {   $ionicSlideBoxDelegate.$getByHandle('subHeaderSlideBox').enableSlide(true);
//										}

	});
})();

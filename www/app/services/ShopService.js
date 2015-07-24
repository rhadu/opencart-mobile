'use strict';
(function () {
	var app = angular.module('Tapitoo.ShopService', ['ui.router']);

	//factory for HTTP requests
	app.factory('ShopService', function (TAPITOO_CONFIG, OC_CONFIG, $http, $rootScope, $ionicLoading, $ionicPopup, $translate, $state, $cordovaGeolocation, DeliveryInfoService, CartService, push, $ImageCacheFactory) {
		var service = {};
		//var baseUrl = 'http://nodejs-geek12.rhcloud.com';
		// server Url
		var baseUrl = TAPITOO_CONFIG.backend;
		var _restaurantID = TAPITOO_CONFIG.restaurantID;

		var _locationID = '';
		var _finalUrl = '';
		var androidID = 0;
		var iosID = 0;
		var order = new Object;
		service.loc = [];
		service.url = baseUrl;
		service.restaurants = [];
		service.restaurantName = '';
		service.categoryName = '';
		service.menu = [];
		service.info = [];
		service.products = [];
		service.productInfo = [];
		service.productTotal = 0;
		service.url = baseUrl;
		service.subCategories = [];
		service.categProducts = [];
		service.allProducts = [];

		service.modifiers = [{"id": "1", "name": " Marime", "type": "single", "validation": "required", "modifierElement": [{"id": "2", "isActuallyProduct": "false", "name": "mica (25cm)", "price": "15"}, {"id": " 3", "isActuallyProduct": "false", "name": "medie (30cm)", "price": "20"}, {"id": "4", "isActuallyProduct": "false", "name": "mare (40cm)", "price": "30"}]}, {"id": "5", "name": " Blat", "type": "single", "validation": "required", "modifierElement": [{"id": "1", "isActuallyProduct": "false", "name": " traditional", "price": "0"}, {"id": " 2", "isActuallyProduct": "false", "name": "italian", "price": "0"}]}, {"id": "1", "name": " Sos pe blat", "type": "single", "validation": "optional", "modifierElement": [{"id": "2", "isActuallyProduct": "true", "name": "pizza", "price": "2 "}, {"id": " 3", "isActuallyProduct": "true", "name": "bbq dulce", "price": "2"}, {"id": "4", "isActuallyProduct": "true", "name": "bbq iute", "price": "2"}, {"id": "4", "isActuallyProduct": "true", "name": "salsa", "price": "2"}]}, {"id": "1", "name": " Ingrediente", "type": "multiple", "validation": "optional", "modifierElement": [{"id": "2", "isActuallyProduct": "false", "name": "Ciuperci", "price": "1.5"}, {"id": " 3", "isActuallyProduct": "false", "name": "Ardei", "price": "1.5"}, {"id": "4", "isActuallyProduct": "false", "name": "rosii", "price": "1.5"}, {"id": "4", "isActuallyProduct": "false", "name": "porumb", "price": "1.5"}, {"id": "4", "isActuallyProduct": "false", "name": "sunca", "price": "2"}, {"id": "4", "isActuallyProduct": "false", "name": "pui", "price": "2"}, {"id": "4", "isActuallyProduct": "false", "name": "vita", "price": "2"}, {"id": "4", "isActuallyProduct": "false", "name": "porc", "price": "2"}]}, {"id": "1", "name": " Instructiuni speciale", "type": "single", "validation": "optional", "modifierElement": [{"id": "2", "isActuallyProduct": "false", "name": "mai bine coapta", "price": "0"}, {"id": " 3", "isActuallyProduct": "false", "name": "mai putin coapta", "price": "0"}]}];
		service.testProducts = [{"product_id":42,"name":"Apple Cinema 30\" bla ultra hd many cats, workings bla sla bnak safala asjfas asfjas asfjasa asja","description":"\r\n\tThe 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed sp..","price":"$122.00","special":"$110.00","tax":"$90.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/apple_cinema_30-228x228.jpg"},{"product_id":30,"name":"Canon EOS 5D","description":"\r\n\tCanon's press material for the EOS 5D states that it 'defines (a) new D-SLR category', while we'r..","price":"$122.00","special":"$98.00","tax":"$80.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/canon_eos_5d_1-228x228.jpg"},{"product_id":47,"name":"HP LP3065","description":"\r\n\tStop your co-workers in their tracks with the stunning new 30-inch diagonal HP LP3065 Flat Panel ..","price":"$122.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/hp_1-228x228.jpg"},{"product_id":28,"name":"HTC Touch HD","description":"\r\n\tHTC Touch - in High Definition. Watch music videos and streaming content in awe-inspiring high de..","price":"$122.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/htc_touch_hd_1-228x228.jpg"},{"product_id":40,"name":"iPhone 5s, 32GB, Silver","description":"\r\n\tiPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a nam..","price":"$123.20","special":null,"tax":"$101.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/iphone_1-228x228.jpg"},{"product_id":48,"name":"iPod Classic","description":"\r\n\t\r\n\t\t\r\n\t\t\tMore room to move.\r\n\t\t\r\n\t\t\tWith 80GB or 160GB of storage and up to 40 hours of battery l..","price":"$122.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/ipod_classic_1-228x228.jpg"},{"product_id":43,"name":"MacBook","description":"\r\n\t\r\n\t\tIntel Core 2 Duo processor\r\n\t\r\n\t\tPowered by an Intel Core 2 Duo processor at speeds up to 2.1..","price":"$602.00","special":null,"tax":"$500.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/macbook_1-228x228.jpg"},{"product_id":44,"name":"MacBook Air","description":"\r\n\tMacBook Air is ultrathin, ultraportable, and ultra unlike anything else. But you don’t lose..","price":"$1,202.00","special":null,"tax":"$1,000.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/macbook_air_1-228x228.jpg"},{"product_id":29,"name":"Palm Treo Pro","description":"\r\n\tRedefine your workday with the Palm Treo Pro smartphone. Perfectly balanced, you can respond to b..","price":"$337.99","special":null,"tax":"$279.99","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/palm_treo_pro_1-228x228.jpg"},{"product_id":35,"name":"Product 8","description":"\r\n\tProduct 8\r\n..","price":"$122.00","special":null,"tax":"$100.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/placeholder-228x228.png"},{"product_id":33,"name":"Samsung SyncMaster 941BW","description":"\r\n\tImagine the advantages of going big without slowing down. The big 19\" 941BW monitor combines..","price":"$242.00","special":null,"tax":"$200.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/samsung_syncmaster_941bw-228x228.jpg"},{"product_id":46,"name":"Sony VAIO","description":"\r\n\tUnprecedented power. The next generation of processing technology has arrived. Built into the new..","price":"$1,202.00","special":null,"tax":"$1,000.00","rating":0,"thumb_image":"http://apitoo.gungoos.com/opencart-2.0.0.0/upload/image/cache/catalog/demo/sony_vaio_1-228x228.jpg"}];

		service.getAllCategories = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CATEGORIES,
				method: "GET",
				withCredentials: true,
				headers: {'Authorization': '8PaRv1SKlKZYxOTzbM0b3UZ9uRC6vUut7FZFNJPD'}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log('toate categoriile');
				console.log(response.data.categories);
				return response.data.categories;
			});
			return promise;
		};

		service.getAllProducts = function (categArray) {
			service.allProducts = [];
			for (var i=0 ; i< categArray.length ; i++){
				var category = service.getCategoryProducts(categArray[i].category_id)
				service.allProducts.push(category);
			}
			console.log(service.allProducts);
		}

		service.getCategoryProducts = function (id) {
			service.categProducts = [];
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CATEGORIES + id,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log(response.data.category);
				service.categProducts = response.data.category.products;
				$rootScope.$broadcast('productsLoaded');
				return response.data.category;
			});
			return promise;
		};

		service.getProduct = function (id) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.PRODUCT + id,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log('produs: ' +response.data.product.title);
				console.log(response.data.product);
				return response.data.product;
			});
			return promise;
		};

		service.getProductReviews = function (id) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.REVIEWS + id +'/review',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log('reviews');
				console.log(response.data);
				return response.data;
			});
			return promise;
		};

		service.getSpecialOffers = function () {
			service.categProducts = [];
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.SPECIAL,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log(response.data);
				service.categProducts = response.data.products;
				$rootScope.$broadcast('productsLoaded');
				$ionicLoading.hide();
				return response.data;
			});
			return promise;
		};

		service.getManufacturers = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.MANUFACTURER,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log(response.data.manufacturers);
				return response.data.manufacturers;
			});
			return promise;
		}

		service.getManufacturersProducts = function (id) {
			service.categProducts = [];
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.MANUFACTURER +id,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				service.categProducts = response.data.manufacturer.products;
				$rootScope.$broadcast('productsLoaded');
				console.log(response.data.manufacturer);
				return response.data.manufacturer;
			});
			return promise;
		}

		service.addProductToCart = function (prod) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var postArray = [];
			postArray.push({"product_id" : prod.product_id});
			postArray.push({"quantity" : "1"});
			for (var i=0 ; i<prod.options.length ; i++) {
				for(var j=0 ; j<prod.options[i].product_option_value.length; j++) {
					var option = prod.options[i].product_option_value[j];
					if (option.checked === true){
						var property = {};
						var propertyName = "option["+prod.options[i].product_option_id+"]";
						var propertyValue = prod.options[i].product_option_value[j].product_option_value_id;
						if(prod.options[i].type === "checkbox") {
							propertyName += "[]"
						}
						property[propertyName] = propertyValue;
						postArray.push(property);
					}
				}
			}
			console.log(postArray);

			$http({
				method: "post",
				url: OC_CONFIG.CART,
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						var myobj = Object.keys(obj[p])
						console.log(myobj);
						console.log(obj[p][myobj]);
						str.push((myobj) + "=" + encodeURIComponent(obj[p][myobj]));
						console.log(str);
					}
					return str.join("&");
				},
				data: postArray
			}).
			success(function (data, status, headers, config) {
				$ionicLoading.hide();
				console.log(data.cart.products);
			}).
			error(function (data, status, headers, config) {
				console.log(data.error);
				$ionicLoading.hide();
			});
		}

		service.deleteProductFromCart = function (id) {
			//console.log(key);
			var key = "YToxOntzOjEwOiJwcm9kdWN0X2lkIjtpOjQ2O30=";
			var promise = $http({
				url: OC_CONFIG.CART + key,
				method: "DELETE",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log("Delete from cart");
				console.log(response.data);
				return response.data;
			});
			return promise;
		}

		service.getCart = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.GET_CART,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log("cart");
				console.log(response.data.cart);
				return response.data.cart;
			});
			return promise;
		}


		// Checkout Step 1
		service.postPaymentAddress = function (address) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});

			var postArray = [];
			if(address.existing === true){
				postArray.push({"payment_address" : "existing"});
				postArray.push({"address_id" : address.address_id});
			}
			else{
				postArray.push({"payment_address" : "new"});
				postArray.push({"firstname" : address.firstname});
				postArray.push({"lastname" : address.lastname});
				postArray.push({"address_1" : address.address});
				postArray.push({"city" : address.city});
				postArray.push({"postcode":address.postcode});
				postArray.push({"country_id" : address.country_id});
				postArray.push({"zone_id" : address.zone_id});
			}

			var promise = $http({
				method: "post",
				url: OC_CONFIG.CHECKOUT + 'payment_address',
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						var myobj = Object.keys(obj[p])
						console.log(myobj);
						console.log(obj[p][myobj]);
						str.push((myobj) + "=" + encodeURIComponent(obj[p][myobj]));
						console.log(str);
					}
					return str.join("&");
				},
				data: postArray
			}).
			success(function (data, status, headers, config) {
				$ionicLoading.hide();
				console.log(data);
			}).
			error(function (data, status, headers, config) {
				console.log(data.error);
				$ionicLoading.hide();
			});

			return promise;
		}


		// Checkout Step 2
		service.postShippingAddress = function (address) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});

			var postArray = [];
			if(address.existing === true){
				postArray.push({"shipping_address" : "existing"});
				postArray.push({"address_id" : address.address_id});
			}
			else{
				postArray.push({"payment_address" : "new"});
				postArray.push({"firstname" : address.firstname});
				postArray.push({"lastname" : address.lastname});
				postArray.push({"address_1" : address.address});
				postArray.push({"city" : address.city});
				postArray.push({"postcode":address.postcode});
				postArray.push({"country_id" : address.country_id});
				postArray.push({"zone_id" : address.zone_id});
			}

			service.currentAddress = address;

			var promise = $http({
				method: "post",
				url: OC_CONFIG.CHECKOUT + 'shipping_address',
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						var myobj = Object.keys(obj[p])
						str.push((myobj) + "=" + encodeURIComponent(obj[p][myobj]));
						console.log(str);
					}
					return str.join("&");
				},
				data: postArray
			}).
			success(function (data, status, headers, config) {
				$ionicLoading.hide();
				console.log(data);
			}).
			error(function (data, status, headers, config) {
				console.log(data.error);
				$ionicLoading.hide();
			});

			return promise;
		}

		// Checkout Step 3
		service.getShippingMethod = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'shipping_method',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log(response.data);
				return response.data;
			});
			return promise;
		}

		// Checkout Step 4
		service.postShippingMethod = function (order) {
			var checkout = [];

			checkout.push({"shipping_method" : order.code});
//			checkout.push({"comment" : "doorbell doesn't work"});
			var promise = $http({
				method: "post",
				url: OC_CONFIG.CHECKOUT + 'shipping_method',
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						var myobj = Object.keys(obj[p])
						str.push((myobj) + "=" + encodeURIComponent(obj[p][myobj]));
						console.log(str);
					}
					return str.join("&");
				},
				data: checkout
			}).
			success(function (data, status, headers, config) {
				$ionicLoading.hide();
				console.log(data);
			}).
			error(function (data, status, headers, config) {
				console.log(data.error);
				$ionicLoading.hide();
			});
			return promise;
		}



		// Checkout Step 5
		service.getPaymentMethod = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'payment_method',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log(response.data.payment_methods);
				return response.data.payment_methods;
			});
			return promise;
		}

		// Checkout Step 6
		service.postPaymentMethod = function (payment) {
			var checkout = {};
			checkout.payment_method = payment.code;
			if(payment.agree){
				checkout.agree = payment.agree;
			}
			if(payment.comment){
				checkout.comment = payment.comment;
			}

			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'payment_method',
				method: "POST",
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						console.log(str);
					}
					return str.join("&");
				},
				data: checkout
			})
			.then(function (response) {
				console.log(response.data);
				return response.data;
			});
			return promise;
		}

		// Checkout Step 7
		service.getCheckoutConfirm = function () {
			//$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'confirm',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				//$ionicLoading.hide();
				console.log(response.data);
				return response.data;
			});
			return promise;
		}

		// Checkout Step 8
		service.getCheckoutPay = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'pay',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log(response.data);
				return response.data;
			})
			.error(function (response) {
				$ionicLoading.hide();
				console.log(response);
			});
			return promise;
		}

		// Checkout Step 9
		service.getCheckoutSuccess = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.CHECKOUT + 'success',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				$ionicLoading.hide();
				console.log(response.data);
				return response.data;
			});
			return promise;
		}


		/**
		 * @name $ionicModal#fromTemplateUrl
		 * @param {string} search : Searches products containing this string in their name.
		 * @param {string} tag : Search products with this tag.
		 * @param {boolean} description : true if also needs to be searched in product description, false if not.
		 * @param {integer} category_id : The category id to search in.
		 * @param {boolean} sub_category : true if also needs to be searched in sub categories of the given category, false if not.
		 * @param {string} sort : String ('price', 'name', 'rating', 'model', 'sort_order', 'quantity', 'date_added') Sort order of the returned products.
		 * @param {string} order : String ('ASC', 'DESC') Order of the returned products.
		 * @param {integer} page : Product page.
		 * @param {integer} limit : Product limit per page.
		 * @returns {promise} A promise that will be resolved with an instance of
		 * an {@link ionic.controller:ionicModal} controller.
		 */
		service.searchProducts = function (search, tag, description, category_id, sub_category, sort, order, page, limit) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			$http.get(OC_CONFIG.SEARCH, {params:{"search": search,
												 "tag" : tag,
												 "description" : description,
												 "category_id" : category_id,
												 "sub_category" : sub_category,
												 "sort" : sort,
												 "order" : order,
												 "page" : page,
												 "limit" : limit
												}})
				.then(function (response) {
				$ionicLoading.hide();
				console.log('search products');
				console.log(response.data);
			})
		}

		service.userLogin = function (userCreds) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			console.log(userCreds);
			var userCredentials = {};
			userCredentials.email = userCreds.email;
			userCredentials.password = userCreds.password;

			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'login',
				method: "POST",
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						console.log(str);
					}
					return str.join("&");
				},
				data: userCredentials
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log(response.account);
				return response.account;
			})
			.error(function (response) {
				$ionicLoading.hide();
				console.log(response.data);
			});
			return promise;
		}

		service.userLogout = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'logout',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log("user logout");
				console.log(response);
				return response;
			})
			.error(function (response) {
				console.log(response);
			});
			return promise;
		}

		service.userAccount = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'account',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log("user account");
				console.log(response.account);
				return response.account;
			})
			.error(function (response) {
				$ionicLoading.hide();
				console.log(response.errors);
				return response.errors;
			});
			return promise;
		}

		service.userRegister = function (userCreds) {
			var userCredentials = {};
			userCredentials.firstname = userCreds.firstname;
			userCredentials.lastname = userCreds.lastname;
			userCredentials.email = userCreds.email;
			userCredentials.telephone = userCreds.telephone;
			userCredentials.password = userCreds.password;
			userCredentials.confirm = userCreds.confirm;
			userCredentials.address_1 = userCreds.address_1;
			userCredentials.city = userCreds.city;
			userCredentials.country_id = userCreds.country_id;
			userCredentials.zone_id = userCreds.zone_id;
			userCredentials.agree = userCreds.agree;
//
//			userCredentials.firstname = 'john';
//			userCredentials.lastname = 'roberts';
//			userCredentials.email = 'johnny@robertsons.com';
//			userCredentials.telephone = '123456890312';
//			userCredentials.password = 'password';
//			userCredentials.confirm = 'password';
//			userCredentials.address_1 = 'street 1';
//			userCredentials.city = 'bucharest';
//			userCredentials.country_id = '5';
//			userCredentials.zone_id = '122';
//			userCredentials.agree = 'true';

			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'register',
				method: "POST",
				headers: {'Authorization': OC_CONFIG.TOKEN, 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						console.log(str);
					}
					return str.join("&");
				},
				data: userCredentials
			})
			.success(function (response) {
				console.log("user registered");
				console.log(response.data);
				return response.data;
			})
			.error(function (error) {
				console.log(error);
			});
			return promise;
		}

		service.getAddresses = function () {
			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'address',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log("user addresses");
				console.log(response.data.addresses);
				return response.data.addresses;
			});
			return promise;
		}

		service.deleteAddress = function (id) {
			var promise = $http({
				url: OC_CONFIG.ACCOUNT + 'address'  + id,
				method: "DELETE",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log("delete address");
				console.log(response.data);
				return response.data;
			});
			return promise;
		}

		service.getWishlist = function () {
			service.categProducts = [];
			var promise = $http({
				url: OC_CONFIG.WISHLIST,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log("user wishlist");
				console.log(response.data.wishlist.products);
//				service.categProducts = response.data.wishlist.products;
//				$rootScope.$broadcast('productsLoaded');
				return response.data.wishlist.products;
			});
			return promise;
		}

		service.addProductToWishlist = function (id) {
			var promise = $http({
				url: OC_CONFIG.WISHLIST + id,
				method: "POST",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log("added product to whishlist");
				console.log(response.data.wishlist.products);
				return response.data.wishlist.products;
			});
			return promise;
		}

		service.deleteProductFromWishlist = function (id) {
			var promise = $http({
				url: OC_CONFIG.WISHLIST + id,
				method: "DELETE",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.then(function (response) {
				console.log("delete product from whishlist");
				console.log(response.data.wishlist.products);
				return response.data.wishlist.products;
			});
			return promise;
		}

		service.getCountries = function () {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.COMMON + 'country',
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log("user account");
				console.log(response);
				return response;
			})
			.error(function (response) {
				$ionicLoading.hide();
				console.log(response.errors);
				return response.errors;
			});
			return promise;
		}

		service.getZoneIds = function (id) {
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
			var promise = $http({
				url: OC_CONFIG.COMMON + 'country/' + id,
				method: "GET",
				headers: {'Authorization': OC_CONFIG.TOKEN}
			})
			.success(function (response) {
				$ionicLoading.hide();
				console.log("user account");
				console.log(response);
				return response;
			})
			.error(function (response) {
				$ionicLoading.hide();
				console.log(response.errors);
				return response.errors;
			});
			return promise;

		}







		// compose url for all restaurants http GET
		var restaurantsUrl = function () {
			_finalUrl = baseUrl + '/api/restaurants/?callback=JSON_CALLBACK';
			return _finalUrl;
		};
		// compose url for individual restaurant http GET
		var menuUrl = function () {
			_finalUrl = baseUrl + '/api/restaurant/' + _restaurantID + '/location/' + _locationID + '/get_menu?callback=JSON_CALLBACK';
			return _finalUrl;
		};

		//initialize and register devices ID
		var pushresult = push.registerPush(function (result) {
			if (result.type === 'registration') {
				if (result.device === 'android')
					androidID = result.id;
				else
					iosID = result.id;
			}
		});

		// find the nearest restaurant location from the client
		var findClosestDistance = function (restaurant, loc) {
			console.log(restaurant);
			var locations = restaurant.locations;
			var distancesToLocations = [];
			for (var j = 0; j < locations.length; ) {
				//check if current location has coordinates and delivery range set
				if (locations[j].locationCoordinates === 'no_location_and_delivery_area' || locations[j].locationCoordinates === 'no_delivery_area') {
					j++;
				}
				else {
					var latR = locations[j].locationCoordinates.latitude;
					var lonR = locations[j].locationCoordinates.longitude;
					var distance = getDistance(loc.lat, loc.lon, latR, lonR);
					distancesToLocations.push(distance);
					j++;
				}
			}
			//set the closest restaurant location to the user
			if (distancesToLocations.length > 0) {
				//find closest distance from client to location
				var minDistIndex = distancesToLocations.indexOf(Math.min.apply(Math, distancesToLocations));

				//set location, info and distance to closest location
				restaurant.locationId = locations[minDistIndex].locationId;
				restaurant.locationName = locations[minDistIndex].name;
				restaurant.info = locations[minDistIndex];
				restaurant.distance = distancesToLocations[minDistIndex];

				//check if client is in the delivery area of the restaurant
				if (restaurant.distance > restaurant.info.locationCoordinates.deliveryArea) {
					//alert("we can't deliver to this address!")
					$translate(['popup.info', 'popup.not_in_delivery_zone']).then(function (translate) {
						$ionicPopup.alert({
							title: translate['popup.info'],
							template: translate['popup.not_in_delivery_zone'],
							buttons: [{
								text: 'OK',
								type: 'button-calm'
							}]
						});
						return false;
					});
				}


			}
			else {
				$translate(['popup.info', 'popup.not_in_delivery_zone']).then(function (translate) {
					$ionicPopup.alert({
						title: translate['popup.info'],
						template: translate['popup.not_in_delivery_zone'],
						buttons: [{
							text: 'OK',
							type: 'button-calm'
						}]
					});

					return false;
				});
			}

			console.log(restaurant);
			return restaurant;
		};

		var findDistances = function (restaurant, loc) {
			console.log(restaurant);
			var locations = restaurant.locations;
			var distancesToLocations = [];
			for (var j = 0; j < locations.length; ) {
				//check if current location has coordinates and delivery range set
				if (locations[j].locationCoordinates === 'no_location_and_delivery_area' || locations[j].locationCoordinates === 'no_delivery_area') {
					j++;
				}
				else {
					var latR = locations[j].locationCoordinates.latitude;
					var lonR = locations[j].locationCoordinates.longitude;
					var distance = getDistance(loc.lat, loc.lon, latR, lonR);
					locations[j].distance = distance;
					j++;
				}
			}
			console.log(restaurant);
			return restaurant;
		};

		service.getCurrentLocation = function () {
			var positionOptions = {
				timeout: 15000,
				enableHighAccuracy: false // may cause errors if true
			};
			$ionicLoading.show({templateUrl: 'templates/loadingAddress.html', noBackdrop: false});
			$cordovaGeolocation.getCurrentPosition(positionOptions).then(function (position) {
				// Position here: position.coords.latitude, position.coords.longitude
				service.loc = {lat: position.coords.latitude, lon: position.coords.longitude};
				$rootScope.$broadcast('locationLoaded', service.loc);
				console.log('location loaded');
				$ionicLoading.hide();
			}, function (err) {
				//GPS not activated
				$ionicLoading.hide();
				$translate(['popup.location_services', 'popup.choose_address']).then(function (translate) {
					var GpsPopup = $ionicPopup.alert({
						title: translate['popup.location_services'],
						template: translate['popup.enable_gps'],
						buttons: [{
							text: 'OK',
							type: 'button-calm'
						}]
					});
				});
			});
		};

		//http service for restaurants list
		service.getRestaurants = function (loc, deliveryType) {
			service.restaurants = [];
			service.restaurantName = '';
			service.categoryName = '';
			service.menu = [];
			service.info = [];
			service.products = [];
			service.productInfo = [];

			if (service.restaurants.length === 0) {
				restaurantsUrl();
				$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});
				$http.jsonp(_finalUrl)
					.then(function (result) {
					console.log('aici 1');

					//if result returns an error retry to get restaurants
					if (['retrieve_restaurants', 'retrieve_locations', 'retrieve_location', 'retrieve_delivery_area', 'retrieve_minimum_delivery_fee', 'retrieve_delivery_fee'].indexOf(result.data.error) >= 0)
						service.getRestaurants(loc);
					//calculate the distance of a restaurant from client's location
					var restList = result.data.restaurants;
					console.log(restList);
					console.log(_restaurantID);
					for (var i = 0; i < restList.length; i++)
						if (restList[i].restaurantId === _restaurantID) {
							$ionicLoading.hide();
							console.log('aici 2');
							if (deliveryType === "delivery")
								var restaurant = findClosestDistance(restList[i], loc);
							if (deliveryType === "pickup")
								var restaurant = findDistances(restList[i], loc);
							$rootScope.$broadcast('restaurantFound');
							angular.copy(restaurant, service.restaurants);

							if (restaurant.locationId) {
								$state.go("leftdrawer.categories", {restaurantName : restaurant.restaurantName});
								console.log(restaurant.locationName);
								service.setRestaurantIDs(restaurant.restaurantId, restaurant.locationId, restaurant.restaurantName, restaurant.info);
							}
						}

				}, function (result) {
					$ionicLoading.hide();
				});
				return service.restaurants;
			}
			else
				return service.restaurants;
		};


		//http service for individual restaurants menu
		service.setRestaurantIDs = function (restaurantID, locationID, restaurantName, info) {
			service.restaurantName = restaurantName;
			//_restaurantID = restaurantID;
			_locationID = locationID;
			service.menu = [];
			service.info = [];
			CartService.products = [];
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: true});
			menuUrl();
			$http.jsonp(_finalUrl)
				.then(function (result) {
				//Success
				angular.copy(result.data.menu, service.menu);
				angular.copy(info, service.info);
				$rootScope.$broadcast('restaurantLoaded');
				$ionicLoading.hide();
			}, function (result) {
				//Error
			});
		};

		//service for products filtering
		service.updateProducts = function (categ) {
			for (var i = 0; i < service.menu.length; i++)
				if (service.menu[i].categoryId === categ.categoryId)
					service.products = service.menu[i].products;
			service.categoryName = categ.categoryName;
		};

		service.cacheImages = function () {
			var images = [];
			var data = service.menu;
			//console.log(data);

			//preload and cache images after menu has loaded
			for (var i = 0; i < data.length; i++)
				for (var j = 0; j < data[i].products.length; j++) {
					var imageThumb = 'http://185.16.40.144' + data[i].products[j].normalPic;
					var imageNormal = 'http://185.16.40.144' + data[i].products[j].resizedPic;
					images.push(imageThumb, imageNormal);
				}
			//console.log(images);
			$ImageCacheFactory.Cache(images).then(function () {
				//console.log("done preloading!");
			});
		};

		//http service for sending Order to Dashboard
		service.sendOrder = function () {
			//check if choosen address is in delivery area
			console.log(service.info);
			var locInfo = service.info.locationCoordinates;
			var dist = getDistance(locInfo.latitude, locInfo.longitude, DeliveryInfoService.address.coordinates.lat, DeliveryInfoService.address.coordinates.lon, info);
			console.log(DeliveryInfoService.address);
			console.log(dist);
			console.log(locInfo.deliveryArea);
			if (dist > locInfo.deliveryArea) {
				$translate(['popup.cart', 'popup.not_in_delivery_zone', 'popup.start_over']).then(function (translate) {
					$ionicPopup.confirm({
						title: translate['popup.cart'],
						template: translate['popup.not_in_delivery_zone'],
						buttons: [{
							text: 'OK',
							type: 'button-calm font-united'
						}, {
							text: translate['popup.start_over'],
							type: 'button-search',
							onTap: function () {
								$state.go("leftdrawer.welcome");
								CartService.products = [];
							}
						}]
					});
					return false;
				});
			}

			//show loading screen
			$ionicLoading.show({templateUrl: 'templates/loading.html', noBackdrop: false});

			//get products
			var product = new Array;
			var address = DeliveryInfoService.address;
			var item = CartService.products;
			for (var i = 0; i < item.length; i++) {
				product.push({
					productId: item[i].id,
					quantity: item[i].quantity
				});
			}
			// get UserInfo from LocalStorage
			var client = new Object;
			var parsedInfo = DeliveryInfoService.getUserInfo();
			if (!parsedInfo.clientId)
				client.clientId = null;
			else
				client.clientId = parsedInfo.clientId;
			client.name = parsedInfo.first_name + ' ' + parsedInfo.last_name;
			client.tel = parsedInfo.phone;
			client.mail = parsedInfo.email;
			client.lastSeen = 'portal';
			client.androidID = androidID;
			client.iosID = iosID;

			//get restaurant info
			var info = new Object;
			info.deliveryFee = service.info.deliveryFee;
			info.deliveryArea = service.info.locationCoordinates.deliveryArea;
			info.minDeliveryFee = service.info.minDeliveryFee;
			info.name = service.info.name;
			info.locationCoordinates = {};
			info.locationCoordinates.latitude = service.info.locationCoordinates.latitude;
			info.locationCoordinates.longitude = service.info.locationCoordinates.longitude;
			info.locationCoordinates.deliveryArea = service.info.locationCoordinates.deliveryArea;

			order.restaurantId = _restaurantID;
			order.locationId = _locationID;
			order.type = $rootScope.deliveryType;
			order.additionalInfo = '';
			order.products = product;
			order.total = CartService.showTotal();
			order.deliveryAddress = address.street + ' No ' + address.number + ' City ' + address.locality;
			order.latLng = {latitude: address.coordinates.lat, longitude: address.coordinates.lon};
			order.client = client;
			order.date = new Date();
			order.info = info;

			console.log(order);
			$http({
				url: baseUrl + '/api/add_order',
				method: "POST",
				data: JSON.stringify(order),
				headers: {'Content-Type': 'application/json; charset=utf-8'}
			})
				.then(function (response) {
				$state.go('goodbye');
				$ionicLoading.hide();
				if (response.data.clientId) {
					parsedInfo.clientId = response.data.clientId;
					DeliveryInfoService.saveUserInfo(parsedInfo);
				}
				DeliveryInfoService.saveOrder(order, item, service.restaurantName);
				CartService.products = [];
			});
		};
		//helper function to get distance from to sets of coordinates (latitude and longitude)
		function getDistance(lat1, lon1, lat2, lon2) {

			function deg2rad(deg) {
				return deg * (Math.PI / 180);
			}
			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2 - lat1);  // deg2rad below
			var dLon = deg2rad(lon2 - lon1);
			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c; // Distance in km
			return d;
		}

		return service;
	});
})();

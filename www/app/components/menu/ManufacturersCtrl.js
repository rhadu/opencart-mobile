'use strict';
(function () {
	var app = angular.module('Tapitoo.ManufacturersController', ['ui.router']);
	//factory for cart operations
	app.controller('ManufacturersController', function ($scope, $state, manufacturers, ShopService) {

		$scope.manufacturers = manufacturers;
		console.log($scope.manufacturers);
		//ShopService.getManufacturers();

		$scope.getManufacturer = function(manufacturer) {
			console.log(manufacturer);
			ShopService.getManufacturersProducts(manufacturer.manufacturer_id)
			$state.go("leftdrawer.products")
		}
	})

})();



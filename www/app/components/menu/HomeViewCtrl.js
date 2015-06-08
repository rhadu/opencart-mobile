'use strict';
(function () {
	var app = angular.module('Tapitoo.HomeViewController', ['ui.router']);
	//factory for cart operations
	app.controller('HomeViewController', function ($scope, ShopService) {
		console.log('homecontroler');

		ShopService.getAllCategories();
		$scope.products = [{"productName":"Dress 1","productPrice":"12","productUrl":"../img/featured/women1.jpg"},{"productName":"Dress 2","productPrice":"13","productUrl":"../img/featured/women2.jpg"},{"productName":"Shirt 1","productPrice":"12","productUrl":"../img/featured/men1.jpg"},{"productName":"Shirt 2","productPrice":"9","productUrl":"../img/featured/men2.jpg"},{"productName":"Dress 3","productPrice":"12","productUrl":"../img/featured/women3.jpg"},{"productName":"Dress 4","productPrice":"45","productUrl":"../img/featured/women4.jpg"},{"productName":"Shirt 3","productPrice":"12","productUrl":"../img/featured/men3.jpg"},{"productName":"Shirt 4","productPrice":"90","productUrl":"../img/featured/men4.jpg"}]
	})
})();



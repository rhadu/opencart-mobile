'use strict';
(function () {
    var app = angular.module('ProductsCtrl', ['ui.router']);
    
    app.controller('ProductsController', function ($scope, RestaurantService, CartService, $timeout) {
        $scope.restaurantName = RestaurantService.restaurantName;
        $scope.menuProducts = RestaurantService.products;
        $scope.productInfo = RestaurantService.productInfo;

        $scope.url = RestaurantService.url;
        $scope.badgeTest = CartService.showTotal();
        $scope.addedToCart = true;

        RestaurantService.cacheImages();

        // go to product details and initialize required modifiers
        $scope.goToDetails = function (product) {
            RestaurantService.cacheImages();
            $scope.productInfo = product;
            $scope.productInfo.quantity = 0;
            RestaurantService.productTotal = 0;
            RestaurantService.productInfo = product;
            RestaurantService.productInfo.modifiers = RestaurantService.modifiers;

            var modifiers = RestaurantService.productInfo.modifiers;

            for (var i = 0; i < modifiers.length; i++) {
                for (var j = 0; j < modifiers[i].modifierElement.length; j++)
                    if (modifiers[i].validation === 'required') {
                        if (j === 0)
                            modifiers[i].modifierElement[j].checked = true;
                        else
                            modifiers[i].modifierElement[j].checked = false;
                    }
                    else
                        modifiers[i].modifierElement[j].checked = false;
            }
        };

        //filter for product status
        $scope.filterStatus = function (product) {
            return product.productStatus === "true";
        };
    });
})();
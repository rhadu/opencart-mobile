'use strict';
(function () {
    var app = angular.module('Tapitoo.CartService', ['ui.router']);
    //factory for cart operations
    app.factory('CartService', function () {
        var service = {};
        service.products = [];
        service.totalPrice = 0;
        service.productTotal = 0;


        service.productPrice = function (item) {
            var productTotal = 0;
            var modifiers = item.modifiers;
            for (var i = 0; i < modifiers.length; i++)
                for (var j = 0; j < modifiers[i].modifierElement.length; j++) {
                    var element = modifiers[i].modifierElement[j];
                    if (element.checked === true)
                        productTotal += parseFloat(element.price);
                }
            return productTotal;
        };

        service.modifiersIDs = function (item) {
            var modifiersIds = [];
            var modifiers = item.modifiers;
            for (var i = 0; i < modifiers.length; i++)
                for (var j = 0; j < modifiers[i].modifierElement.length; j++) {
                    var element = modifiers[i].modifierElement[j];
                    if (element.checked === true) {
                        modifiersIds.push(element);
                    }
                }
            return modifiersIds;
        };


        service.addToOrder = function (item) {
//            var found = 0;
//            for (var i = 0; i < service.products.length; i++)
//                if (service.products[i].productId === item.productId) {
//                    found = 1;
//                }
//            if (found === 0)
            var productPrice = service.productPrice(item);
            var modifiersArray = service.modifiersIDs(item);
            service.products.push({
                id: item.id,
                quantity: item.quantity,
                productPrice: productPrice,
                productName: item.productName,
                addedModifiers: modifiersArray
            });
        };
        service.incrementItem = function (item) {
            var count;
            if (!item.quantity)
                return 1;
            else
                return count = item.quantity + 1;
        };
        service.decrementItem = function (item) {
            var count;
            if (item.quantity !== 0)
                return count = item.quantity - 1;
            else
                return 0;
        };
        service.deleteItem = function (item) {
            var cartItems = service.products;
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].productId === item.productId) {
                    cartItems.splice(i, 1);
                    break;
                }
            }
            return 0;
        };
        service.showTotal = function () {
            var cartItems = service.products;
            service.totalPrice = 0;
            for (var i = 0; i < cartItems.length; i++)
                service.totalPrice += cartItems[i].quantity * cartItems[i].productPrice;
            return service.totalPrice;
        };

        return service;
    });

})();
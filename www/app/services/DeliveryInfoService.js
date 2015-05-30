'use strict';
(function () {
    var app = angular.module('Tapitoo.DeliveryInfoService', ['ui.router']);


    //factory for user, address and order manipulation
    app.factory('DeliveryInfoService', function () {
        var service = {};

        service.address = {};
        service.user = {};

        service.saveUserInfo = function (userInfo) {
            service.user = userInfo;
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        };

        service.getUserInfo = function () {
            return JSON.parse(window.localStorage.getItem('userInfo'));
        };

        service.saveAddress = function (userAddress) {
            console.log(userAddress);
            if (!window.localStorage.getItem('addressList')) {
                var a = [];
                a[0] = userAddress;
                window.localStorage.setItem('addressList', JSON.stringify(a));
            }
            else {
                var a = JSON.parse(window.localStorage.getItem('addressList'));
                a.push(userAddress);
                window.localStorage.setItem('addressList', JSON.stringify(a));
            }
        };
        
        service.getAddresses = function () {
            return JSON.parse(window.localStorage.getItem('addressList'));
        };
        

        service.saveOrder = function (order, products, restName) {
            if (!window.localStorage.getItem('orders')) {
                var a = [];
                order.products = products;
                order.restaurantName = restName;
                a[0] = order;
                window.localStorage.setItem('orders', JSON.stringify(a));

            }
            else {
                var a = JSON.parse(window.localStorage.getItem('orders'));
                order.products = products;
                order.restaurantName = restName;
                a.push(order);
                window.localStorage.setItem('orders', JSON.stringify(a));
            }
        };

        service.getOrders = function () {
            if (window.localStorage.getItem('orders'))
                return JSON.parse(window.localStorage.getItem('orders')).reverse();
            else
                return false;
        };

        return service;
    });
})();
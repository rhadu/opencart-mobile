'use strict';
(function () {
    var app = angular.module('GoodbyeCtrl', ['ui.router']);

    app.controller('GoodbyeController', function ($scope, RestaurantService) {
        $scope.restaurant = RestaurantService.restaurantName;

        //facebook share
        $scope.facebookShare = function () {
            facebookConnectPlugin.showDialog({
                method: 'feed',
                name: 'Tapitoo',
                caption: 'Restaurant Ordering Mobile App.',
                description: 'I just ordered from tapitoo .',
                link: 'http://www.tapitoo.com',
                picture: 'http://carpedurham.com/wp-content/uploads/2011/01/heart-fork-and-knife-vector.jpg',
                actions: [{name: 'Get Started', link: 'http://www.tapitoo.com'}]
            },
            function (response) {
            });
        };
    });
})();
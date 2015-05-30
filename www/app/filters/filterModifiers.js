'use strict';
(function () {
    var app = angular.module('Tapitoo.filterModifiers', ['ui.router']);

    app.filter('filterModifiers', function () {
        return function (modifiers, type) {
            var out = [];
            for (var i = 0; i < modifiers.length; i++) {
                if (modifiers[i].type === type)
                    out.push(modifiers[i]);
            }
            return out;
        };
    });
})();




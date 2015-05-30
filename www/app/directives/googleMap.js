'use strict';
(function () {
    var app = angular.module('Tapitoo.googleMap', ['ui.router']);

    app.controller('MapController', function ($scope) {
        //center on user location
        $scope.centerOnLocation = function () {
            $scope.loc = {lat: $scope.loc.lat, lon: $scope.loc.lon};
        };
    });
    
    //map directive
    app.directive('googleMap', function (Geocoder, $compile, DeliveryInfoService, LocationServices) {
        return {
            restrict: "E",
            replace: true,
            template: "<div></div>",
            scope: {
                center: "=", // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
                width: "@", // Map width in pixels.
                height: "@", // Map height in pixels.
                zoom: "@", // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
                mapTypeId: "@", // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
                panControl: "@", // Whether to show a pan control on the map.
                zoomControl: "@", // Whether to show a zoom control on the map.
                scaleControl: "@"   // Whether to show scale control on the map.
            },
            link: function (scope, element, attrs) {
                var controlTemplate,
                        controlElem,
                        markerTemplate,
                        markerElem,
                        geoStreet,
                        geoNumber,
                        geoLocality;
                var map;
                // listen to changes in scope variables and update the control
                var arr = ["width", "height", "mapTypeId", "panControl", "zoomControl", "scaleControl"];
                for (var i = 0, cnt = arr.length; i < arr.length; i++) {
                    scope.$watch(arr[i], function () {
                        cnt--;
                        if (cnt <= 0) {
                            updateControl();
                        }
                    });
                }

                // update zoom and center without re-creating the map
                scope.$watch("zoom", function () {
                    if (map && scope.zoom)
                        map.setZoom(scope.zoom * 1);
                });
                scope.$watch("center", function () {
                    if (map && scope.center)
                        map.setCenter(getLocation(scope.center));
                });
                // update the control
                function updateControl() {

                    // update size
                    if (scope.width)
                        element.width(scope.width);
                    if (scope.height)
                        element.height(scope.height);
                    // get map options
                    var options =
                            {
                                //center: new google.maps.LatLng(44.426762, 26.094589),
                                disableDefaultUI: true,
                                zoom: 6,
                                mapTypeId: "roadmap"
                            };
                    if (scope.center)
                        options.center = getLocation(scope.center);
                    if (scope.zoom)
                        options.zoom = scope.zoom * 1;
                    if (scope.mapTypeId)
                        options.mapTypeId = scope.mapTypeId;
                    if (scope.panControl)
                        options.panControl = scope.panControl;
                    if (scope.zoomControl)
                        options.zoomControl = scope.zoomControl;
                    if (scope.scaleControl)
                        options.scaleControl = scope.scaleControl;
                    // create the map
                    map = new google.maps.Map(element[0], options);
                    //add street name badge on map
                    controlTemplate = '<div class="center-map"><span>{{streetName}}</span></div>';
                    controlElem = $compile(controlTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP].push(controlElem[0]);
                    //add custom marker on map
                    markerTemplate = '<div class="centerMarker"></div>';
                    markerElem = $compile(markerTemplate)(scope);
                    map.controls[google.maps.ControlPosition.CENTER].push(markerElem[0]);
                    // listen to changes in the center property and geocode location

                    google.maps.event.addListener(map, 'center_changed', function () {

                        var center = map.getCenter();

                        Geocoder.addressForLatLng(center.lat(), center.lng()).then(function (data) {
                            var responses = data.address;
                            geoNumber = '';
                            geoStreet = '';
                            geoLocality = '';
                            for (var i = 0; i < responses.length; ++i) {

                                var super_var1 = responses[i].address_components;
                                for (var j = 0; j < super_var1.length; ++j) {
                                    var super_var2 = super_var1[j].types;
                                    for (var k = 0; k < super_var2.length; ++k) {
                                        //find street number
                                        if (super_var2[k] === "street_number") {
                                            geoNumber = super_var1[j].long_name;
                                        }
                                        //find street
                                        if (super_var2[k] === "route") {
                                            geoStreet = super_var1[j].long_name;
                                        }
                                        //find city
                                        if (super_var2[k] === "locality") {
                                            geoLocality = super_var1[j].long_name;
                                        }
                                    }
                                }
                            }

                            //update street name badge
                            scope.streetName = geoStreet + ' ' + geoNumber;
                            DeliveryInfoService.address = {street: geoStreet, number: geoNumber, locality: geoLocality, coordinates: {lat: center.lat(), lon: center.lng()}};
                            LocationServices.geoStreet = geoStreet;
                            LocationServices.geoNumber = geoNumber;
                            LocationServices.geoLocality = geoLocality;
                        });
                    });
                }

                // convert current location to Google maps location
                function getLocation(loc) {
                    if (loc === null)
                        return new google.maps.LatLng(40, -73);
                    if (angular.isString(loc))
                        loc = scope.$eval(loc);
                    return new google.maps.LatLng(loc.lat, loc.lon);
                }
            }
        };
    });
})();


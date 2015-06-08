'use strict';
(function () {
	var app = angular.module('Tapitoo.LocationServices', ['ui.router']);
	app.factory('LocationServices', function (Geocoder, ShopService, $rootScope) {
		var service = {};
		service.geoStreet = '';
		service.geoNumber = '';
		service.geoLocality = '';
		service.geoCountry = '';

		service.geocodeAddress = function (address) {
			var geocoder = new google.maps.Geocoder();
			var locationType = '';
			geocoder.geocode({'address': address}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					console.log(results);
					locationType = results[0].geometry.location_type;
					var obj = results[0].geometry.location
					var latitude = obj[Object.keys(obj)[0]];
					var longitude = obj[Object.keys(obj)[1]];
					ShopService.loc = {lat: latitude, lon: longitude};
					console.log(ShopService.loc);
					$rootScope.$broadcast('geocodedAddress');
				}
			});
		};

		service.geocodePosition = function () {
			Geocoder.addressForLatLng(ShopService.loc.lat, ShopService.loc.lon).then(function (data) {
				var responses = data.address;
				var geoNumber = '';
				var geoStreet = '';
				var geoLocality = '';
				var geoCountry = '';
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
							//find country
							if (super_var2[k] === "country") {
								geoCountry = super_var1[j].long_name;
							}
						}
					}
					service.geoStreet = geoStreet;
					service.geoNumber = geoNumber;
					service.geoLocality = geoLocality;
					service.geoCountry = geoCountry;

				}
				console.log($rootScope.$$listeners.addressLoaded);
				$rootScope.$broadcast('addressLoaded');
			});
		};

		return service;
	});
})();

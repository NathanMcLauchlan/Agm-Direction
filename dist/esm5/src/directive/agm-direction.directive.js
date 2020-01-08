/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClient } from '@angular/common/http';
var AgmDirection = /** @class */ (function () {
    function AgmDirection(gmapsApi, http) {
        this.gmapsApi = gmapsApi;
        this.http = http;
        this.travelMode = 'DRIVING';
        this.transitOptions = undefined;
        this.drivingOptions = undefined;
        this.waypoints = [];
        this.optimizeWaypoints = true;
        this.provideRouteAlternatives = false;
        this.avoidHighways = false;
        this.avoidTolls = false;
        this.visible = true;
        // Direction change event handler
        this.onChange = new EventEmitter();
        // Direction response for the new request
        this.onResponse = new EventEmitter();
        this.sendInfoWindow = new EventEmitter();
        this.directionsService = undefined;
        this.directionsDisplay = undefined;
        this.waypointsMarker = [];
        this.isFirstChange = true;
    }
    /**
     * @return {?}
     */
    AgmDirection.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.visible === true) {
            this.directionDraw();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AgmDirection.prototype.ngOnChanges = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /**
             * When visible is false then remove the direction layer
             */
        if (!this.visible) {
            try {
                if (typeof this.originMarker !== 'undefined') {
                    this.originMarker.setMap(null);
                    this.destinationMarker.setMap(null);
                    this.waypointsMarker.forEach(function (w) { return w.setMap(null); });
                }
                this.directionsDisplay.setPanel(null);
                this.directionsDisplay.setMap(null);
                this.directionsDisplay = undefined;
            }
            catch (/** @type {?} */ e) { }
        }
        else {
            if (this.isFirstChange) {
                /**
                         * When visible is false at the first time
                         */
                if (typeof this.directionsDisplay === 'undefined') {
                    this.directionDraw();
                }
                this.isFirstChange = false;
                return;
            }
            /**
                   * When renderOptions are not first change then reset the display
                   */
            if (typeof obj.renderOptions !== 'undefined') {
                if (obj.renderOptions.firstChange === false) {
                    if (typeof this.originMarker !== 'undefined') {
                        this.originMarker.setMap(null);
                        this.destinationMarker.setMap(null);
                        this.waypointsMarker.forEach(function (w) { return w.setMap(null); });
                    }
                    this.directionsDisplay.setPanel(null);
                    this.directionsDisplay.setMap(null);
                    this.directionsDisplay = undefined;
                }
            }
            this.directionDraw();
        }
    };
    /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    AgmDirection.prototype.directionDraw = /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    function () {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            if (typeof _this.directionsDisplay === 'undefined') {
                _this.directionsDisplay = new google.maps.DirectionsRenderer(_this.renderOptions);
                _this.directionsDisplay.setMap(map);
                _this.directionsDisplay.addListener('directions_changed', function () {
                    _this.onChange.emit(_this.directionsDisplay.getDirections());
                });
            }
            if (typeof _this.directionsService === 'undefined') {
                _this.directionsService = new google.maps.DirectionsService;
            }
            if (typeof _this.panel === 'undefined') {
                _this.directionsDisplay.setPanel(null);
            }
            else {
                _this.directionsDisplay.setPanel(_this.panel);
            }
            var /** @type {?} */ requestObj = {
                origin: _this.origin,
                destination: _this.destination,
                waypoints: _this.waypoints
            };
            /**
             * @param {?} s
             * @return {?}
             */
            function hashCode(s) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ h = 0; i < s.length; i++) {
                    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
                }
                return h;
            }
            var /** @type {?} */ hash = hashCode(JSON.stringify(requestObj));
            // Render exist direction
            if (typeof _this.renderRoute === 'object' && _this.renderRoute !== null) {
                _this.directionsDisplay.setDirections(_this.renderRoute);
                _this.renderRoute = null; // or set undefined, ''
            }
            else {
                //   if ((window)[<any>'featureToggles'][<any>'CacheThirdPartyApi'].toString() === 'true')
                if ((/** @type {?} */ (window)).featureToggles.CacheThirdPartyApi === 'true') {
                    _this.http.get("/umbraco/api/thirdpartycaching/GetGoogleDirections?request=" + hash).subscribe(function (cacheResponse) {
                        console.log('cached response: ', cacheResponse);
                        if (cacheResponse == null) {
                            // Request new direction
                            // Request new direction
                            _this.directionsService.route({
                                origin: _this.origin,
                                destination: _this.destination,
                                travelMode: _this.travelMode,
                                transitOptions: _this.transitOptions,
                                drivingOptions: _this.drivingOptions,
                                waypoints: _this.waypoints,
                                optimizeWaypoints: _this.optimizeWaypoints,
                                provideRouteAlternatives: _this.provideRouteAlternatives,
                                avoidHighways: _this.avoidHighways,
                                avoidTolls: _this.avoidTolls,
                            }, function (response, status) {
                                _this.onResponse.emit(response);
                                if (status === 'OK') {
                                    _this.directionsDisplay.setDirections(response);
                                    _this.http.post("/umbraco/api/thirdpartycaching/SaveGoogleDirections?request=" + hash, response).subscribe(function (saveRes) {
                                        console.log('save response:', saveRes);
                                    });
                                    /**
                                                     * Emit The DirectionsResult Object
                                                     * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                                     */
                                    // Custom Markers
                                    if (typeof _this.markerOptions !== 'undefined') {
                                        // Remove origin markers
                                        try {
                                            if (typeof _this.originMarker !== 'undefined') {
                                                google.maps.event.clearListeners(_this.originMarker, 'click');
                                                _this.originMarker.setMap(null);
                                            }
                                            if (typeof _this.destinationMarker !== 'undefined') {
                                                google.maps.event.clearListeners(_this.destinationMarker, 'click');
                                                _this.destinationMarker.setMap(null);
                                            }
                                            _this.waypointsMarker.forEach(function (w) {
                                                if (typeof w !== 'undefined') {
                                                    google.maps.event.clearListeners(w, 'click');
                                                    w.setMap(null);
                                                }
                                            });
                                        }
                                        catch (/** @type {?} */ err) {
                                            console.error('Can not reset custom marker.', err);
                                        }
                                        // Set custom markers
                                        var /** @type {?} */ _route_1 = response.routes[0].legs[0];
                                        try {
                                            // Origin Marker
                                            if (typeof _this.markerOptions.origin !== 'undefined') {
                                                _this.markerOptions.origin.map = map;
                                                _this.markerOptions.origin.position = _route_1.start_location;
                                                _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_1.start_address);
                                            }
                                            // Destination Marker
                                            if (typeof _this.markerOptions.destination !== 'undefined') {
                                                _this.markerOptions.destination.map = map;
                                                _this.markerOptions.destination.position = _route_1.end_location;
                                                _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_1.end_address);
                                            }
                                            // Waypoints Marker
                                            if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                                _this.waypoints.forEach(function (waypoint, index) {
                                                    // If waypoints are not array then set all the same
                                                    if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                        _this.markerOptions.waypoints.map = map;
                                                        _this.markerOptions.waypoints.position = _route_1.via_waypoints[index];
                                                        _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_1.via_waypoints[index]));
                                                    }
                                                    else {
                                                        _this.markerOptions.waypoints[index].map = map;
                                                        _this.markerOptions.waypoints[index].position = _route_1.via_waypoints[index];
                                                        _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_1.via_waypoints[index]));
                                                    }
                                                }); // End forEach
                                            }
                                        }
                                        catch (/** @type {?} */ err) {
                                            console.error('MarkerOptions error.', err);
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            _this.onResponse.emit(cacheResponse);
                            _this.directionsDisplay.setDirections(cacheResponse);
                            /**
                                           * Emit The DirectionsResult Object
                                           * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                           */
                            // Custom Markers
                            if (typeof _this.markerOptions !== 'undefined') {
                                // Remove origin markers
                                try {
                                    if (typeof _this.originMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.originMarker, 'click');
                                        _this.originMarker.setMap(null);
                                    }
                                    if (typeof _this.destinationMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.destinationMarker, 'click');
                                        _this.destinationMarker.setMap(null);
                                    }
                                    _this.waypointsMarker.forEach(function (w) {
                                        if (typeof w !== 'undefined') {
                                            google.maps.event.clearListeners(w, 'click');
                                            w.setMap(null);
                                        }
                                    });
                                }
                                catch (/** @type {?} */ err) {
                                    console.error('Can not reset custom marker.', err);
                                }
                                // Set custom markers
                                var /** @type {?} */ _route_2 = cacheResponse.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof _this.markerOptions.origin !== 'undefined') {
                                        _this.markerOptions.origin.map = map;
                                        _this.markerOptions.origin.position = _route_2.start_location;
                                        _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_2.start_address);
                                    }
                                    // Destination Marker
                                    if (typeof _this.markerOptions.destination !== 'undefined') {
                                        _this.markerOptions.destination.map = map;
                                        _this.markerOptions.destination.position = _route_2.end_location;
                                        _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_2.end_address);
                                    }
                                    // Waypoints Marker
                                    if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                        _this.waypoints.forEach(function (waypoint, index) {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                _this.markerOptions.waypoints.map = map;
                                                _this.markerOptions.waypoints.position = _route_2.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_2.via_waypoints[index]));
                                            }
                                            else {
                                                _this.markerOptions.waypoints[index].map = map;
                                                _this.markerOptions.waypoints[index].position = _route_2.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_2.via_waypoints[index]));
                                            }
                                        }); // End forEach
                                    }
                                }
                                catch (/** @type {?} */ err) {
                                    console.error('MarkerOptions error.', err);
                                }
                            }
                        }
                    });
                }
                else {
                    // Request new direction
                    // Request new direction
                    _this.directionsService.route({
                        origin: _this.origin,
                        destination: _this.destination,
                        travelMode: _this.travelMode,
                        transitOptions: _this.transitOptions,
                        drivingOptions: _this.drivingOptions,
                        waypoints: _this.waypoints,
                        optimizeWaypoints: _this.optimizeWaypoints,
                        provideRouteAlternatives: _this.provideRouteAlternatives,
                        avoidHighways: _this.avoidHighways,
                        avoidTolls: _this.avoidTolls,
                    }, function (response, status) {
                        _this.onResponse.emit(response);
                        if (status === 'OK') {
                            _this.directionsDisplay.setDirections(response);
                            _this.http.post("/umbraco/api/thirdpartycaching/SaveGoogleDirections?request=" + hash, response).subscribe(function (saveRes) {
                                console.log('save response:', saveRes);
                            });
                            /**
                                               * Emit The DirectionsResult Object
                                               * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                               */
                            // Custom Markers
                            if (typeof _this.markerOptions !== 'undefined') {
                                // Remove origin markers
                                try {
                                    if (typeof _this.originMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.originMarker, 'click');
                                        _this.originMarker.setMap(null);
                                    }
                                    if (typeof _this.destinationMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.destinationMarker, 'click');
                                        _this.destinationMarker.setMap(null);
                                    }
                                    _this.waypointsMarker.forEach(function (w) {
                                        if (typeof w !== 'undefined') {
                                            google.maps.event.clearListeners(w, 'click');
                                            w.setMap(null);
                                        }
                                    });
                                }
                                catch (/** @type {?} */ err) {
                                    console.error('Can not reset custom marker.', err);
                                }
                                // Set custom markers
                                var /** @type {?} */ _route_3 = response.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof _this.markerOptions.origin !== 'undefined') {
                                        _this.markerOptions.origin.map = map;
                                        _this.markerOptions.origin.position = _route_3.start_location;
                                        _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_3.start_address);
                                    }
                                    // Destination Marker
                                    if (typeof _this.markerOptions.destination !== 'undefined') {
                                        _this.markerOptions.destination.map = map;
                                        _this.markerOptions.destination.position = _route_3.end_location;
                                        _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_3.end_address);
                                    }
                                    // Waypoints Marker
                                    if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                        _this.waypoints.forEach(function (waypoint, index) {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                _this.markerOptions.waypoints.map = map;
                                                _this.markerOptions.waypoints.position = _route_3.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_3.via_waypoints[index]));
                                            }
                                            else {
                                                _this.markerOptions.waypoints[index].map = map;
                                                _this.markerOptions.waypoints[index].position = _route_3.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_3.via_waypoints[index]));
                                            }
                                        }); // End forEach
                                    }
                                }
                                catch (/** @type {?} */ err) {
                                    console.error('MarkerOptions error.', err);
                                }
                            }
                        }
                    });
                }
            }
        });
    };
    /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    AgmDirection.prototype.setMarker = /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    function (map, marker, markerOpts, content) {
        var _this = this;
        if (typeof this.infoWindow === 'undefined') {
            this.infoWindow = new google.maps.InfoWindow({});
            this.sendInfoWindow.emit(this.infoWindow);
        }
        marker = new google.maps.Marker(markerOpts);
        marker.addListener('click', function () {
            var /** @type {?} */ infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
            _this.infoWindow.setContent(infowindoContent);
            _this.infoWindow.open(map, marker);
        });
        return marker;
    };
    AgmDirection.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-direction',
                },] }
    ];
    /** @nocollapse */
    AgmDirection.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper, },
        { type: HttpClient, },
    ]; };
    AgmDirection.propDecorators = {
        "origin": [{ type: Input },],
        "destination": [{ type: Input },],
        "travelMode": [{ type: Input },],
        "transitOptions": [{ type: Input },],
        "drivingOptions": [{ type: Input },],
        "waypoints": [{ type: Input },],
        "optimizeWaypoints": [{ type: Input },],
        "provideRouteAlternatives": [{ type: Input },],
        "avoidHighways": [{ type: Input },],
        "avoidTolls": [{ type: Input },],
        "renderOptions": [{ type: Input },],
        "visible": [{ type: Input },],
        "panel": [{ type: Input },],
        "markerOptions": [{ type: Input },],
        "infoWindow": [{ type: Input },],
        "renderRoute": [{ type: Input },],
        "onChange": [{ type: Output },],
        "onResponse": [{ type: Output },],
        "sendInfoWindow": [{ type: Output },],
    };
    return AgmDirection;
}());
export { AgmDirection };
function AgmDirection_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AgmDirection.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AgmDirection.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AgmDirection.propDecorators;
    /**
     * LatLng | String | google.maps.Place
     * @type {?}
     */
    AgmDirection.prototype.origin;
    /**
     * LatLng | String | google.maps.Place
     * @type {?}
     */
    AgmDirection.prototype.destination;
    /** @type {?} */
    AgmDirection.prototype.travelMode;
    /** @type {?} */
    AgmDirection.prototype.transitOptions;
    /** @type {?} */
    AgmDirection.prototype.drivingOptions;
    /** @type {?} */
    AgmDirection.prototype.waypoints;
    /** @type {?} */
    AgmDirection.prototype.optimizeWaypoints;
    /** @type {?} */
    AgmDirection.prototype.provideRouteAlternatives;
    /** @type {?} */
    AgmDirection.prototype.avoidHighways;
    /** @type {?} */
    AgmDirection.prototype.avoidTolls;
    /** @type {?} */
    AgmDirection.prototype.renderOptions;
    /** @type {?} */
    AgmDirection.prototype.visible;
    /** @type {?} */
    AgmDirection.prototype.panel;
    /** @type {?} */
    AgmDirection.prototype.markerOptions;
    /** @type {?} */
    AgmDirection.prototype.infoWindow;
    /** @type {?} */
    AgmDirection.prototype.renderRoute;
    /** @type {?} */
    AgmDirection.prototype.onChange;
    /** @type {?} */
    AgmDirection.prototype.onResponse;
    /** @type {?} */
    AgmDirection.prototype.sendInfoWindow;
    /** @type {?} */
    AgmDirection.prototype.directionsService;
    /** @type {?} */
    AgmDirection.prototype.directionsDisplay;
    /** @type {?} */
    AgmDirection.prototype.originMarker;
    /** @type {?} */
    AgmDirection.prototype.destinationMarker;
    /** @type {?} */
    AgmDirection.prototype.waypointsMarker;
    /** @type {?} */
    AgmDirection.prototype.isFirstChange;
    /** @type {?} */
    AgmDirection.prototype.gmapsApi;
    /** @type {?} */
    AgmDirection.prototype.http;
}
//# sourceMappingURL=agm-direction.directive.js.map
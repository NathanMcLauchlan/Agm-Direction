import { Directive, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AgmDirection {
    /**
     * @param {?} gmapsApi
     * @param {?} http
     */
    constructor(gmapsApi, http) {
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
    ngOnInit() {
        if (this.visible === true) {
            this.directionDraw();
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    ngOnChanges(obj) {
        /**
             * When visible is false then remove the direction layer
             */
        if (!this.visible) {
            try {
                if (typeof this.originMarker !== 'undefined') {
                    this.originMarker.setMap(null);
                    this.destinationMarker.setMap(null);
                    this.waypointsMarker.forEach((w) => w.setMap(null));
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
                        this.waypointsMarker.forEach((w) => w.setMap(null));
                    }
                    this.directionsDisplay.setPanel(null);
                    this.directionsDisplay.setMap(null);
                    this.directionsDisplay = undefined;
                }
            }
            this.directionDraw();
        }
    }
    /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    directionDraw() {
        this.gmapsApi.getNativeMap().then((map) => {
            if (typeof this.directionsDisplay === 'undefined') {
                this.directionsDisplay = new google.maps.DirectionsRenderer(this.renderOptions);
                this.directionsDisplay.setMap(map);
                this.directionsDisplay.addListener('directions_changed', () => {
                    this.onChange.emit(this.directionsDisplay.getDirections());
                });
            }
            if (typeof this.directionsService === 'undefined') {
                this.directionsService = new google.maps.DirectionsService;
            }
            if (typeof this.panel === 'undefined') {
                this.directionsDisplay.setPanel(null);
            }
            else {
                this.directionsDisplay.setPanel(this.panel);
            }
            const /** @type {?} */ requestObj = {
                origin: this.origin,
                destination: this.destination,
                waypoints: this.waypoints
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
            const /** @type {?} */ hash = hashCode(JSON.stringify(requestObj));
            // Render exist direction
            if (typeof this.renderRoute === 'object' && this.renderRoute !== null) {
                this.directionsDisplay.setDirections(this.renderRoute);
                this.renderRoute = null; // or set undefined, ''
            }
            else {
                //   if ((window)[<any>'featureToggles'][<any>'CacheThirdPartyApi'].toString() === 'true')
                if ((/** @type {?} */ (window)).featureToggles.CacheThirdPartyApi === 'true') {
                    this.http.get(`/umbraco/api/thirdpartycaching/GetGoogleDirections?request=${hash}`).subscribe((cacheResponse) => {
                        console.log('cached response: ', cacheResponse);
                        if (cacheResponse == null) {
                            // Request new direction
                            this.directionsService.route({
                                origin: this.origin,
                                destination: this.destination,
                                travelMode: this.travelMode,
                                transitOptions: this.transitOptions,
                                drivingOptions: this.drivingOptions,
                                waypoints: this.waypoints,
                                optimizeWaypoints: this.optimizeWaypoints,
                                provideRouteAlternatives: this.provideRouteAlternatives,
                                avoidHighways: this.avoidHighways,
                                avoidTolls: this.avoidTolls,
                            }, (response, status) => {
                                this.onResponse.emit(response);
                                if (status === 'OK') {
                                    this.directionsDisplay.setDirections(response);
                                    this.http.post(`/umbraco/api/thirdpartycaching/SaveGoogleDirections?request=${hash}`, response).subscribe((saveRes) => {
                                        console.log('save response:', saveRes);
                                    });
                                    /**
                                                     * Emit The DirectionsResult Object
                                                     * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                                     */
                                    // Custom Markers
                                    if (typeof this.markerOptions !== 'undefined') {
                                        // Remove origin markers
                                        try {
                                            if (typeof this.originMarker !== 'undefined') {
                                                google.maps.event.clearListeners(this.originMarker, 'click');
                                                this.originMarker.setMap(null);
                                            }
                                            if (typeof this.destinationMarker !== 'undefined') {
                                                google.maps.event.clearListeners(this.destinationMarker, 'click');
                                                this.destinationMarker.setMap(null);
                                            }
                                            this.waypointsMarker.forEach((w) => {
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
                                        const /** @type {?} */ _route = response.routes[0].legs[0];
                                        try {
                                            // Origin Marker
                                            if (typeof this.markerOptions.origin !== 'undefined') {
                                                this.markerOptions.origin.map = map;
                                                this.markerOptions.origin.position = _route.start_location;
                                                this.originMarker = this.setMarker(map, this.originMarker, this.markerOptions.origin, _route.start_address);
                                            }
                                            // Destination Marker
                                            if (typeof this.markerOptions.destination !== 'undefined') {
                                                this.markerOptions.destination.map = map;
                                                this.markerOptions.destination.position = _route.end_location;
                                                this.destinationMarker = this.setMarker(map, this.destinationMarker, this.markerOptions.destination, _route.end_address);
                                            }
                                            // Waypoints Marker
                                            if (typeof this.markerOptions.waypoints !== 'undefined') {
                                                this.waypoints.forEach((waypoint, index) => {
                                                    // If waypoints are not array then set all the same
                                                    if (!Array.isArray(this.markerOptions.waypoints)) {
                                                        this.markerOptions.waypoints.map = map;
                                                        this.markerOptions.waypoints.position = _route.via_waypoints[index];
                                                        this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints, _route.via_waypoints[index]));
                                                    }
                                                    else {
                                                        this.markerOptions.waypoints[index].map = map;
                                                        this.markerOptions.waypoints[index].position = _route.via_waypoints[index];
                                                        this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints[index], _route.via_waypoints[index]));
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
                            this.onResponse.emit(cacheResponse);
                            this.directionsDisplay.setDirections(cacheResponse);
                            /**
                                           * Emit The DirectionsResult Object
                                           * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                           */
                            // Custom Markers
                            if (typeof this.markerOptions !== 'undefined') {
                                // Remove origin markers
                                try {
                                    if (typeof this.originMarker !== 'undefined') {
                                        google.maps.event.clearListeners(this.originMarker, 'click');
                                        this.originMarker.setMap(null);
                                    }
                                    if (typeof this.destinationMarker !== 'undefined') {
                                        google.maps.event.clearListeners(this.destinationMarker, 'click');
                                        this.destinationMarker.setMap(null);
                                    }
                                    this.waypointsMarker.forEach((w) => {
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
                                const /** @type {?} */ _route = cacheResponse.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof this.markerOptions.origin !== 'undefined') {
                                        this.markerOptions.origin.map = map;
                                        this.markerOptions.origin.position = _route.start_location;
                                        this.originMarker = this.setMarker(map, this.originMarker, this.markerOptions.origin, _route.start_address);
                                    }
                                    // Destination Marker
                                    if (typeof this.markerOptions.destination !== 'undefined') {
                                        this.markerOptions.destination.map = map;
                                        this.markerOptions.destination.position = _route.end_location;
                                        this.destinationMarker = this.setMarker(map, this.destinationMarker, this.markerOptions.destination, _route.end_address);
                                    }
                                    // Waypoints Marker
                                    if (typeof this.markerOptions.waypoints !== 'undefined') {
                                        this.waypoints.forEach((waypoint, index) => {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(this.markerOptions.waypoints)) {
                                                this.markerOptions.waypoints.map = map;
                                                this.markerOptions.waypoints.position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints, _route.via_waypoints[index]));
                                            }
                                            else {
                                                this.markerOptions.waypoints[index].map = map;
                                                this.markerOptions.waypoints[index].position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints[index], _route.via_waypoints[index]));
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
                    this.directionsService.route({
                        origin: this.origin,
                        destination: this.destination,
                        travelMode: this.travelMode,
                        transitOptions: this.transitOptions,
                        drivingOptions: this.drivingOptions,
                        waypoints: this.waypoints,
                        optimizeWaypoints: this.optimizeWaypoints,
                        provideRouteAlternatives: this.provideRouteAlternatives,
                        avoidHighways: this.avoidHighways,
                        avoidTolls: this.avoidTolls,
                    }, (response, status) => {
                        this.onResponse.emit(response);
                        if (status === 'OK') {
                            this.directionsDisplay.setDirections(response);
                            /**
                                               * Emit The DirectionsResult Object
                                               * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                               */
                            // Custom Markers
                            if (typeof this.markerOptions !== 'undefined') {
                                // Remove origin markers
                                try {
                                    if (typeof this.originMarker !== 'undefined') {
                                        google.maps.event.clearListeners(this.originMarker, 'click');
                                        this.originMarker.setMap(null);
                                    }
                                    if (typeof this.destinationMarker !== 'undefined') {
                                        google.maps.event.clearListeners(this.destinationMarker, 'click');
                                        this.destinationMarker.setMap(null);
                                    }
                                    this.waypointsMarker.forEach((w) => {
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
                                const /** @type {?} */ _route = response.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof this.markerOptions.origin !== 'undefined') {
                                        this.markerOptions.origin.map = map;
                                        this.markerOptions.origin.position = _route.start_location;
                                        this.originMarker = this.setMarker(map, this.originMarker, this.markerOptions.origin, _route.start_address);
                                    }
                                    // Destination Marker
                                    if (typeof this.markerOptions.destination !== 'undefined') {
                                        this.markerOptions.destination.map = map;
                                        this.markerOptions.destination.position = _route.end_location;
                                        this.destinationMarker = this.setMarker(map, this.destinationMarker, this.markerOptions.destination, _route.end_address);
                                    }
                                    // Waypoints Marker
                                    if (typeof this.markerOptions.waypoints !== 'undefined') {
                                        this.waypoints.forEach((waypoint, index) => {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(this.markerOptions.waypoints)) {
                                                this.markerOptions.waypoints.map = map;
                                                this.markerOptions.waypoints.position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints, _route.via_waypoints[index]));
                                            }
                                            else {
                                                this.markerOptions.waypoints[index].map = map;
                                                this.markerOptions.waypoints[index].position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints[index], _route.via_waypoints[index]));
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
    }
    /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    setMarker(map, marker, markerOpts, content) {
        if (typeof this.infoWindow === 'undefined') {
            this.infoWindow = new google.maps.InfoWindow({});
            this.sendInfoWindow.emit(this.infoWindow);
        }
        marker = new google.maps.Marker(markerOpts);
        marker.addListener('click', () => {
            const /** @type {?} */ infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
            this.infoWindow.setContent(infowindoContent);
            this.infoWindow.open(map, marker);
        });
        return marker;
    }
}
AgmDirection.decorators = [
    { type: Directive, args: [{
                selector: 'agm-direction',
            },] }
];
/** @nocollapse */
AgmDirection.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper, },
    { type: HttpClient, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AgmDirectionModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AgmDirectionModule,
        };
    }
}
AgmDirectionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpClientModule,
                ],
                declarations: [
                    AgmDirection,
                ],
                exports: [
                    AgmDirection,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AgmDirectionModule, AgmDirection as ɵa };
//# sourceMappingURL=agm-direction.js.map
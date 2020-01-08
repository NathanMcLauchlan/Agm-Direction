(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('agm-direction', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.angularLibraryStarter = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,rxjs,operators,common) { 'use strict';

    var MapsAPILoader = /** @class */ (function () {
        function MapsAPILoader() {
        }
        MapsAPILoader.decorators = [
            { type: core.Injectable },
        ];
        return MapsAPILoader;
    }());

    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    var GoogleMapsAPIWrapper = /** @class */ (function () {
        function GoogleMapsAPIWrapper(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
        GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
            var _this = this;
            return this._zone.runOutsideAngular(function () {
                return _this._loader.load().then(function () {
                    var map = new google.maps.Map(el, mapOptions);
                    _this._mapResolver(map);
                    return;
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
            this._map.then(function (m) { m.setOptions(options); });
        };
        /**
         * Creates a google map marker with the map context
         */
        /**
           * Creates a google map marker with the map context
           */
        GoogleMapsAPIWrapper.prototype.createMarker = /**
           * Creates a google map marker with the map context
           */
        function (options, addToMap) {
            if (options === void 0) { options = {}; }
            if (addToMap === void 0) { addToMap = true; }
            return this._map.then(function (map) {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
            return this._map.then(function () { return new google.maps.InfoWindow(options); });
        };
        /**
         * Creates a google.map.Circle for the current map.
         */
        /**
           * Creates a google.map.Circle for the current map.
           */
        GoogleMapsAPIWrapper.prototype.createCircle = /**
           * Creates a google.map.Circle for the current map.
           */
        function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Circle(options);
            });
        };
        /**
         * Creates a google.map.Rectangle for the current map.
         */
        /**
           * Creates a google.map.Rectangle for the current map.
           */
        GoogleMapsAPIWrapper.prototype.createRectangle = /**
           * Creates a google.map.Rectangle for the current map.
           */
        function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
            return this.getNativeMap().then(function (map) {
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
            return this.getNativeMap().then(function (map) {
                var polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        };
        /**
         * Creates a new google.map.Data layer for the current map
         */
        /**
           * Creates a new google.map.Data layer for the current map
           */
        GoogleMapsAPIWrapper.prototype.createDataLayer = /**
           * Creates a new google.map.Data layer for the current map
           */
        function (options) {
            return this._map.then(function (m) {
                var data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        };
        /**
         * Determines if given coordinates are insite a Polygon path.
         */
        /**
           * Determines if given coordinates are insite a Polygon path.
           */
        GoogleMapsAPIWrapper.prototype.containsLocation = /**
           * Determines if given coordinates are insite a Polygon path.
           */
        function (latLng, polygon) {
            return google.maps.geometry.poly.containsLocation(latLng, polygon);
        };
        GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._map.then(function (m) {
                    m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.clearInstanceListeners = function () {
            this._map.then(function (map) {
                google.maps.event.clearInstanceListeners(map);
            });
        };
        GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
            return this._map.then(function (map) { return map.setCenter(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
        GoogleMapsAPIWrapper.prototype.getBounds = function () {
            return this._map.then(function (map) { return map.getBounds(); });
        };
        GoogleMapsAPIWrapper.prototype.getMapTypeId = function () {
            return this._map.then(function (map) { return map.getMapTypeId(); });
        };
        GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
            return this._map.then(function (map) { return map.setZoom(zoom); });
        };
        GoogleMapsAPIWrapper.prototype.getCenter = function () {
            return this._map.then(function (map) { return map.getCenter(); });
        };
        GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
            return this._map.then(function (map) { return map.panTo(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panBy = function (x, y) {
            return this._map.then(function (map) { return map.panBy(x, y); });
        };
        GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
            return this._map.then(function (map) { return map.fitBounds(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
            return this._map.then(function (map) { return map.panToBounds(latLng); });
        };
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        /**
           * Returns the native Google Maps Map instance. Be careful when using this instance directly.
           */
        GoogleMapsAPIWrapper.prototype.getNativeMap = /**
           * Returns the native Google Maps Map instance. Be careful when using this instance directly.
           */
        function () { return this._map; };
        /**
         * Triggers the given event name on the map instance.
         */
        /**
           * Triggers the given event name on the map instance.
           */
        GoogleMapsAPIWrapper.prototype.triggerMapEvent = /**
           * Triggers the given event name on the map instance.
           */
        function (eventName) {
            return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
        };
        GoogleMapsAPIWrapper.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GoogleMapsAPIWrapper.ctorParameters = function () { return [
            { type: MapsAPILoader, },
            { type: core.NgZone, },
        ]; };
        return GoogleMapsAPIWrapper;
    }());

    var MarkerManager = /** @class */ (function () {
        function MarkerManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markers = new Map();
        }
        MarkerManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                return _this._zone.run(function () {
                    m.setMap(null);
                    _this._markers.delete(marker);
                });
            });
        };
        MarkerManager.prototype.updateMarkerPosition = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
        };
        MarkerManager.prototype.updateTitle = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
        };
        MarkerManager.prototype.updateLabel = function (marker) {
            return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
        };
        MarkerManager.prototype.updateDraggable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
        };
        MarkerManager.prototype.updateIcon = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
        };
        MarkerManager.prototype.updateOpacity = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
        };
        MarkerManager.prototype.updateVisible = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
        };
        MarkerManager.prototype.updateZIndex = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
        };
        MarkerManager.prototype.updateClickable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
        };
        MarkerManager.prototype.updateAnimation = function (marker) {
            return this._markers.get(marker).then(function (m) {
                if (typeof marker.animation === 'string') {
                    m.setAnimation(google.maps.Animation[marker.animation]);
                }
                else {
                    m.setAnimation(marker.animation);
                }
            });
        };
        MarkerManager.prototype.addMarker = function (marker) {
            var markerPromise = this._mapsWrapper.createMarker({
                position: { lat: marker.latitude, lng: marker.longitude },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
                animation: (typeof marker.animation === 'string') ? google.maps.Animation[marker.animation] : marker.animation
            });
            this._markers.set(marker, markerPromise);
        };
        MarkerManager.prototype.getNativeMarker = function (marker) {
            return this._markers.get(marker);
        };
        MarkerManager.prototype.createEventObservable = function (eventName, marker) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        MarkerManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        MarkerManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper, },
            { type: core.NgZone, },
        ]; };
        return MarkerManager;
    }());

    var InfoWindowManager = /** @class */ (function () {
        function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markerManager = _markerManager;
            this._infoWindows = new Map();
        }
        InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
            var _this = this;
            var iWindow = this._infoWindows.get(infoWindow);
            if (iWindow == null) {
                // info window already deleted
                return Promise.resolve();
            }
            return iWindow.then(function (i) {
                return _this._zone.run(function () {
                    i.close();
                    _this._infoWindows.delete(infoWindow);
                });
            });
        };
        InfoWindowManager.prototype.setPosition = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (i) {
                return i.setPosition({
                    lat: infoWindow.latitude,
                    lng: infoWindow.longitude
                });
            });
        };
        InfoWindowManager.prototype.setZIndex = function (infoWindow) {
            return this._infoWindows.get(infoWindow)
                .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
        };
        InfoWindowManager.prototype.open = function (infoWindow) {
            var _this = this;
            return this._infoWindows.get(infoWindow).then(function (w) {
                if (infoWindow.hostMarker != null) {
                    return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                        return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                    });
                }
                return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
            });
        };
        InfoWindowManager.prototype.close = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
        };
        InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
        };
        InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
            var options = {
                content: infoWindow.content,
                maxWidth: infoWindow.maxWidth,
                zIndex: infoWindow.zIndex,
                disableAutoPan: infoWindow.disableAutoPan
            };
            if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
                options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
            }
            var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
            this._infoWindows.set(infoWindow, infoWindowPromise);
        };
        /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         */
        /**
            * Creates a Google Maps event listener for the given InfoWindow as an Observable
            */
        InfoWindowManager.prototype.createEventObservable = /**
            * Creates a Google Maps event listener for the given InfoWindow as an Observable
            */
        function (eventName, infoWindow) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._infoWindows.get(infoWindow).then(function (i) {
                    i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        InfoWindowManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        InfoWindowManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper, },
            { type: core.NgZone, },
            { type: MarkerManager, },
        ]; };
        return InfoWindowManager;
    }());

    /**
     * Class to implement when you what to be able to make it work with the auto fit bounds feature
     * of AGM.
     */
    var /**
     * Class to implement when you what to be able to make it work with the auto fit bounds feature
     * of AGM.
     */
    FitBoundsAccessor = /** @class */ (function () {
        function FitBoundsAccessor() {
        }
        return FitBoundsAccessor;
    }());

    var infoWindowId = 0;
    /**
     * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        <agm-info-window [disableAutoPan]="true">
     *          Hi, this is the content of the <strong>info window</strong>
     *        </agm-info-window>
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmInfoWindow = /** @class */ (function () {
        function AgmInfoWindow(_infoWindowManager, _el) {
            this._infoWindowManager = _infoWindowManager;
            this._el = _el;
            /**
               * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
               */
            this.isOpen = false;
            /**
               * Emits an event when the info window is closed.
               */
            this.infoWindowClose = new core.EventEmitter();
            this._infoWindowAddedToManager = false;
            this._id = (infoWindowId++).toString();
        }
        AgmInfoWindow.prototype.ngOnInit = function () {
            this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
            this._infoWindowManager.addInfoWindow(this);
            this._infoWindowAddedToManager = true;
            this._updateOpenState();
            this._registerEventListeners();
        };
        /** @internal */
        /** @internal */
        AgmInfoWindow.prototype.ngOnChanges = /** @internal */
        function (changes) {
            if (!this._infoWindowAddedToManager) {
                return;
            }
            if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
                typeof this.longitude === 'number') {
                this._infoWindowManager.setPosition(this);
            }
            if (changes['zIndex']) {
                this._infoWindowManager.setZIndex(this);
            }
            if (changes['isOpen']) {
                this._updateOpenState();
            }
            this._setInfoWindowOptions(changes);
        };
        AgmInfoWindow.prototype._registerEventListeners = function () {
            var _this = this;
            this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
                _this.isOpen = false;
                _this.infoWindowClose.emit();
            });
        };
        AgmInfoWindow.prototype._updateOpenState = function () {
            this.isOpen ? this.open() : this.close();
        };
        AgmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            this._infoWindowManager.setOptions(this, options);
        };
        /**
         * Opens the info window.
         */
        /**
           * Opens the info window.
           */
        AgmInfoWindow.prototype.open = /**
           * Opens the info window.
           */
        function () { return this._infoWindowManager.open(this); };
        /**
         * Closes the info window.
         */
        /**
           * Closes the info window.
           */
        AgmInfoWindow.prototype.close = /**
           * Closes the info window.
           */
        function () {
            var _this = this;
            return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
        };
        /** @internal */
        /** @internal */
        AgmInfoWindow.prototype.id = /** @internal */
        function () { return this._id; };
        /** @internal */
        /** @internal */
        AgmInfoWindow.prototype.toString = /** @internal */
        function () { return 'AgmInfoWindow-' + this._id.toString(); };
        /** @internal */
        /** @internal */
        AgmInfoWindow.prototype.ngOnDestroy = /** @internal */
        function () { this._infoWindowManager.deleteInfoWindow(this); };
        AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
        AgmInfoWindow.decorators = [
            { type: core.Component, args: [{
                        selector: 'agm-info-window',
                        template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                    },] },
        ];
        /** @nocollapse */
        AgmInfoWindow.ctorParameters = function () { return [
            { type: InfoWindowManager, },
            { type: core.ElementRef, },
        ]; };
        AgmInfoWindow.propDecorators = {
            "latitude": [{ type: core.Input },],
            "longitude": [{ type: core.Input },],
            "disableAutoPan": [{ type: core.Input },],
            "zIndex": [{ type: core.Input },],
            "maxWidth": [{ type: core.Input },],
            "isOpen": [{ type: core.Input },],
            "infoWindowClose": [{ type: core.Output },],
        };
        return AgmInfoWindow;
    }());

    var markerId = 0;
    /**
     * AgmMarker renders a map marker inside a {@link AgmMap}.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarker = /** @class */ (function () {
        function AgmMarker(_markerManager) {
            this._markerManager = _markerManager;
            /**
               * If true, the marker can be dragged. Default value is false.
               */
            // tslint:disable-next-line:no-input-rename
            this.draggable = false;
            /**
               * If true, the marker is visible
               */
            this.visible = true;
            /**
               * Whether to automatically open the child info window when the marker is clicked.
               */
            this.openInfoWindow = true;
            /**
               * The marker's opacity between 0.0 and 1.0.
               */
            this.opacity = 1;
            /**
               * All markers are displayed on the map in order of their zIndex, with higher values displaying in
               * front of markers with lower values. By default, markers are displayed according to their
               * vertical position on screen, with lower markers appearing in front of markers further up the
               * screen.
               */
            this.zIndex = 1;
            /**
               * If true, the marker can be clicked. Default value is true.
               */
            // tslint:disable-next-line:no-input-rename
            this.clickable = true;
            /**
               * This event emitter gets emitted when the user clicks on the marker.
               */
            this.markerClick = new core.EventEmitter();
            /**
               * This event is fired when the user rightclicks on the marker.
               */
            this.markerRightClick = new core.EventEmitter();
            /**
               * This event is fired when the user stops dragging the marker.
               */
            this.dragEnd = new core.EventEmitter();
            /**
               * This event is fired when the user mouses over the marker.
               */
            this.mouseOver = new core.EventEmitter();
            /**
               * This event is fired when the user mouses outside the marker.
               */
            this.mouseOut = new core.EventEmitter();
            /**
               * @internal
               */
            this.infoWindow = new core.QueryList();
            this._markerAddedToManger = false;
            this._observableSubscriptions = [];
            this._fitBoundsDetails$ = new rxjs.ReplaySubject(1);
            this._id = (markerId++).toString();
        }
        /* @internal */
        /* @internal */
        AgmMarker.prototype.ngAfterContentInit = /* @internal */
        function () {
            var _this = this;
            this.handleInfoWindowUpdate();
            this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
        };
        AgmMarker.prototype.handleInfoWindowUpdate = function () {
            var _this = this;
            if (this.infoWindow.length > 1) {
                throw new Error('Expected no more than one info window.');
            }
            this.infoWindow.forEach(function (marker) {
                marker.hostMarker = _this;
            });
        };
        /** @internal */
        /** @internal */
        AgmMarker.prototype.ngOnChanges = /** @internal */
        function (changes) {
            if (typeof this.latitude === 'string') {
                this.latitude = Number(this.latitude);
            }
            if (typeof this.longitude === 'string') {
                this.longitude = Number(this.longitude);
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (!this._markerAddedToManger) {
                this._markerManager.addMarker(this);
                this._updateFitBoundsDetails();
                this._markerAddedToManger = true;
                this._addEventListeners();
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._markerManager.updateMarkerPosition(this);
                this._updateFitBoundsDetails();
            }
            if (changes['title']) {
                this._markerManager.updateTitle(this);
            }
            if (changes['label']) {
                this._markerManager.updateLabel(this);
            }
            if (changes['draggable']) {
                this._markerManager.updateDraggable(this);
            }
            if (changes['iconUrl']) {
                this._markerManager.updateIcon(this);
            }
            if (changes['opacity']) {
                this._markerManager.updateOpacity(this);
            }
            if (changes['visible']) {
                this._markerManager.updateVisible(this);
            }
            if (changes['zIndex']) {
                this._markerManager.updateZIndex(this);
            }
            if (changes['clickable']) {
                this._markerManager.updateClickable(this);
            }
            if (changes['animation']) {
                this._markerManager.updateAnimation(this);
            }
        };
        /**
         * @internal
         */
        /**
           * @internal
           */
        AgmMarker.prototype.getFitBoundsDetails$ = /**
           * @internal
           */
        function () {
            return this._fitBoundsDetails$.asObservable();
        };
        AgmMarker.prototype._updateFitBoundsDetails = function () {
            this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
        };
        AgmMarker.prototype._addEventListeners = function () {
            var _this = this;
            var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
                if (_this.openInfoWindow) {
                    _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
                }
                _this.markerClick.emit(_this);
            });
            this._observableSubscriptions.push(cs);
            var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
                _this.markerRightClick.emit(null);
            });
            this._observableSubscriptions.push(rc);
            var ds = this._markerManager.createEventObservable('dragend', this)
                .subscribe(function (e) {
                _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(ds);
            var mover = this._markerManager.createEventObservable('mouseover', this)
                .subscribe(function (e) {
                _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(mover);
            var mout = this._markerManager.createEventObservable('mouseout', this)
                .subscribe(function (e) {
                _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(mout);
        };
        /** @internal */
        /** @internal */
        AgmMarker.prototype.id = /** @internal */
        function () { return this._id; };
        /** @internal */
        /** @internal */
        AgmMarker.prototype.toString = /** @internal */
        function () { return 'AgmMarker-' + this._id.toString(); };
        /** @internal */
        /** @internal */
        AgmMarker.prototype.ngOnDestroy = /** @internal */
        function () {
            this._markerManager.deleteMarker(this);
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        AgmMarker.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-marker',
                        providers: [
                            { provide: FitBoundsAccessor, useExisting: core.forwardRef(function () { return AgmMarker; }) }
                        ],
                        inputs: [
                            'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                            'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation'
                        ],
                        outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
                    },] },
        ];
        /** @nocollapse */
        AgmMarker.ctorParameters = function () { return [
            { type: MarkerManager, },
        ]; };
        AgmMarker.propDecorators = {
            "latitude": [{ type: core.Input },],
            "longitude": [{ type: core.Input },],
            "title": [{ type: core.Input },],
            "label": [{ type: core.Input },],
            "draggable": [{ type: core.Input, args: ['markerDraggable',] },],
            "iconUrl": [{ type: core.Input },],
            "visible": [{ type: core.Input },],
            "openInfoWindow": [{ type: core.Input },],
            "opacity": [{ type: core.Input },],
            "zIndex": [{ type: core.Input },],
            "clickable": [{ type: core.Input, args: ['markerClickable',] },],
            "markerClick": [{ type: core.Output },],
            "markerRightClick": [{ type: core.Output },],
            "dragEnd": [{ type: core.Output },],
            "mouseOver": [{ type: core.Output },],
            "mouseOut": [{ type: core.Output },],
            "infoWindow": [{ type: core.ContentChildren, args: [AgmInfoWindow,] },],
        };
        return AgmMarker;
    }());

    var WindowRef = /** @class */ (function () {
        function WindowRef() {
        }
        WindowRef.prototype.getNativeWindow = function () { return window; };
        return WindowRef;
    }());
    var DocumentRef = /** @class */ (function () {
        function DocumentRef() {
        }
        DocumentRef.prototype.getNativeDocument = function () { return document; };
        return DocumentRef;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var GoogleMapsScriptProtocol;
    (function (GoogleMapsScriptProtocol) {
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
    })(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
    /**
     * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
     * LazyMapsAPILoaderConfig}.
     */
    var LAZY_MAPS_API_CONFIG = new core.InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
    var LazyMapsAPILoader = /** @class */ (function (_super) {
        __extends(LazyMapsAPILoader, _super);
        function LazyMapsAPILoader(config, w, d) {
            if (config === void 0) { config = null; }
            var _this = _super.call(this) || this;
            _this._SCRIPT_ID = 'agmGoogleMapsApiScript';
            _this.callbackName = "agmLazyMapsAPILoader";
            _this._config = config || {};
            _this._windowRef = w;
            _this._documentRef = d;
            return _this;
        }
        LazyMapsAPILoader.prototype.load = function () {
            var window = this._windowRef.getNativeWindow();
            if (window.google && window.google.maps) {
                // Google maps already loaded on the page.
                return Promise.resolve();
            }
            if (this._scriptLoadingPromise) {
                return this._scriptLoadingPromise;
            }
            // this can happen in HMR situations or Stackblitz.io editors.
            var scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
            if (scriptOnPage) {
                this._assignScriptLoadingPromise(scriptOnPage);
                return this._scriptLoadingPromise;
            }
            var script = this._documentRef.getNativeDocument().createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.defer = true;
            script.id = this._SCRIPT_ID;
            script.src = this._getScriptSrc(this.callbackName);
            this._assignScriptLoadingPromise(script);
            this._documentRef.getNativeDocument().body.appendChild(script);
            return this._scriptLoadingPromise;
        };
        LazyMapsAPILoader.prototype._assignScriptLoadingPromise = function (scriptElem) {
            var _this = this;
            this._scriptLoadingPromise = new Promise(function (resolve, reject) {
                _this._windowRef.getNativeWindow()[_this.callbackName] = function () {
                    resolve();
                };
                scriptElem.onerror = function (error) {
                    reject(error);
                };
            });
        };
        LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
            var protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
            var protocol;
            switch (protocolType) {
                case GoogleMapsScriptProtocol.AUTO:
                    protocol = '';
                    break;
                case GoogleMapsScriptProtocol.HTTP:
                    protocol = 'http:';
                    break;
                case GoogleMapsScriptProtocol.HTTPS:
                    protocol = 'https:';
                    break;
            }
            var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
            var queryParams = {
                v: this._config.apiVersion || '3',
                callback: callbackName,
                key: this._config.apiKey,
                client: this._config.clientId,
                channel: this._config.channel,
                libraries: this._config.libraries,
                region: this._config.region,
                language: this._config.language
            };
            var params = Object.keys(queryParams)
                .filter(function (k) { return queryParams[k] != null; })
                .filter(function (k) {
                // remove empty arrays
                return !Array.isArray(queryParams[k]) ||
                    (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
            })
                .map(function (k) {
                // join arrays as comma seperated strings
                var i = queryParams[k];
                if (Array.isArray(i)) {
                    return { key: k, value: i.join(',') };
                }
                return { key: k, value: queryParams[k] };
            })
                .map(function (entry) {
                return entry.key + "=" + entry.value;
            })
                .join('&');
            return protocol + "//" + hostAndPath + "?" + params;
        };
        LazyMapsAPILoader.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        LazyMapsAPILoader.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LAZY_MAPS_API_CONFIG,] },] },
            { type: WindowRef, },
            { type: DocumentRef, },
        ]; };
        return LazyMapsAPILoader;
    }(MapsAPILoader));

    /**
     * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
     * Tag.
     * It's important that the Google Maps API script gets loaded first on the page.
     */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends$1(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @license Angular v6.0.0
     * (c) 2010-2018 Google, Inc. https://angular.io/
     * License: MIT
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
     * `HttpResponse`.
     *
     * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
     * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
     * `HttpBackend`.
     *
     * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
     *
     *
     */
    var HttpHandler = /** @class */ (function () {
        function HttpHandler() {
        }
        return HttpHandler;
    }());
    /**
     * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
     *
     * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
     *
     * When injected, `HttpBackend` dispatches requests directly to the backend, without going
     * through the interceptor chain.
     *
     *
     */
    var HttpBackend = /** @class */ (function () {
        function HttpBackend() {
        }
        return HttpBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Immutable set of Http headers, with lazy parsing.
     *
     */
    var HttpHeaders = /** @class */ (function () {
        function HttpHeaders(headers) {
            var _this = this;
            /**
               * Internal map of lowercased header names to the normalized
               * form of the name (the form seen first).
               */
            this.normalizedNames = new Map();
            /**
               * Queued updates to be materialized the next initialization.
               */
            this.lazyUpdate = null;
            if (!headers) {
                this.headers = new Map();
            }
            else if (typeof headers === 'string') {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    headers.split('\n').forEach(function (line) {
                        var index = line.indexOf(':');
                        if (index > 0) {
                            var name_1 = line.slice(0, index);
                            var key = name_1.toLowerCase();
                            var value = line.slice(index + 1).trim();
                            _this.maybeSetNormalizedName(name_1, key);
                            if (_this.headers.has(key)) {
                                _this.headers.get(key).push(value);
                            }
                            else {
                                _this.headers.set(key, [value]);
                            }
                        }
                    });
                };
            }
            else {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    Object.keys(headers).forEach(function (name) {
                        var values = headers[name];
                        var key = name.toLowerCase();
                        if (typeof values === 'string') {
                            values = [values];
                        }
                        if (values.length > 0) {
                            _this.headers.set(key, values);
                            _this.maybeSetNormalizedName(name, key);
                        }
                    });
                };
            }
        }
        /**
         * Checks for existence of header by given name.
         */
        /**
           * Checks for existence of header by given name.
           */
        HttpHeaders.prototype.has = /**
           * Checks for existence of header by given name.
           */
        function (name) {
            this.init();
            return this.headers.has(name.toLowerCase());
        };
        /**
         * Returns first header that matches given name.
         */
        /**
           * Returns first header that matches given name.
           */
        HttpHeaders.prototype.get = /**
           * Returns first header that matches given name.
           */
        function (name) {
            this.init();
            var values = this.headers.get(name.toLowerCase());
            return values && values.length > 0 ? values[0] : null;
        };
        /**
         * Returns the names of the headers
         */
        /**
           * Returns the names of the headers
           */
        HttpHeaders.prototype.keys = /**
           * Returns the names of the headers
           */
        function () {
            this.init();
            return Array.from(this.normalizedNames.values());
        };
        /**
         * Returns list of header values for a given name.
         */
        /**
           * Returns list of header values for a given name.
           */
        HttpHeaders.prototype.getAll = /**
           * Returns list of header values for a given name.
           */
        function (name) {
            this.init();
            return this.headers.get(name.toLowerCase()) || null;
        };
        HttpHeaders.prototype.append = function (name, value) {
            return this.clone({ name: name, value: value, op: 'a' });
        };
        HttpHeaders.prototype.set = function (name, value) {
            return this.clone({ name: name, value: value, op: 's' });
        };
        HttpHeaders.prototype.delete = function (name, value) {
            return this.clone({ name: name, value: value, op: 'd' });
        };
        HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
            if (!this.normalizedNames.has(lcName)) {
                this.normalizedNames.set(lcName, name);
            }
        };
        HttpHeaders.prototype.init = function () {
            var _this = this;
            if (!!this.lazyInit) {
                if (this.lazyInit instanceof HttpHeaders) {
                    this.copyFrom(this.lazyInit);
                }
                else {
                    this.lazyInit();
                }
                this.lazyInit = null;
                if (!!this.lazyUpdate) {
                    this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                    this.lazyUpdate = null;
                }
            }
        };
        HttpHeaders.prototype.copyFrom = function (other) {
            var _this = this;
            other.init();
            Array.from(other.headers.keys()).forEach(function (key) {
                _this.headers.set(key, (other.headers.get(key)));
                _this.normalizedNames.set(key, (other.normalizedNames.get(key)));
            });
        };
        HttpHeaders.prototype.clone = function (update) {
            var clone = new HttpHeaders();
            clone.lazyInit =
                (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
            clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
            return clone;
        };
        HttpHeaders.prototype.applyUpdate = function (update) {
            var key = update.name.toLowerCase();
            switch (update.op) {
                case 'a':
                case 's':
                    var value = (update.value);
                    if (typeof value === 'string') {
                        value = [value];
                    }
                    if (value.length === 0) {
                        return;
                    }
                    this.maybeSetNormalizedName(update.name, key);
                    var base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                    base.push.apply(base, __spread(value));
                    this.headers.set(key, base);
                    break;
                case 'd':
                    var toDelete_1 = update.value;
                    if (!toDelete_1) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        var existing = this.headers.get(key);
                        if (!existing) {
                            return;
                        }
                        existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                        if (existing.length === 0) {
                            this.headers.delete(key);
                            this.normalizedNames.delete(key);
                        }
                        else {
                            this.headers.set(key, existing);
                        }
                    }
                    break;
            }
        };
        /**
         * @internal
         */
        /**
           * @internal
           */
        HttpHeaders.prototype.forEach = /**
           * @internal
           */
        function (fn) {
            var _this = this;
            this.init();
            Array.from(this.normalizedNames.keys())
                .forEach(function (key) { return fn((_this.normalizedNames.get(key)), (_this.headers.get(key))); });
        };
        return HttpHeaders;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
     * serialize and parse URL parameter keys and values.
     *
     *
     */
    var HttpUrlEncodingCodec = /** @class */ (function () {
        function HttpUrlEncodingCodec() {
        }
        HttpUrlEncodingCodec.prototype.encodeKey = function (k) { return standardEncoding(k); };
        HttpUrlEncodingCodec.prototype.encodeValue = function (v) { return standardEncoding(v); };
        HttpUrlEncodingCodec.prototype.decodeKey = function (k) { return decodeURIComponent(k); };
        HttpUrlEncodingCodec.prototype.decodeValue = function (v) { return decodeURIComponent(v); };
        return HttpUrlEncodingCodec;
    }());
    function paramParser(rawParams, codec) {
        var map$$1 = new Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&');
            params.forEach(function (param) {
                var eqIdx = param.indexOf('=');
                var _a = __read(eqIdx == -1 ?
                    [codec.decodeKey(param), ''] :
                    [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))], 2), key = _a[0], val = _a[1];
                var list = map$$1.get(key) || [];
                list.push(val);
                map$$1.set(key, list);
            });
        }
        return map$$1;
    }
    function standardEncoding(v) {
        return encodeURIComponent(v)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%2B/gi, '+')
            .replace(/%3D/gi, '=')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/');
    }
    /**
     * An HTTP request/response body that represents serialized parameters,
     * per the MIME type `application/x-www-form-urlencoded`.
     *
     * This class is immutable - all mutation operations return a new instance.
     *
     *
     */
    var HttpParams = /** @class */ (function () {
        function HttpParams(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.updates = null;
            this.cloneFrom = null;
            this.encoder = options.encoder || new HttpUrlEncodingCodec();
            if (!!options.fromString) {
                if (!!options.fromObject) {
                    throw new Error("Cannot specify both fromString and fromObject.");
                }
                this.map = paramParser(options.fromString, this.encoder);
            }
            else if (!!options.fromObject) {
                this.map = new Map();
                Object.keys(options.fromObject).forEach(function (key) {
                    var value = options.fromObject[key];
                    _this.map.set(key, Array.isArray(value) ? value : [value]);
                });
            }
            else {
                this.map = null;
            }
        }
        /**
         * Check whether the body has one or more values for the given parameter name.
         */
        /**
           * Check whether the body has one or more values for the given parameter name.
           */
        HttpParams.prototype.has = /**
           * Check whether the body has one or more values for the given parameter name.
           */
        function (param) {
            this.init();
            return this.map.has(param);
        };
        /**
         * Get the first value for the given parameter name, or `null` if it's not present.
         */
        /**
           * Get the first value for the given parameter name, or `null` if it's not present.
           */
        HttpParams.prototype.get = /**
           * Get the first value for the given parameter name, or `null` if it's not present.
           */
        function (param) {
            this.init();
            var res = this.map.get(param);
            return !!res ? res[0] : null;
        };
        /**
         * Get all values for the given parameter name, or `null` if it's not present.
         */
        /**
           * Get all values for the given parameter name, or `null` if it's not present.
           */
        HttpParams.prototype.getAll = /**
           * Get all values for the given parameter name, or `null` if it's not present.
           */
        function (param) {
            this.init();
            return this.map.get(param) || null;
        };
        /**
         * Get all the parameter names for this body.
         */
        /**
           * Get all the parameter names for this body.
           */
        HttpParams.prototype.keys = /**
           * Get all the parameter names for this body.
           */
        function () {
            this.init();
            return Array.from(this.map.keys());
        };
        /**
         * Construct a new body with an appended value for the given parameter name.
         */
        /**
           * Construct a new body with an appended value for the given parameter name.
           */
        HttpParams.prototype.append = /**
           * Construct a new body with an appended value for the given parameter name.
           */
        function (param, value) { return this.clone({ param: param, value: value, op: 'a' }); };
        /**
         * Construct a new body with a new value for the given parameter name.
         */
        /**
           * Construct a new body with a new value for the given parameter name.
           */
        HttpParams.prototype.set = /**
           * Construct a new body with a new value for the given parameter name.
           */
        function (param, value) { return this.clone({ param: param, value: value, op: 's' }); };
        /**
         * Construct a new body with either the given value for the given parameter
         * removed, if a value is given, or all values for the given parameter removed
         * if not.
         */
        /**
           * Construct a new body with either the given value for the given parameter
           * removed, if a value is given, or all values for the given parameter removed
           * if not.
           */
        HttpParams.prototype.delete = /**
           * Construct a new body with either the given value for the given parameter
           * removed, if a value is given, or all values for the given parameter removed
           * if not.
           */
        function (param, value) { return this.clone({ param: param, value: value, op: 'd' }); };
        /**
         * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
         * separated by `&`s.
         */
        /**
           * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
           * separated by `&`s.
           */
        HttpParams.prototype.toString = /**
           * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
           * separated by `&`s.
           */
        function () {
            var _this = this;
            this.init();
            return this.keys()
                .map(function (key) {
                var eKey = _this.encoder.encodeKey(key);
                return _this.map.get(key).map(function (value) { return eKey + '=' + _this.encoder.encodeValue(value); })
                    .join('&');
            })
                .join('&');
        };
        HttpParams.prototype.clone = function (update) {
            var clone = new HttpParams({ encoder: this.encoder });
            clone.cloneFrom = this.cloneFrom || this;
            clone.updates = (this.updates || []).concat([update]);
            return clone;
        };
        HttpParams.prototype.init = function () {
            var _this = this;
            if (this.map === null) {
                this.map = new Map();
            }
            if (this.cloneFrom !== null) {
                this.cloneFrom.init();
                this.cloneFrom.keys().forEach(function (key) { return _this.map.set(key, (_this.cloneFrom.map.get(key))); });
                this.updates.forEach(function (update) {
                    switch (update.op) {
                        case 'a':
                        case 's':
                            var base = (update.op === 'a' ? _this.map.get(update.param) : undefined) || [];
                            base.push((update.value));
                            _this.map.set(update.param, base);
                            break;
                        case 'd':
                            if (update.value !== undefined) {
                                var base_1 = _this.map.get(update.param) || [];
                                var idx = base_1.indexOf(update.value);
                                if (idx !== -1) {
                                    base_1.splice(idx, 1);
                                }
                                if (base_1.length > 0) {
                                    _this.map.set(update.param, base_1);
                                }
                                else {
                                    _this.map.delete(update.param);
                                }
                            }
                            else {
                                _this.map.delete(update.param);
                                break;
                            }
                    }
                });
                this.cloneFrom = null;
            }
        };
        return HttpParams;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Determine whether the given HTTP method may include a body.
     */
    function mightHaveBody(method) {
        switch (method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'OPTIONS':
            case 'JSONP':
                return false;
            default:
                return true;
        }
    }
    /**
     * Safely assert whether the given value is an ArrayBuffer.
     *
     * In some execution environments ArrayBuffer is not defined.
     */
    function isArrayBuffer(value) {
        return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
    }
    /**
     * Safely assert whether the given value is a Blob.
     *
     * In some execution environments Blob is not defined.
     */
    function isBlob(value) {
        return typeof Blob !== 'undefined' && value instanceof Blob;
    }
    /**
     * Safely assert whether the given value is a FormData instance.
     *
     * In some execution environments FormData is not defined.
     */
    function isFormData(value) {
        return typeof FormData !== 'undefined' && value instanceof FormData;
    }
    /**
     * An outgoing HTTP request with an optional typed body.
     *
     * `HttpRequest` represents an outgoing request, including URL, method,
     * headers, body, and other request configuration options. Instances should be
     * assumed to be immutable. To modify a `HttpRequest`, the `clone`
     * method should be used.
     *
     *
     */
    var HttpRequest = /** @class */ (function () {
        function HttpRequest(method, url, third, fourth) {
            this.url = url;
            /**
               * The request body, or `null` if one isn't set.
               *
               * Bodies are not enforced to be immutable, as they can include a reference to any
               * user-defined data type. However, interceptors should take care to preserve
               * idempotence by treating them as such.
               */
            this.body = null;
            /**
               * Whether this request should be made in a way that exposes progress events.
               *
               * Progress events are expensive (change detection runs on each event) and so
               * they should only be requested if the consumer intends to monitor them.
               */
            this.reportProgress = false;
            /**
               * Whether this request should be sent with outgoing credentials (cookies).
               */
            this.withCredentials = false;
            /**
               * The expected response type of the server.
               *
               * This is used to parse the response appropriately before returning it to
               * the requestee.
               */
            this.responseType = 'json';
            this.method = method.toUpperCase();
            // Next, need to figure out which argument holds the HttpRequestInit
            // options, if any.
            var options;
            // Check whether a body argument is expected. The only valid way to omit
            // the body argument is to use a known no-body method like GET.
            if (mightHaveBody(this.method) || !!fourth) {
                // Body is the third argument, options are the fourth.
                this.body = (third !== undefined) ? third : null;
                options = fourth;
            }
            else {
                // No body required, options are the third argument. The body stays null.
                options = third;
            }
            // If options have been passed, interpret them.
            if (options) {
                // Normalize reportProgress and withCredentials.
                this.reportProgress = !!options.reportProgress;
                this.withCredentials = !!options.withCredentials;
                // Override default response type of 'json' if one is provided.
                if (!!options.responseType) {
                    this.responseType = options.responseType;
                }
                // Override headers if they're provided.
                if (!!options.headers) {
                    this.headers = options.headers;
                }
                if (!!options.params) {
                    this.params = options.params;
                }
            }
            // If no headers have been passed in, construct a new HttpHeaders instance.
            if (!this.headers) {
                this.headers = new HttpHeaders();
            }
            // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
            if (!this.params) {
                this.params = new HttpParams();
                this.urlWithParams = url;
            }
            else {
                // Encode the parameters to a string in preparation for inclusion in the URL.
                var params = this.params.toString();
                if (params.length === 0) {
                    // No parameters, the visible URL is just the URL given at creation time.
                    this.urlWithParams = url;
                }
                else {
                    // Does the URL already have query parameters? Look for '?'.
                    var qIdx = url.indexOf('?');
                    // There are 3 cases to handle:
                    // 1) No existing parameters -> append '?' followed by params.
                    // 2) '?' exists and is followed by existing query string ->
                    //    append '&' followed by params.
                    // 3) '?' exists at the end of the url -> append params directly.
                    // This basically amounts to determining the character, if any, with
                    // which to join the URL and parameters.
                    var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                    this.urlWithParams = url + sep + params;
                }
            }
        }
        /**
         * Transform the free-form body into a serialized format suitable for
         * transmission to the server.
         */
        /**
           * Transform the free-form body into a serialized format suitable for
           * transmission to the server.
           */
        HttpRequest.prototype.serializeBody = /**
           * Transform the free-form body into a serialized format suitable for
           * transmission to the server.
           */
        function () {
            // If no body is present, no need to serialize it.
            if (this.body === null) {
                return null;
            }
            // Check whether the body is already in a serialized form. If so,
            // it can just be returned directly.
            if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
                typeof this.body === 'string') {
                return this.body;
            }
            // Check whether the body is an instance of HttpUrlEncodedParams.
            if (this.body instanceof HttpParams) {
                return this.body.toString();
            }
            // Check whether the body is an object or array, and serialize with JSON if so.
            if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
                Array.isArray(this.body)) {
                return JSON.stringify(this.body);
            }
            // Fall back on toString() for everything else.
            return this.body.toString();
        };
        /**
         * Examine the body and attempt to infer an appropriate MIME type
         * for it.
         *
         * If no such type can be inferred, this method will return `null`.
         */
        /**
           * Examine the body and attempt to infer an appropriate MIME type
           * for it.
           *
           * If no such type can be inferred, this method will return `null`.
           */
        HttpRequest.prototype.detectContentTypeHeader = /**
           * Examine the body and attempt to infer an appropriate MIME type
           * for it.
           *
           * If no such type can be inferred, this method will return `null`.
           */
        function () {
            // An empty body has no content type.
            if (this.body === null) {
                return null;
            }
            // FormData bodies rely on the browser's content type assignment.
            if (isFormData(this.body)) {
                return null;
            }
            // Blobs usually have their own content type. If it doesn't, then
            // no type can be inferred.
            if (isBlob(this.body)) {
                return this.body.type || null;
            }
            // Array buffers have unknown contents and thus no type can be inferred.
            if (isArrayBuffer(this.body)) {
                return null;
            }
            // Technically, strings could be a form of JSON data, but it's safe enough
            // to assume they're plain strings.
            if (typeof this.body === 'string') {
                return 'text/plain';
            }
            // `HttpUrlEncodedParams` has its own content-type.
            if (this.body instanceof HttpParams) {
                return 'application/x-www-form-urlencoded;charset=UTF-8';
            }
            // Arrays, objects, and numbers will be encoded as JSON.
            if (typeof this.body === 'object' || typeof this.body === 'number' ||
                Array.isArray(this.body)) {
                return 'application/json';
            }
            // No type could be inferred.
            return null;
        };
        HttpRequest.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            // For method, url, and responseType, take the current value unless
            // it is overridden in the update hash.
            var method = update.method || this.method;
            var url = update.url || this.url;
            var responseType = update.responseType || this.responseType;
            // The body is somewhat special - a `null` value in update.body means
            // whatever current body is present is being overridden with an empty
            // body, whereas an `undefined` value in update.body implies no
            // override.
            var body = (update.body !== undefined) ? update.body : this.body;
            // Carefully handle the boolean options to differentiate between
            // `false` and `undefined` in the update args.
            var withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
            var reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
            // Headers and params may be appended to if `setHeaders` or
            // `setParams` are used.
            var headers = update.headers || this.headers;
            var params = update.params || this.params;
            // Check whether the caller has asked to add headers.
            if (update.setHeaders !== undefined) {
                // Set every requested header.
                headers =
                    Object.keys(update.setHeaders)
                        .reduce(function (headers, name) { return headers.set(name, update.setHeaders[name]); }, headers);
            }
            // Check whether the caller has asked to set params.
            if (update.setParams) {
                // Set every requested param.
                params = Object.keys(update.setParams)
                    .reduce(function (params, param) { return params.set(param, update.setParams[param]); }, params);
            }
            // Finally, construct the new HttpRequest using the pieces from above.
            return new HttpRequest(method, url, body, {
                params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
            });
        };
        return HttpRequest;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Type enumeration for the different kinds of `HttpEvent`.
     *
     *
     */
    /**
     * Type enumeration for the different kinds of `HttpEvent`.
     *
     *
     */
    var HttpEventType;
    /**
     * Type enumeration for the different kinds of `HttpEvent`.
     *
     *
     */
    (function (HttpEventType) {
        /**
         * The request was sent out over the wire.
         */
        HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
        /**
         * An upload progress event was received.
         */
        HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
        /**
         * The response status code and headers were received.
         */
        HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
        /**
         * A download progress event was received.
         */
        HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
        /**
         * The full response including the body was received.
         */
        HttpEventType[HttpEventType["Response"] = 4] = "Response";
        /**
         * A custom event from an interceptor or a backend.
         */
        HttpEventType[HttpEventType["User"] = 5] = "User";
    })(HttpEventType || (HttpEventType = {}));
    /**
     * Base class for both `HttpResponse` and `HttpHeaderResponse`.
     *
     *
     */
    var HttpResponseBase = /** @class */ (function () {
        /**
         * Super-constructor for all responses.
         *
         * The single parameter accepted is an initialization hash. Any properties
         * of the response passed there will override the default values.
         */
        function HttpResponseBase(init, defaultStatus, defaultStatusText) {
            if (defaultStatus === void 0) { defaultStatus = 200; }
            if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
            // If the hash has values passed, use them to initialize the response.
            // Otherwise use the default values.
            this.headers = init.headers || new HttpHeaders();
            this.status = init.status !== undefined ? init.status : defaultStatus;
            this.statusText = init.statusText || defaultStatusText;
            this.url = init.url || null;
            // Cache the ok value to avoid defining a getter.
            this.ok = this.status >= 200 && this.status < 300;
        }
        return HttpResponseBase;
    }());
    /**
     * A partial HTTP response which only includes the status and header data,
     * but no response body.
     *
     * `HttpHeaderResponse` is a `HttpEvent` available on the response
     * event stream, only when progress events are requested.
     *
     *
     */
    var HttpHeaderResponse = /** @class */ (function (_super) {
        __extends$1(HttpHeaderResponse, _super);
        /**
         * Create a new `HttpHeaderResponse` with the given parameters.
         */
        function HttpHeaderResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.ResponseHeader;
            return _this;
        }
        /**
         * Copy this `HttpHeaderResponse`, overriding its contents with the
         * given parameter hash.
         */
        /**
           * Copy this `HttpHeaderResponse`, overriding its contents with the
           * given parameter hash.
           */
        HttpHeaderResponse.prototype.clone = /**
           * Copy this `HttpHeaderResponse`, overriding its contents with the
           * given parameter hash.
           */
        function (update) {
            if (update === void 0) { update = {}; }
            // Perform a straightforward initialization of the new HttpHeaderResponse,
            // overriding the current parameters with new ones if given.
            return new HttpHeaderResponse({
                headers: update.headers || this.headers,
                status: update.status !== undefined ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpHeaderResponse;
    }(HttpResponseBase));
    /**
     * A full HTTP response, including a typed response body (which may be `null`
     * if one was not returned).
     *
     * `HttpResponse` is a `HttpEvent` available on the response event
     * stream.
     *
     *
     */
    var HttpResponse = /** @class */ (function (_super) {
        __extends$1(HttpResponse, _super);
        /**
         * Construct a new `HttpResponse`.
         */
        function HttpResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.Response;
            _this.body = init.body !== undefined ? init.body : null;
            return _this;
        }
        HttpResponse.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            return new HttpResponse({
                body: (update.body !== undefined) ? update.body : this.body,
                headers: update.headers || this.headers,
                status: (update.status !== undefined) ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpResponse;
    }(HttpResponseBase));
    /**
     * A response that represents an error or failure, either from a
     * non-successful HTTP status, an error while executing the request,
     * or some other failure which occurred during the parsing of the response.
     *
     * Any error returned on the `Observable` response stream will be
     * wrapped in an `HttpErrorResponse` to provide additional context about
     * the state of the HTTP layer when the error occurred. The error property
     * will contain either a wrapped Error object or the error response returned
     * from the server.
     *
     *
     */
    var HttpErrorResponse = /** @class */ (function (_super) {
        __extends$1(HttpErrorResponse, _super);
        function HttpErrorResponse(init) {
            var _this = 
            // Initialize with a default status of 0 / Unknown Error.
            _super.call(this, init, 0, 'Unknown Error') || this;
            _this.name = 'HttpErrorResponse';
            /**
               * Errors are never okay, even when the status code is in the 2xx success range.
               */
            _this.ok = false;
            // If the response was successful, then this was a parse error. Otherwise, it was
            // a protocol-level failure of some sort. Either the request failed in transit
            // or the server returned an unsuccessful status code.
            if (_this.status >= 200 && _this.status < 300) {
                _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
            }
            else {
                _this.message =
                    "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
            }
            _this.error = init.error || null;
            return _this;
        }
        return HttpErrorResponse;
    }(HttpResponseBase));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Construct an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
     * the given `body`. Basically, this clones the object and adds the body.
     */
    function addBody(options, body) {
        return {
            body: body,
            headers: options.headers,
            observe: options.observe,
            params: options.params,
            reportProgress: options.reportProgress,
            responseType: options.responseType,
            withCredentials: options.withCredentials,
        };
    }
    /**
     * Perform HTTP requests.
     *
     * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
     * Each request method has multiple signatures, and the return type varies according to which
     * signature is called (mainly the values of `observe` and `responseType`).
     *
     *
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient(handler) {
            this.handler = handler;
        }
        /**
         * Constructs an `Observable` for a particular HTTP request that, when subscribed,
         * fires the request through the chain of registered interceptors and on to the
         * server.
         *
         * This method can be called in one of two ways. Either an `HttpRequest`
         * instance can be passed directly as the only parameter, or a method can be
         * passed as the first parameter, a string URL as the second, and an
         * options hash as the third.
         *
         * If a `HttpRequest` object is passed directly, an `Observable` of the
         * raw `HttpEvent` stream will be returned.
         *
         * If a request is instead built by providing a URL, the options object
         * determines the return type of `request()`. In addition to configuring
         * request parameters such as the outgoing headers and/or the body, the options
         * hash specifies two key pieces of information about the request: the
         * `responseType` and what to `observe`.
         *
         * The `responseType` value determines how a successful response body will be
         * parsed. If `responseType` is the default `json`, a type interface for the
         * resulting object may be passed as a type parameter to `request()`.
         *
         * The `observe` value determines the return type of `request()`, based on what
         * the consumer is interested in observing. A value of `events` will return an
         * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
         * including progress events by default. A value of `response` will return an
         * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
         * depends on the `responseType` and any optionally provided type parameter.
         * A value of `body` will return an `Observable<T>` with the same `T` body type.
         */
        /**
           * Constructs an `Observable` for a particular HTTP request that, when subscribed,
           * fires the request through the chain of registered interceptors and on to the
           * server.
           *
           * This method can be called in one of two ways. Either an `HttpRequest`
           * instance can be passed directly as the only parameter, or a method can be
           * passed as the first parameter, a string URL as the second, and an
           * options hash as the third.
           *
           * If a `HttpRequest` object is passed directly, an `Observable` of the
           * raw `HttpEvent` stream will be returned.
           *
           * If a request is instead built by providing a URL, the options object
           * determines the return type of `request()`. In addition to configuring
           * request parameters such as the outgoing headers and/or the body, the options
           * hash specifies two key pieces of information about the request: the
           * `responseType` and what to `observe`.
           *
           * The `responseType` value determines how a successful response body will be
           * parsed. If `responseType` is the default `json`, a type interface for the
           * resulting object may be passed as a type parameter to `request()`.
           *
           * The `observe` value determines the return type of `request()`, based on what
           * the consumer is interested in observing. A value of `events` will return an
           * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
           * including progress events by default. A value of `response` will return an
           * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
           * depends on the `responseType` and any optionally provided type parameter.
           * A value of `body` will return an `Observable<T>` with the same `T` body type.
           */
        HttpClient.prototype.request = /**
           * Constructs an `Observable` for a particular HTTP request that, when subscribed,
           * fires the request through the chain of registered interceptors and on to the
           * server.
           *
           * This method can be called in one of two ways. Either an `HttpRequest`
           * instance can be passed directly as the only parameter, or a method can be
           * passed as the first parameter, a string URL as the second, and an
           * options hash as the third.
           *
           * If a `HttpRequest` object is passed directly, an `Observable` of the
           * raw `HttpEvent` stream will be returned.
           *
           * If a request is instead built by providing a URL, the options object
           * determines the return type of `request()`. In addition to configuring
           * request parameters such as the outgoing headers and/or the body, the options
           * hash specifies two key pieces of information about the request: the
           * `responseType` and what to `observe`.
           *
           * The `responseType` value determines how a successful response body will be
           * parsed. If `responseType` is the default `json`, a type interface for the
           * resulting object may be passed as a type parameter to `request()`.
           *
           * The `observe` value determines the return type of `request()`, based on what
           * the consumer is interested in observing. A value of `events` will return an
           * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
           * including progress events by default. A value of `response` will return an
           * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
           * depends on the `responseType` and any optionally provided type parameter.
           * A value of `body` will return an `Observable<T>` with the same `T` body type.
           */
        function (first, url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var req;
            // Firstly, check whether the primary argument is an instance of `HttpRequest`.
            if (first instanceof HttpRequest) {
                // It is. The other arguments must be undefined (per the signatures) and can be
                // ignored.
                req = first;
            }
            else {
                // It's a string, so it represents a URL. Construct a request based on it,
                // and incorporate the remaining arguments (assuming GET unless a method is
                // provided.
                // Figure out the headers.
                var headers = undefined;
                if (options.headers instanceof HttpHeaders) {
                    headers = options.headers;
                }
                else {
                    headers = new HttpHeaders(options.headers);
                }
                // Sort out parameters.
                var params = undefined;
                if (!!options.params) {
                    if (options.params instanceof HttpParams) {
                        params = options.params;
                    }
                    else {
                        params = new HttpParams({ fromObject: options.params });
                    }
                }
                // Construct the request.
                req = new HttpRequest(first, (url), (options.body !== undefined ? options.body : null), {
                    headers: headers,
                    params: params,
                    reportProgress: options.reportProgress,
                    // By default, JSON is assumed to be returned for all calls.
                    responseType: options.responseType || 'json',
                    withCredentials: options.withCredentials,
                });
            }
            // Start with an Observable.of() the initial request, and run the handler (which
            // includes all interceptors) inside a concatMap(). This way, the handler runs
            // inside an Observable chain, which causes interceptors to be re-run on every
            // subscription (this also makes retries re-run the handler, including interceptors).
            var events$ = rxjs.of(req).pipe(operators.concatMap(function (req) { return _this.handler.handle(req); }));
            // If coming via the API signature which accepts a previously constructed HttpRequest,
            // the only option is to get the event stream. Otherwise, return the event stream if
            // that is what was requested.
            if (first instanceof HttpRequest || options.observe === 'events') {
                return events$;
            }
            // The requested stream contains either the full response or the body. In either
            // case, the first step is to filter the event stream to extract a stream of
            // responses(s).
            var res$ = events$.pipe(operators.filter(function (event) { return event instanceof HttpResponse; }));
            // Decide which stream to return.
            switch (options.observe || 'body') {
                case 'body':
                    // The requested stream is the body. Map the response stream to the response
                    // body. This could be done more simply, but a misbehaving interceptor might
                    // transform the response body into a different format and ignore the requested
                    // responseType. Guard against this by validating that the response is of the
                    // requested type.
                    switch (req.responseType) {
                        case 'arraybuffer':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is an ArrayBuffer.
                                if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                    throw new Error('Response is not an ArrayBuffer.');
                                }
                                return res.body;
                            }));
                        case 'blob':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is a Blob.
                                if (res.body !== null && !(res.body instanceof Blob)) {
                                    throw new Error('Response is not a Blob.');
                                }
                                return res.body;
                            }));
                        case 'text':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is a string.
                                if (res.body !== null && typeof res.body !== 'string') {
                                    throw new Error('Response is not a string.');
                                }
                                return res.body;
                            }));
                        case 'json':
                        default:
                            // No validation needed for JSON responses, as they can be of any type.
                            return res$.pipe(operators.map(function (res) { return res.body; }));
                    }
                case 'response':
                    // The response stream was requested directly, so return it.
                    return res$;
                default:
                    // Guard against new future observe types being added.
                    throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
            }
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * DELETE request to be executed on the server. See the individual overloads for
         * details of `delete()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * DELETE request to be executed on the server. See the individual overloads for
           * details of `delete()`'s return type based on the provided options.
           */
        HttpClient.prototype.delete = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * DELETE request to be executed on the server. See the individual overloads for
           * details of `delete()`'s return type based on the provided options.
           */
        function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('DELETE', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * GET request to be executed on the server. See the individual overloads for
         * details of `get()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * GET request to be executed on the server. See the individual overloads for
           * details of `get()`'s return type based on the provided options.
           */
        HttpClient.prototype.get = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * GET request to be executed on the server. See the individual overloads for
           * details of `get()`'s return type based on the provided options.
           */
        function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('GET', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * HEAD request to be executed on the server. See the individual overloads for
         * details of `head()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * HEAD request to be executed on the server. See the individual overloads for
           * details of `head()`'s return type based on the provided options.
           */
        HttpClient.prototype.head = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * HEAD request to be executed on the server. See the individual overloads for
           * details of `head()`'s return type based on the provided options.
           */
        function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('HEAD', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause a request
         * with the special method `JSONP` to be dispatched via the interceptor pipeline.
         *
         * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
         * If no such interceptor is reached, then the `JSONP` request will likely be
         * rejected by the configured backend.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause a request
           * with the special method `JSONP` to be dispatched via the interceptor pipeline.
           *
           * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
           * If no such interceptor is reached, then the `JSONP` request will likely be
           * rejected by the configured backend.
           */
        HttpClient.prototype.jsonp = /**
           * Constructs an `Observable` which, when subscribed, will cause a request
           * with the special method `JSONP` to be dispatched via the interceptor pipeline.
           *
           * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
           * If no such interceptor is reached, then the `JSONP` request will likely be
           * rejected by the configured backend.
           */
        function (url, callbackParam) {
            return this.request('JSONP', url, {
                params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
                observe: 'body',
                responseType: 'json',
            });
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * OPTIONS request to be executed on the server. See the individual overloads for
         * details of `options()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * OPTIONS request to be executed on the server. See the individual overloads for
           * details of `options()`'s return type based on the provided options.
           */
        HttpClient.prototype.options = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * OPTIONS request to be executed on the server. See the individual overloads for
           * details of `options()`'s return type based on the provided options.
           */
        function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('OPTIONS', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * PATCH request to be executed on the server. See the individual overloads for
         * details of `patch()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * PATCH request to be executed on the server. See the individual overloads for
           * details of `patch()`'s return type based on the provided options.
           */
        HttpClient.prototype.patch = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * PATCH request to be executed on the server. See the individual overloads for
           * details of `patch()`'s return type based on the provided options.
           */
        function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PATCH', url, addBody(options, body));
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * POST request to be executed on the server. See the individual overloads for
         * details of `post()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * POST request to be executed on the server. See the individual overloads for
           * details of `post()`'s return type based on the provided options.
           */
        HttpClient.prototype.post = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * POST request to be executed on the server. See the individual overloads for
           * details of `post()`'s return type based on the provided options.
           */
        function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('POST', url, addBody(options, body));
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * POST request to be executed on the server. See the individual overloads for
         * details of `post()`'s return type based on the provided options.
         */
        /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * POST request to be executed on the server. See the individual overloads for
           * details of `post()`'s return type based on the provided options.
           */
        HttpClient.prototype.put = /**
           * Constructs an `Observable` which, when subscribed, will cause the configured
           * POST request to be executed on the server. See the individual overloads for
           * details of `post()`'s return type based on the provided options.
           */
        function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PUT', url, addBody(options, body));
        };
        HttpClient.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpClient.ctorParameters = function () { return [
            { type: HttpHandler, },
        ]; };
        return HttpClient;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
     *
     *
     */
    var HttpInterceptorHandler = /** @class */ (function () {
        function HttpInterceptorHandler(next, interceptor) {
            this.next = next;
            this.interceptor = interceptor;
        }
        HttpInterceptorHandler.prototype.handle = function (req) {
            return this.interceptor.intercept(req, this.next);
        };
        return HttpInterceptorHandler;
    }());
    /**
     * A multi-provider token which represents the array of `HttpInterceptor`s that
     * are registered.
     *
     *
     */
    var HTTP_INTERCEPTORS = new core.InjectionToken('HTTP_INTERCEPTORS');
    var NoopInterceptor = /** @class */ (function () {
        function NoopInterceptor() {
        }
        NoopInterceptor.prototype.intercept = function (req, next) {
            return next.handle(req);
        };
        NoopInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NoopInterceptor.ctorParameters = function () { return []; };
        return NoopInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSSI_PREFIX = /^\)\]\}',?\n/;
    /**
     * Determine an appropriate URL for the response, by checking either
     * XMLHttpRequest.responseURL or the X-Request-URL header.
     */
    function getResponseUrl(xhr) {
        if ('responseURL' in xhr && xhr.responseURL) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return null;
    }
    /**
     * A wrapper around the `XMLHttpRequest` constructor.
     *
     *
     */
    var XhrFactory = /** @class */ (function () {
        function XhrFactory() {
        }
        return XhrFactory;
    }());
    /**
     * A factory for @{link HttpXhrBackend} that uses the `XMLHttpRequest` browser API.
     *
     *
     */
    var BrowserXhr = /** @class */ (function () {
        function BrowserXhr() {
        }
        BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
        BrowserXhr.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BrowserXhr.ctorParameters = function () { return []; };
        return BrowserXhr;
    }());
    /**
     * An `HttpBackend` which uses the XMLHttpRequest API to send
     * requests to a backend server.
     *
     *
     */
    var HttpXhrBackend = /** @class */ (function () {
        function HttpXhrBackend(xhrFactory) {
            this.xhrFactory = xhrFactory;
        }
        /**
         * Process a request and return a stream of response events.
         */
        /**
           * Process a request and return a stream of response events.
           */
        HttpXhrBackend.prototype.handle = /**
           * Process a request and return a stream of response events.
           */
        function (req) {
            var _this = this;
            // Quick check to give a better error message when a user attempts to use
            // HttpClient.jsonp() without installing the JsonpClientModule
            if (req.method === 'JSONP') {
                throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
            }
            // Everything happens on Observable subscription.
            return new rxjs.Observable(function (observer) {
                // Start by setting up the XHR object with request method, URL, and withCredentials flag.
                var xhr = _this.xhrFactory.build();
                xhr.open(req.method, req.urlWithParams);
                if (!!req.withCredentials) {
                    xhr.withCredentials = true;
                }
                // Add all the requested headers.
                req.headers.forEach(function (name, values) { return xhr.setRequestHeader(name, values.join(',')); });
                // Add an Accept header if one isn't present already.
                if (!req.headers.has('Accept')) {
                    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
                }
                // Auto-detect the Content-Type header if one isn't present already.
                if (!req.headers.has('Content-Type')) {
                    var detectedType = req.detectContentTypeHeader();
                    // Sometimes Content-Type detection fails.
                    if (detectedType !== null) {
                        xhr.setRequestHeader('Content-Type', detectedType);
                    }
                }
                // Set the responseType if one was requested.
                if (req.responseType) {
                    var responseType = req.responseType.toLowerCase();
                    // JSON responses need to be processed as text. This is because if the server
                    // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                    // xhr.response will be null, and xhr.responseText cannot be accessed to
                    // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                    // is parsed by first requesting text and then applying JSON.parse.
                    xhr.responseType = ((responseType !== 'json') ? responseType : 'text');
                }
                // Serialize the request body if one is present. If not, this will be set to null.
                var reqBody = req.serializeBody();
                // If progress events are enabled, response headers will be delivered
                // in two events - the HttpHeaderResponse event and the full HttpResponse
                // event. However, since response headers don't change in between these
                // two events, it doesn't make sense to parse them twice. So headerResponse
                // caches the data extracted from the response whenever it's first parsed,
                // to ensure parsing isn't duplicated.
                var headerResponse = null;
                // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
                // state, and memoizes it into headerResponse.
                var partialFromXhr = function () {
                    if (headerResponse !== null) {
                        return headerResponse;
                    }
                    // Read status and normalize an IE9 bug (http://bugs.jquery.com/ticket/1450).
                    var status = xhr.status === 1223 ? 204 : xhr.status;
                    var statusText = xhr.statusText || 'OK';
                    // Parse headers from XMLHttpRequest - this step is lazy.
                    var headers = new HttpHeaders(xhr.getAllResponseHeaders());
                    // Read the response URL from the XMLHttpResponse instance and fall back on the
                    // request URL.
                    var url = getResponseUrl(xhr) || req.url;
                    // Construct the HttpHeaderResponse and memoize it.
                    headerResponse = new HttpHeaderResponse({ headers: headers, status: status, statusText: statusText, url: url });
                    return headerResponse;
                };
                // Next, a few closures are defined for the various events which XMLHttpRequest can
                // emit. This allows them to be unregistered as event listeners later.
                // First up is the load event, which represents a response being fully available.
                var onLoad = function () {
                    // Read response state from the memoized partial data.
                    var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url;
                    // The body will be read out if present.
                    var body = null;
                    if (status !== 204) {
                        // Use XMLHttpRequest.response if set, responseText otherwise.
                        body = (typeof xhr.response === 'undefined') ? xhr.responseText : xhr.response;
                    }
                    // Normalize another potential bug (this one comes from CORS).
                    if (status === 0) {
                        status = !!body ? 200 : 0;
                    }
                    // ok determines whether the response will be transmitted on the event or
                    // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                    // but a successful status code can still result in an error if the user
                    // asked for JSON data and the body cannot be parsed as such.
                    var ok = status >= 200 && status < 300;
                    // Check whether the body needs to be parsed as JSON (in many cases the browser
                    // will have done that already).
                    if (req.responseType === 'json' && typeof body === 'string') {
                        // Save the original body, before attempting XSSI prefix stripping.
                        var originalBody = body;
                        body = body.replace(XSSI_PREFIX, '');
                        try {
                            // Attempt the parse. If it fails, a parse error should be delivered to the user.
                            body = body !== '' ? JSON.parse(body) : null;
                        }
                        catch (error) {
                            // Since the JSON.parse failed, it's reasonable to assume this might not have been a
                            // JSON response. Restore the original body (including any XSSI prefix) to deliver
                            // a better error response.
                            body = originalBody;
                            // If this was an error request to begin with, leave it as a string, it probably
                            // just isn't JSON. Otherwise, deliver the parsing error to the user.
                            if (ok) {
                                // Even though the response status was 2xx, this is still an error.
                                ok = false;
                                // The parse error contains the text of the body that failed to parse.
                                body = { error: error, text: body };
                            }
                        }
                    }
                    if (ok) {
                        // A successful response is delivered on the event stream.
                        observer.next(new HttpResponse({
                            body: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                        // The full body has been received and delivered, no further events
                        // are possible. This request is complete.
                        observer.complete();
                    }
                    else {
                        // An unsuccessful request is delivered on the error channel.
                        observer.error(new HttpErrorResponse({
                            // The error in this case is the response body (error from the server).
                            error: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                    }
                };
                // The onError callback is called when something goes wrong at the network level.
                // Connection timeout, DNS error, offline, etc. These are actual errors, and are
                // transmitted on the error channel.
                var onError = function (error) {
                    var res = new HttpErrorResponse({
                        error: error,
                        status: xhr.status || 0,
                        statusText: xhr.statusText || 'Unknown Error',
                    });
                    observer.error(res);
                };
                // The sentHeaders flag tracks whether the HttpResponseHeaders event
                // has been sent on the stream. This is necessary to track if progress
                // is enabled since the event will be sent on only the first download
                // progerss event.
                var sentHeaders = false;
                // The download progress event handler, which is only registered if
                // progress events are enabled.
                var onDownProgress = function (event) {
                    // Send the HttpResponseHeaders event if it hasn't been sent already.
                    if (!sentHeaders) {
                        observer.next(partialFromXhr());
                        sentHeaders = true;
                    }
                    // Start building the download progress event to deliver on the response
                    // event stream.
                    var progressEvent = {
                        type: HttpEventType.DownloadProgress,
                        loaded: event.loaded,
                    };
                    // Set the total number of bytes in the event if it's available.
                    if (event.lengthComputable) {
                        progressEvent.total = event.total;
                    }
                    // If the request was for text content and a partial response is
                    // available on XMLHttpRequest, include it in the progress event
                    // to allow for streaming reads.
                    if (req.responseType === 'text' && !!xhr.responseText) {
                        progressEvent.partialText = xhr.responseText;
                    }
                    // Finally, fire the event.
                    observer.next(progressEvent);
                };
                // The upload progress event handler, which is only registered if
                // progress events are enabled.
                var onUpProgress = function (event) {
                    // Upload progress events are simpler. Begin building the progress
                    // event.
                    var progress = {
                        type: HttpEventType.UploadProgress,
                        loaded: event.loaded,
                    };
                    // If the total number of bytes being uploaded is available, include
                    // it.
                    if (event.lengthComputable) {
                        progress.total = event.total;
                    }
                    // Send the event.
                    observer.next(progress);
                };
                // By default, register for load and error events.
                xhr.addEventListener('load', onLoad);
                xhr.addEventListener('error', onError);
                // Progress events are only enabled if requested.
                if (req.reportProgress) {
                    // Download progress is always enabled if requested.
                    xhr.addEventListener('progress', onDownProgress);
                    // Upload progress depends on whether there is a body to upload.
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.addEventListener('progress', onUpProgress);
                    }
                }
                // Fire the request, and notify the event stream that it was fired.
                xhr.send(reqBody);
                observer.next({ type: HttpEventType.Sent });
                // This is the return from the Observable function, which is the
                // request cancellation handler.
                return function () {
                    // On a cancellation, remove all registered event listeners.
                    xhr.removeEventListener('error', onError);
                    xhr.removeEventListener('load', onLoad);
                    if (req.reportProgress) {
                        xhr.removeEventListener('progress', onDownProgress);
                        if (reqBody !== null && xhr.upload) {
                            xhr.upload.removeEventListener('progress', onUpProgress);
                        }
                    }
                    // Finally, abort the in-flight request.
                    xhr.abort();
                };
            });
        };
        HttpXhrBackend.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpXhrBackend.ctorParameters = function () { return [
            { type: XhrFactory, },
        ]; };
        return HttpXhrBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSRF_COOKIE_NAME = new core.InjectionToken('XSRF_COOKIE_NAME');
    var XSRF_HEADER_NAME = new core.InjectionToken('XSRF_HEADER_NAME');
    /**
     * Retrieves the current XSRF token to use with the next outgoing request.
     *
     *
     */
    var HttpXsrfTokenExtractor = /** @class */ (function () {
        function HttpXsrfTokenExtractor() {
        }
        return HttpXsrfTokenExtractor;
    }());
    /**
     * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
     */
    var HttpXsrfCookieExtractor = /** @class */ (function () {
        function HttpXsrfCookieExtractor(doc, platform, cookieName) {
            this.doc = doc;
            this.platform = platform;
            this.cookieName = cookieName;
            this.lastCookieString = '';
            this.lastToken = null;
            /**
               * @internal for testing
               */
            this.parseCount = 0;
        }
        HttpXsrfCookieExtractor.prototype.getToken = function () {
            if (this.platform === 'server') {
                return null;
            }
            var cookieString = this.doc.cookie || '';
            if (cookieString !== this.lastCookieString) {
                this.parseCount++;
                this.lastToken = common.ɵparseCookieValue(cookieString, this.cookieName);
                this.lastCookieString = cookieString;
            }
            return this.lastToken;
        };
        HttpXsrfCookieExtractor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpXsrfCookieExtractor.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
            { type: undefined, decorators: [{ type: core.Inject, args: [XSRF_COOKIE_NAME,] },] },
        ]; };
        return HttpXsrfCookieExtractor;
    }());
    /**
     * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
     */
    var HttpXsrfInterceptor = /** @class */ (function () {
        function HttpXsrfInterceptor(tokenService, headerName) {
            this.tokenService = tokenService;
            this.headerName = headerName;
        }
        HttpXsrfInterceptor.prototype.intercept = function (req, next) {
            var lcUrl = req.url.toLowerCase();
            // Skip both non-mutating requests and absolute URLs.
            // Non-mutating requests don't require a token, and absolute URLs require special handling
            // anyway as the cookie set
            // on our origin is not the same as the token expected by another origin.
            if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
                lcUrl.startsWith('https://')) {
                return next.handle(req);
            }
            var token = this.tokenService.getToken();
            // Be careful not to overwrite an existing header of the same name.
            if (token !== null && !req.headers.has(this.headerName)) {
                req = req.clone({ headers: req.headers.set(this.headerName, token) });
            }
            return next.handle(req);
        };
        HttpXsrfInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpXsrfInterceptor.ctorParameters = function () { return [
            { type: HttpXsrfTokenExtractor, },
            { type: undefined, decorators: [{ type: core.Inject, args: [XSRF_HEADER_NAME,] },] },
        ]; };
        return HttpXsrfInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An `HttpHandler` that applies a bunch of `HttpInterceptor`s
     * to a request before passing it to the given `HttpBackend`.
     *
     * The interceptors are loaded lazily from the injector, to allow
     * interceptors to themselves inject classes depending indirectly
     * on `HttpInterceptingHandler` itself.
     */
    var HttpInterceptingHandler = /** @class */ (function () {
        function HttpInterceptingHandler(backend, injector) {
            this.backend = backend;
            this.injector = injector;
            this.chain = null;
        }
        HttpInterceptingHandler.prototype.handle = function (req) {
            if (this.chain === null) {
                var interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
                this.chain = interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, this.backend);
            }
            return this.chain.handle(req);
        };
        HttpInterceptingHandler.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HttpInterceptingHandler.ctorParameters = function () { return [
            { type: HttpBackend, },
            { type: core.Injector, },
        ]; };
        return HttpInterceptingHandler;
    }());
    /**
     * `NgModule` which adds XSRF protection support to outgoing requests.
     *
     * Provided the server supports a cookie-based XSRF protection system, this
     * module can be used directly to configure XSRF protection with the correct
     * cookie and header names.
     *
     * If no such names are provided, the default is to use `X-XSRF-TOKEN` for
     * the header name and `XSRF-TOKEN` for the cookie name.
     *
     *
     */
    var HttpClientXsrfModule = /** @class */ (function () {
        function HttpClientXsrfModule() {
        }
        /**
         * Disable the default XSRF protection.
         */
        /**
           * Disable the default XSRF protection.
           */
        HttpClientXsrfModule.disable = /**
           * Disable the default XSRF protection.
           */
        function () {
            return {
                ngModule: HttpClientXsrfModule,
                providers: [
                    { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
                ],
            };
        };
        /**
         * Configure XSRF protection to use the given cookie name or header name,
         * or the default names (as described above) if not provided.
         */
        /**
           * Configure XSRF protection to use the given cookie name or header name,
           * or the default names (as described above) if not provided.
           */
        HttpClientXsrfModule.withOptions = /**
           * Configure XSRF protection to use the given cookie name or header name,
           * or the default names (as described above) if not provided.
           */
        function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: HttpClientXsrfModule,
                providers: [
                    options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                    options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
                ],
            };
        };
        HttpClientXsrfModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            HttpXsrfInterceptor,
                            { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                            { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                            { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                            { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                        ],
                    },] }
        ];
        /** @nocollapse */
        HttpClientXsrfModule.ctorParameters = function () { return []; };
        return HttpClientXsrfModule;
    }());
    /**
     * `NgModule` which provides the `HttpClient` and associated services.
     *
     * Interceptors can be added to the chain behind `HttpClient` by binding them
     * to the multiprovider for `HTTP_INTERCEPTORS`.
     *
     *
     */
    var HttpClientModule = /** @class */ (function () {
        function HttpClientModule() {
        }
        HttpClientModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            HttpClientXsrfModule.withOptions({
                                cookieName: 'XSRF-TOKEN',
                                headerName: 'X-XSRF-TOKEN',
                            }),
                        ],
                        providers: [
                            HttpClient,
                            { provide: HttpHandler, useClass: HttpInterceptingHandler },
                            HttpXhrBackend,
                            { provide: HttpBackend, useExisting: HttpXhrBackend },
                            BrowserXhr,
                            { provide: XhrFactory, useExisting: BrowserXhr },
                        ],
                    },] }
        ];
        /** @nocollapse */
        HttpClientModule.ctorParameters = function () { return []; };
        return HttpClientModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
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
            this.onChange = new core.EventEmitter();
            // Direction response for the new request
            this.onResponse = new core.EventEmitter();
            this.sendInfoWindow = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: 'agm-direction',
                    },] }
        ];
        /** @nocollapse */
        AgmDirection.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper, },
            { type: HttpClient, },
        ]; };
        AgmDirection.propDecorators = {
            "origin": [{ type: core.Input },],
            "destination": [{ type: core.Input },],
            "travelMode": [{ type: core.Input },],
            "transitOptions": [{ type: core.Input },],
            "drivingOptions": [{ type: core.Input },],
            "waypoints": [{ type: core.Input },],
            "optimizeWaypoints": [{ type: core.Input },],
            "provideRouteAlternatives": [{ type: core.Input },],
            "avoidHighways": [{ type: core.Input },],
            "avoidTolls": [{ type: core.Input },],
            "renderOptions": [{ type: core.Input },],
            "visible": [{ type: core.Input },],
            "panel": [{ type: core.Input },],
            "markerOptions": [{ type: core.Input },],
            "infoWindow": [{ type: core.Input },],
            "renderRoute": [{ type: core.Input },],
            "onChange": [{ type: core.Output },],
            "onResponse": [{ type: core.Output },],
            "sendInfoWindow": [{ type: core.Output },],
        };
        return AgmDirection;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AgmDirectionModule = /** @class */ (function () {
        function AgmDirectionModule() {
        }
        /**
         * @return {?}
         */
        AgmDirectionModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: AgmDirectionModule,
            };
        };
        AgmDirectionModule.decorators = [
            { type: core.NgModule, args: [{
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
        return AgmDirectionModule;
    }());

    exports.AgmDirectionModule = AgmDirectionModule;
    exports.ɵa = AgmDirection;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=agm-direction.umd.js.map

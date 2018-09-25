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

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

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
    var _DOM = (null);
    function getDOM() {
        return _DOM;
    }

    function setRootDomAdapter(adapter) {
        if (!_DOM) {
            _DOM = adapter;
        }
    }
    /* tslint:disable:requireParameterType */
    /**
     * Provides DOM operations in an environment-agnostic way.
     *
     * @security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    var DomAdapter = /** @class */ (function () {
        function DomAdapter() {
            this.resourceLoaderType = null;
        }
        Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
            /**
             * Maps attribute names to their corresponding property names for cases
             * where attribute name doesn't match property name.
             */
            get: /**
               * Maps attribute names to their corresponding property names for cases
               * where attribute name doesn't match property name.
               */
            function () { return this._attrToPropMap; },
            set: function (value) { this._attrToPropMap = value; },
            enumerable: true,
            configurable: true
        });
        return DomAdapter;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Provides DOM operations in any browser environment.
     *
     * @security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    var GenericBrowserDomAdapter = /** @class */ (function (_super) {
        __extends$1(GenericBrowserDomAdapter, _super);
        function GenericBrowserDomAdapter() {
            var _this = _super.call(this) || this;
            _this._animationPrefix = null;
            _this._transitionEnd = null;
            try {
                var element_1 = _this.createElement('div', document);
                if (_this.getStyle(element_1, 'animationName') != null) {
                    _this._animationPrefix = '';
                }
                else {
                    var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                    for (var i = 0; i < domPrefixes.length; i++) {
                        if (_this.getStyle(element_1, domPrefixes[i] + 'AnimationName') != null) {
                            _this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                            break;
                        }
                    }
                }
                var transEndEventNames_1 = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };
                Object.keys(transEndEventNames_1).forEach(function (key) {
                    if (_this.getStyle(element_1, key) != null) {
                        _this._transitionEnd = transEndEventNames_1[key];
                    }
                });
            }
            catch (e) {
                _this._animationPrefix = null;
                _this._transitionEnd = null;
            }
            return _this;
        }
        GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
        GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
            el.href = href == null ? baseUrl : baseUrl + '/../' + href;
        };
        GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
        GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
            return typeof document.body.createShadowRoot === 'function';
        };
        GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () { return this._animationPrefix ? this._animationPrefix : ''; };
        GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return this._transitionEnd ? this._transitionEnd : ''; };
        GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
            return this._animationPrefix != null && this._transitionEnd != null;
        };
        return GenericBrowserDomAdapter;
    }(DomAdapter));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var _attrToPropMap = {
        'class': 'className',
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex',
    };
    var DOM_KEY_LOCATION_NUMPAD = 3;
    // Map to convert some key or keyIdentifier values to what will be returned by getEventKey
    var _keyMap = {
        // The following values are here for cross-browser compatibility and to match the W3C standard
        // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
        '\b': 'Backspace',
        '\t': 'Tab',
        '\x7F': 'Delete',
        '\x1B': 'Escape',
        'Del': 'Delete',
        'Esc': 'Escape',
        'Left': 'ArrowLeft',
        'Right': 'ArrowRight',
        'Up': 'ArrowUp',
        'Down': 'ArrowDown',
        'Menu': 'ContextMenu',
        'Scroll': 'ScrollLock',
        'Win': 'OS'
    };
    // There is a bug in Chrome for numeric keypad keys:
    // https://code.google.com/p/chromium/issues/detail?id=155654
    // 1, 2, 3 ... are reported as A, B, C ...
    var _chromeNumKeyPadMap = {
        'A': '1',
        'B': '2',
        'C': '3',
        'D': '4',
        'E': '5',
        'F': '6',
        'G': '7',
        'H': '8',
        'I': '9',
        'J': '*',
        'K': '+',
        'M': '-',
        'N': '.',
        'O': '/',
        '\x60': '0',
        '\x90': 'NumLock'
    };
    var nodeContains;
    if (core.ɵglobal['Node']) {
        nodeContains = core.ɵglobal['Node'].prototype.contains || function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        };
    }
    /**
     * A `DomAdapter` powered by full browser DOM APIs.
     *
     * @security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    /* tslint:disable:requireParameterType no-console */
    var BrowserDomAdapter = /** @class */ (function (_super) {
        __extends$1(BrowserDomAdapter, _super);
        function BrowserDomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error('parse not implemented'); };
        BrowserDomAdapter.makeCurrent = function () { setRootDomAdapter(new BrowserDomAdapter()); };
        BrowserDomAdapter.prototype.hasProperty = function (element, name) { return name in element; };
        BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
        BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
        BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
            (_a = el)[methodName].apply(_a, __spread(args));
            var _a;
        };
        // TODO(tbosch): move this into a separate environment class once we have it
        // TODO(tbosch): move this into a separate environment class once we have it
        BrowserDomAdapter.prototype.logError = 
        // TODO(tbosch): move this into a separate environment class once we have it
        function (error) {
            if (window.console) {
                if (console.error) {
                    console.error(error);
                }
                else {
                    console.log(error);
                }
            }
        };
        BrowserDomAdapter.prototype.log = function (error) {
            if (window.console) {
                window.console.log && window.console.log(error);
            }
        };
        BrowserDomAdapter.prototype.logGroup = function (error) {
            if (window.console) {
                window.console.group && window.console.group(error);
            }
        };
        BrowserDomAdapter.prototype.logGroupEnd = function () {
            if (window.console) {
                window.console.groupEnd && window.console.groupEnd();
            }
        };
        Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
            get: function () { return _attrToPropMap; },
            enumerable: true,
            configurable: true
        });
        BrowserDomAdapter.prototype.contains = function (nodeA, nodeB) { return nodeContains.call(nodeA, nodeB); };
        BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
        BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
        BrowserDomAdapter.prototype.on = function (el, evt, listener) { el.addEventListener(evt, listener, false); };
        BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
            el.addEventListener(evt, listener, false);
            // Needed to follow Dart's subscription semantic, until fix of
            // https://code.google.com/p/dart/issues/detail?id=17406
            return function () { el.removeEventListener(evt, listener, false); };
        };
        BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
        BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
            var evt = this.getDefaultDocument().createEvent('MouseEvent');
            evt.initEvent(eventType, true, true);
            return evt;
        };
        BrowserDomAdapter.prototype.createEvent = function (eventType) {
            var evt = this.getDefaultDocument().createEvent('Event');
            evt.initEvent(eventType, true, true);
            return evt;
        };
        BrowserDomAdapter.prototype.preventDefault = function (evt) {
            evt.preventDefault();
            evt.returnValue = false;
        };
        BrowserDomAdapter.prototype.isPrevented = function (evt) {
            return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
        };
        BrowserDomAdapter.prototype.getInnerHTML = function (el) { return el.innerHTML; };
        BrowserDomAdapter.prototype.getTemplateContent = function (el) {
            return 'content' in el && this.isTemplateElement(el) ? el.content : null;
        };
        BrowserDomAdapter.prototype.getOuterHTML = function (el) { return el.outerHTML; };
        BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
        BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
        BrowserDomAdapter.prototype.type = function (node) { return node.type; };
        BrowserDomAdapter.prototype.content = function (node) {
            if (this.hasProperty(node, 'content')) {
                return node.content;
            }
            else {
                return node;
            }
        };
        BrowserDomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
        BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
        BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
        BrowserDomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
        BrowserDomAdapter.prototype.childNodesAsList = function (el) {
            var childNodes = el.childNodes;
            var res = new Array(childNodes.length);
            for (var i = 0; i < childNodes.length; i++) {
                res[i] = childNodes[i];
            }
            return res;
        };
        BrowserDomAdapter.prototype.clearNodes = function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        };
        BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
        BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
        BrowserDomAdapter.prototype.replaceChild = function (el, newChild, oldChild) { el.replaceChild(newChild, oldChild); };
        BrowserDomAdapter.prototype.remove = function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return node;
        };
        BrowserDomAdapter.prototype.insertBefore = function (parent, ref, node) { parent.insertBefore(node, ref); };
        BrowserDomAdapter.prototype.insertAllBefore = function (parent, ref, nodes) {
            nodes.forEach(function (n) { return parent.insertBefore(n, ref); });
        };
        BrowserDomAdapter.prototype.insertAfter = function (parent, ref, node) { parent.insertBefore(node, ref.nextSibling); };
        BrowserDomAdapter.prototype.setInnerHTML = function (el, value) { el.innerHTML = value; };
        BrowserDomAdapter.prototype.getText = function (el) { return el.textContent; };
        BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
        BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
        BrowserDomAdapter.prototype.setValue = function (el, value) { el.value = value; };
        BrowserDomAdapter.prototype.getChecked = function (el) { return el.checked; };
        BrowserDomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
        BrowserDomAdapter.prototype.createComment = function (text) { return this.getDefaultDocument().createComment(text); };
        BrowserDomAdapter.prototype.createTemplate = function (html) {
            var t = this.getDefaultDocument().createElement('template');
            t.innerHTML = html;
            return t;
        };
        BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
            doc = doc || this.getDefaultDocument();
            return doc.createElement(tagName);
        };
        BrowserDomAdapter.prototype.createElementNS = function (ns, tagName, doc) {
            doc = doc || this.getDefaultDocument();
            return doc.createElementNS(ns, tagName);
        };
        BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
            doc = doc || this.getDefaultDocument();
            return doc.createTextNode(text);
        };
        BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
            doc = doc || this.getDefaultDocument();
            var el = doc.createElement('SCRIPT');
            el.setAttribute(attrName, attrValue);
            return el;
        };
        BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
            doc = doc || this.getDefaultDocument();
            var style = doc.createElement('style');
            this.appendChild(style, this.createTextNode(css, doc));
            return style;
        };
        BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
        BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
        BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
        BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
        BrowserDomAdapter.prototype.getElementsByClassName = function (element, name) {
            return element.getElementsByClassName(name);
        };
        BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
            return element.getElementsByTagName(name);
        };
        BrowserDomAdapter.prototype.classList = function (element) { return Array.prototype.slice.call(element.classList, 0); };
        BrowserDomAdapter.prototype.addClass = function (element, className) { element.classList.add(className); };
        BrowserDomAdapter.prototype.removeClass = function (element, className) { element.classList.remove(className); };
        BrowserDomAdapter.prototype.hasClass = function (element, className) {
            return element.classList.contains(className);
        };
        BrowserDomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
            element.style[styleName] = styleValue;
        };
        BrowserDomAdapter.prototype.removeStyle = function (element, stylename) {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            element.style[stylename] = '';
        };
        BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
        BrowserDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
            var value = this.getStyle(element, styleName) || '';
            return styleValue ? value == styleValue : value.length > 0;
        };
        BrowserDomAdapter.prototype.tagName = function (element) { return element.tagName; };
        BrowserDomAdapter.prototype.attributeMap = function (element) {
            var res = new Map();
            var elAttrs = element.attributes;
            for (var i = 0; i < elAttrs.length; i++) {
                var attrib = elAttrs.item(i);
                res.set(attrib.name, attrib.value);
            }
            return res;
        };
        BrowserDomAdapter.prototype.hasAttribute = function (element, attribute) {
            return element.hasAttribute(attribute);
        };
        BrowserDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) {
            return element.hasAttributeNS(ns, attribute);
        };
        BrowserDomAdapter.prototype.getAttribute = function (element, attribute) {
            return element.getAttribute(attribute);
        };
        BrowserDomAdapter.prototype.getAttributeNS = function (element, ns, name) {
            return element.getAttributeNS(ns, name);
        };
        BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
        BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
            element.setAttributeNS(ns, name, value);
        };
        BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
        BrowserDomAdapter.prototype.removeAttributeNS = function (element, ns, name) {
            element.removeAttributeNS(ns, name);
        };
        BrowserDomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
        BrowserDomAdapter.prototype.createHtmlDocument = function () {
            return document.implementation.createHTMLDocument('fakeTitle');
        };
        BrowserDomAdapter.prototype.getDefaultDocument = function () { return document; };
        BrowserDomAdapter.prototype.getBoundingClientRect = function (el) {
            try {
                return el.getBoundingClientRect();
            }
            catch (e) {
                return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
            }
        };
        BrowserDomAdapter.prototype.getTitle = function (doc) { return doc.title; };
        BrowserDomAdapter.prototype.setTitle = function (doc, newTitle) { doc.title = newTitle || ''; };
        BrowserDomAdapter.prototype.elementMatches = function (n, selector) {
            if (this.isElementNode(n)) {
                return n.matches && n.matches(selector) ||
                    n.msMatchesSelector && n.msMatchesSelector(selector) ||
                    n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
            }
            return false;
        };
        BrowserDomAdapter.prototype.isTemplateElement = function (el) {
            return this.isElementNode(el) && el.nodeName === 'TEMPLATE';
        };
        BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
        BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
        BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
        BrowserDomAdapter.prototype.hasShadowRoot = function (node) {
            return node.shadowRoot != null && node instanceof HTMLElement;
        };
        BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
        BrowserDomAdapter.prototype.importIntoDoc = function (node) { return document.importNode(this.templateAwareRoot(node), true); };
        BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
        BrowserDomAdapter.prototype.getHref = function (el) { return el.getAttribute('href'); };
        BrowserDomAdapter.prototype.getEventKey = function (event) {
            var key = event.key;
            if (key == null) {
                key = event.keyIdentifier;
                // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
                // Safari cf
                // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
                if (key == null) {
                    return 'Unidentified';
                }
                if (key.startsWith('U+')) {
                    key = String.fromCharCode(parseInt(key.substring(2), 16));
                    if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                        // There is a bug in Chrome for numeric keypad keys:
                        // https://code.google.com/p/chromium/issues/detail?id=155654
                        // 1, 2, 3 ... are reported as A, B, C ...
                        key = _chromeNumKeyPadMap[key];
                    }
                }
            }
            return _keyMap[key] || key;
        };
        BrowserDomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
            if (target === 'window') {
                return window;
            }
            if (target === 'document') {
                return doc;
            }
            if (target === 'body') {
                return doc.body;
            }
            return null;
        };
        BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
        BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
        BrowserDomAdapter.prototype.getBaseHref = function (doc) {
            var href = getBaseElementHref();
            return href == null ? null : relativePath(href);
        };
        BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
        BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
        BrowserDomAdapter.prototype.setData = function (element, name, value) {
            this.setAttribute(element, 'data-' + name, value);
        };
        BrowserDomAdapter.prototype.getData = function (element, name) {
            return this.getAttribute(element, 'data-' + name);
        };
        BrowserDomAdapter.prototype.getComputedStyle = function (element) { return getComputedStyle(element); };
        // TODO(tbosch): move this into a separate environment class once we have it
        // TODO(tbosch): move this into a separate environment class once we have it
        BrowserDomAdapter.prototype.supportsWebAnimation = 
        // TODO(tbosch): move this into a separate environment class once we have it
        function () {
            return typeof Element.prototype['animate'] === 'function';
        };
        BrowserDomAdapter.prototype.performanceNow = function () {
            // performance.now() is not available in all browsers, see
            // http://caniuse.com/#search=performance.now
            return window.performance && window.performance.now ? window.performance.now() :
                new Date().getTime();
        };
        BrowserDomAdapter.prototype.supportsCookies = function () { return true; };
        BrowserDomAdapter.prototype.getCookie = function (name) { return common.ɵparseCookieValue(document.cookie, name); };
        BrowserDomAdapter.prototype.setCookie = function (name, value) {
            // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
            // not clear other cookies.
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        };
        return BrowserDomAdapter;
    }(GenericBrowserDomAdapter));
    var baseElement = null;
    function getBaseElementHref() {
        if (!baseElement) {
            baseElement = (document.querySelector('base'));
            if (!baseElement) {
                return null;
            }
        }
        return baseElement.getAttribute('href');
    }
    // based on urlUtils.js in AngularJS 1
    var urlParsingNode;
    function relativePath(url) {
        if (!urlParsingNode) {
            urlParsingNode = document.createElement('a');
        }
        urlParsingNode.setAttribute('href', url);
        return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
            '/' + urlParsingNode.pathname;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A DI Token representing the main rendering context. In a browser this is the DOM Document.
     *
     * Note: Document might not be available in the Application Context when Application and Rendering
     * Contexts are not the same (e.g. when running the application into a Web Worker).
     *
     * @deprecated import from `@angular/common` instead.
     */
    var DOCUMENT$1 = common.DOCUMENT;

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function supportsState() {
        return !!window.history.pushState;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
     * This class should not be used directly by an application developer. Instead, use
     * {@link Location}.
     */
    var BrowserPlatformLocation = /** @class */ (function (_super) {
        __extends$1(BrowserPlatformLocation, _super);
        function BrowserPlatformLocation(_doc) {
            var _this = _super.call(this) || this;
            _this._doc = _doc;
            _this._init();
            return _this;
        }
        // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
        /** @internal */
        // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
        /** @internal */
        BrowserPlatformLocation.prototype._init = 
        // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
        /** @internal */
        function () {
            this.location = getDOM().getLocation();
            this._history = getDOM().getHistory();
        };
        BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function () { return getDOM().getBaseHref(this._doc); };
        BrowserPlatformLocation.prototype.onPopState = function (fn) {
            getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', fn, false);
        };
        BrowserPlatformLocation.prototype.onHashChange = function (fn) {
            getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', fn, false);
        };
        Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
            get: function () { return this.location.pathname; },
            set: function (newPath) { this.location.pathname = newPath; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
            get: function () { return this.location.search; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
            get: function () { return this.location.hash; },
            enumerable: true,
            configurable: true
        });
        BrowserPlatformLocation.prototype.pushState = function (state, title, url) {
            if (supportsState()) {
                this._history.pushState(state, title, url);
            }
            else {
                this.location.hash = url;
            }
        };
        BrowserPlatformLocation.prototype.replaceState = function (state, title, url) {
            if (supportsState()) {
                this._history.replaceState(state, title, url);
            }
            else {
                this.location.hash = url;
            }
        };
        BrowserPlatformLocation.prototype.forward = function () { this._history.forward(); };
        BrowserPlatformLocation.prototype.back = function () { this._history.back(); };
        BrowserPlatformLocation.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BrowserPlatformLocation.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
        ]; };
        return BrowserPlatformLocation;
    }(common.PlatformLocation));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An id that identifies a particular application being bootstrapped, that should
     * match across the client/server boundary.
     */
    var TRANSITION_ID = new core.InjectionToken('TRANSITION_ID');

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var BrowserGetTestability = /** @class */ (function () {
        function BrowserGetTestability() {
        }
        BrowserGetTestability.init = function () { core.setTestabilityGetter(new BrowserGetTestability()); };
        BrowserGetTestability.prototype.addToWindow = function (registry) {
            core.ɵglobal['getAngularTestability'] = function (elem, findInAncestors) {
                if (findInAncestors === void 0) { findInAncestors = true; }
                var testability = registry.findTestabilityInTree(elem, findInAncestors);
                if (testability == null) {
                    throw new Error('Could not find testability for element.');
                }
                return testability;
            };
            core.ɵglobal['getAllAngularTestabilities'] = function () { return registry.getAllTestabilities(); };
            core.ɵglobal['getAllAngularRootElements'] = function () { return registry.getAllRootElements(); };
            var whenAllStable = function (callback /** TODO #9100 */) {
                var testabilities = core.ɵglobal['getAllAngularTestabilities']();
                var count = testabilities.length;
                var didWork = false;
                var decrement = function (didWork_ /** TODO #9100 */) {
                    didWork = didWork || didWork_;
                    count--;
                    if (count == 0) {
                        callback(didWork);
                    }
                };
                testabilities.forEach(function (testability /** TODO #9100 */) {
                    testability.whenStable(decrement);
                });
            };
            if (!core.ɵglobal['frameworkStabilizers']) {
                core.ɵglobal['frameworkStabilizers'] = [];
            }
            core.ɵglobal['frameworkStabilizers'].push(whenAllStable);
        };
        BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
            if (elem == null) {
                return null;
            }
            var t = registry.getTestability(elem);
            if (t != null) {
                return t;
            }
            else if (!findInAncestors) {
                return null;
            }
            if (getDOM().isShadowRoot(elem)) {
                return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
            }
            return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
        };
        return BrowserGetTestability;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */


    /**
     * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
     * `name` is `'probe'`.
     * @param name Name under which it will be exported. Keep in mind this will be a property of the
     * global `ng` object.
     * @param value The value to export.
     */
    function exportNgVar(name, value) {
        if (typeof COMPILED === 'undefined' || !COMPILED) {
            // Note: we can't export `ng` when using closure enhanced optimization as:
            // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
            // - we can't declare a closure extern as the namespace `ng` is already used within Google
            //   for typings for angularJS (via `goog.provide('ng....')`).
            var ng = core.ɵglobal['ng'] = core.ɵglobal['ng'] || {};
            ng[name] = value;
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CORE_TOKENS = {
        'ApplicationRef': core.ApplicationRef,
        'NgZone': core.NgZone,
    };
    var INSPECT_GLOBAL_NAME = 'probe';
    var CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
    /**
     * Returns a {@link DebugElement} for the given native DOM element, or
     * null if the given native element does not have an Angular view associated
     * with it.
     */
    function inspectNativeElement(element) {
        return core.getDebugNode(element);
    }
    function _createNgProbe(coreTokens) {
        exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
        exportNgVar(CORE_TOKENS_GLOBAL_NAME, __assign({}, CORE_TOKENS, _ngProbeTokensToMap(coreTokens || [])));
        return function () { return inspectNativeElement; };
    }
    function _ngProbeTokensToMap(tokens) {
        return tokens.reduce(function (prev, t) { return (prev[t.name] = t.token, prev); }, {});
    }
    /**
     * Providers which support debugging Angular applications (e.g. via `ng.probe`).
     */
    var ELEMENT_PROBE_PROVIDERS = [
        {
            provide: core.APP_INITIALIZER,
            useFactory: _createNgProbe,
            deps: [
                [core.NgProbeToken, new core.Optional()],
            ],
            multi: true,
        },
    ];

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     *
     */
    var EVENT_MANAGER_PLUGINS = new core.InjectionToken('EventManagerPlugins');
    var EventManagerPlugin = /** @class */ (function () {
        function EventManagerPlugin(_doc) {
            this._doc = _doc;
        }
        EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
            var target = getDOM().getGlobalEventTarget(this._doc, element);
            if (!target) {
                throw new Error("Unsupported event target " + target + " for event " + eventName);
            }
            return this.addEventListener(target, eventName, handler);
        };
        return EventManagerPlugin;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var SharedStylesHost = /** @class */ (function () {
        function SharedStylesHost() {
            /** @internal */
            this._stylesSet = new Set();
        }
        SharedStylesHost.prototype.addStyles = function (styles) {
            var _this = this;
            var additions = new Set();
            styles.forEach(function (style) {
                if (!_this._stylesSet.has(style)) {
                    _this._stylesSet.add(style);
                    additions.add(style);
                }
            });
            this.onStylesAdded(additions);
        };
        SharedStylesHost.prototype.onStylesAdded = function (additions) { };
        SharedStylesHost.prototype.getAllStyles = function () { return Array.from(this._stylesSet); };
        SharedStylesHost.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SharedStylesHost.ctorParameters = function () { return []; };
        return SharedStylesHost;
    }());
    var DomSharedStylesHost = /** @class */ (function (_super) {
        __extends$1(DomSharedStylesHost, _super);
        function DomSharedStylesHost(_doc) {
            var _this = _super.call(this) || this;
            _this._doc = _doc;
            _this._hostNodes = new Set();
            _this._styleNodes = new Set();
            _this._hostNodes.add(_doc.head);
            return _this;
        }
        DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
            var _this = this;
            styles.forEach(function (style) {
                var styleEl = _this._doc.createElement('style');
                styleEl.textContent = style;
                _this._styleNodes.add(host.appendChild(styleEl));
            });
        };
        DomSharedStylesHost.prototype.addHost = function (hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        };
        DomSharedStylesHost.prototype.removeHost = function (hostNode) { this._hostNodes.delete(hostNode); };
        DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
            var _this = this;
            this._hostNodes.forEach(function (hostNode) { return _this._addStylesToHost(additions, hostNode); });
        };
        DomSharedStylesHost.prototype.ngOnDestroy = function () { this._styleNodes.forEach(function (styleNode) { return getDOM().remove(styleNode); }); };
        DomSharedStylesHost.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DomSharedStylesHost.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
        ]; };
        return DomSharedStylesHost;
    }(SharedStylesHost));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var NAMESPACE_URIS = {
        'svg': 'http://www.w3.org/2000/svg',
        'xhtml': 'http://www.w3.org/1999/xhtml',
        'xlink': 'http://www.w3.org/1999/xlink',
        'xml': 'http://www.w3.org/XML/1998/namespace',
        'xmlns': 'http://www.w3.org/2000/xmlns/',
    };
    var COMPONENT_REGEX = /%COMP%/g;
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    function shimContentAttribute(componentShortId) {
        return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function shimHostAttribute(componentShortId) {
        return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function flattenStyles(compId, styles, target) {
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            if (Array.isArray(style)) {
                flattenStyles(compId, style, target);
            }
            else {
                style = style.replace(COMPONENT_REGEX, compId);
                target.push(style);
            }
        }
        return target;
    }
    function decoratePreventDefault(eventHandler) {
        return function (event) {
            var allowDefaultBehavior = eventHandler(event);
            if (allowDefaultBehavior === false) {
                // TODO(tbosch): move preventDefault into event plugins...
                event.preventDefault();
                event.returnValue = false;
            }
        };
    }
    var DefaultDomRenderer2 = /** @class */ (function () {
        function DefaultDomRenderer2(eventManager) {
            this.eventManager = eventManager;
            this.data = Object.create(null);
        }
        DefaultDomRenderer2.prototype.destroy = function () { };
        DefaultDomRenderer2.prototype.createElement = function (name, namespace) {
            if (namespace) {
                return document.createElementNS(NAMESPACE_URIS[namespace], name);
            }
            return document.createElement(name);
        };
        DefaultDomRenderer2.prototype.createComment = function (value) { return document.createComment(value); };
        DefaultDomRenderer2.prototype.createText = function (value) { return document.createTextNode(value); };
        DefaultDomRenderer2.prototype.appendChild = function (parent, newChild) { parent.appendChild(newChild); };
        DefaultDomRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
            if (parent) {
                parent.insertBefore(newChild, refChild);
            }
        };
        DefaultDomRenderer2.prototype.removeChild = function (parent, oldChild) {
            if (parent) {
                parent.removeChild(oldChild);
            }
        };
        DefaultDomRenderer2.prototype.selectRootElement = function (selectorOrNode) {
            var el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
                selectorOrNode;
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
            el.textContent = '';
            return el;
        };
        DefaultDomRenderer2.prototype.parentNode = function (node) { return node.parentNode; };
        DefaultDomRenderer2.prototype.nextSibling = function (node) { return node.nextSibling; };
        DefaultDomRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
            if (namespace) {
                name = namespace + ":" + name;
                var namespaceUri = NAMESPACE_URIS[namespace];
                if (namespaceUri) {
                    el.setAttributeNS(namespaceUri, name, value);
                }
                else {
                    el.setAttribute(name, value);
                }
            }
            else {
                el.setAttribute(name, value);
            }
        };
        DefaultDomRenderer2.prototype.removeAttribute = function (el, name, namespace) {
            if (namespace) {
                var namespaceUri = NAMESPACE_URIS[namespace];
                if (namespaceUri) {
                    el.removeAttributeNS(namespaceUri, name);
                }
                else {
                    el.removeAttribute(namespace + ":" + name);
                }
            }
            else {
                el.removeAttribute(name);
            }
        };
        DefaultDomRenderer2.prototype.addClass = function (el, name) { el.classList.add(name); };
        DefaultDomRenderer2.prototype.removeClass = function (el, name) { el.classList.remove(name); };
        DefaultDomRenderer2.prototype.setStyle = function (el, style, value, flags) {
            if (flags & core.RendererStyleFlags2.DashCase) {
                el.style.setProperty(style, value, !!(flags & core.RendererStyleFlags2.Important) ? 'important' : '');
            }
            else {
                el.style[style] = value;
            }
        };
        DefaultDomRenderer2.prototype.removeStyle = function (el, style, flags) {
            if (flags & core.RendererStyleFlags2.DashCase) {
                el.style.removeProperty(style);
            }
            else {
                // IE requires '' instead of null
                // see https://github.com/angular/angular/issues/7916
                el.style[style] = '';
            }
        };
        DefaultDomRenderer2.prototype.setProperty = function (el, name, value) {
            checkNoSyntheticProp(name, 'property');
            el[name] = value;
        };
        DefaultDomRenderer2.prototype.setValue = function (node, value) { node.nodeValue = value; };
        DefaultDomRenderer2.prototype.listen = function (target, event, callback) {
            checkNoSyntheticProp(event, 'listener');
            if (typeof target === 'string') {
                return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
            }
            return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
        };
        return DefaultDomRenderer2;
    }());
    var AT_CHARCODE = '@'.charCodeAt(0);
    function checkNoSyntheticProp(name, nameKind) {
        if (name.charCodeAt(0) === AT_CHARCODE) {
            throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
        }
    }
    var EmulatedEncapsulationDomRenderer2 = /** @class */ (function (_super) {
        __extends$1(EmulatedEncapsulationDomRenderer2, _super);
        function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component) {
            var _this = _super.call(this, eventManager) || this;
            _this.component = component;
            var styles = flattenStyles(component.id, component.styles, []);
            sharedStylesHost.addStyles(styles);
            _this.contentAttr = shimContentAttribute(component.id);
            _this.hostAttr = shimHostAttribute(component.id);
            return _this;
        }
        EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function (element) { _super.prototype.setAttribute.call(this, element, this.hostAttr, ''); };
        EmulatedEncapsulationDomRenderer2.prototype.createElement = function (parent, name) {
            var el = _super.prototype.createElement.call(this, parent, name);
            _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
            return el;
        };
        return EmulatedEncapsulationDomRenderer2;
    }(DefaultDomRenderer2));
    var ShadowDomRenderer = /** @class */ (function (_super) {
        __extends$1(ShadowDomRenderer, _super);
        function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
            var _this = _super.call(this, eventManager) || this;
            _this.sharedStylesHost = sharedStylesHost;
            _this.hostEl = hostEl;
            _this.component = component;
            _this.shadowRoot = hostEl.createShadowRoot();
            _this.sharedStylesHost.addHost(_this.shadowRoot);
            var styles = flattenStyles(component.id, component.styles, []);
            for (var i = 0; i < styles.length; i++) {
                var styleEl = document.createElement('style');
                styleEl.textContent = styles[i];
                _this.shadowRoot.appendChild(styleEl);
            }
            return _this;
        }
        ShadowDomRenderer.prototype.nodeOrShadowRoot = function (node) { return node === this.hostEl ? this.shadowRoot : node; };
        ShadowDomRenderer.prototype.destroy = function () { this.sharedStylesHost.removeHost(this.shadowRoot); };
        ShadowDomRenderer.prototype.appendChild = function (parent, newChild) {
            return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
        };
        ShadowDomRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
            return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
        };
        ShadowDomRenderer.prototype.removeChild = function (parent, oldChild) {
            return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
        };
        ShadowDomRenderer.prototype.parentNode = function (node) {
            return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
        };
        return ShadowDomRenderer;
    }(DefaultDomRenderer2));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ɵ0 = function (v) {
        return '__zone_symbol__' + v;
    };
    /**
     * Detect if Zone is present. If it is then use simple zone aware 'addEventListener'
     * since Angular can do much more
     * efficient bookkeeping than Zone can, because we have additional information. This speeds up
     * addEventListener by 3x.
     */
    var __symbol__ = (typeof Zone !== 'undefined') && Zone['__symbol__'] || ɵ0;
    var ADD_EVENT_LISTENER = __symbol__('addEventListener');
    var REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
    var symbolNames = {};
    var FALSE = 'FALSE';
    var ANGULAR = 'ANGULAR';
    var NATIVE_ADD_LISTENER = 'addEventListener';
    var NATIVE_REMOVE_LISTENER = 'removeEventListener';
    // use the same symbol string which is used in zone.js
    var stopSymbol = '__zone_symbol__propagationStopped';
    var stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
    var blackListedEvents = (typeof Zone !== 'undefined') && Zone[__symbol__('BLACK_LISTED_EVENTS')];
    var blackListedMap;
    if (blackListedEvents) {
        blackListedMap = {};
        blackListedEvents.forEach(function (eventName) { blackListedMap[eventName] = eventName; });
    }
    var isBlackListedEvent = function (eventName) {
        if (!blackListedMap) {
            return false;
        }
        return blackListedMap.hasOwnProperty(eventName);
    };
    // a global listener to handle all dom event,
    // so we do not need to create a closure every time
    var globalListener = function (event) {
        var symbolName = symbolNames[event.type];
        if (!symbolName) {
            return;
        }
        var taskDatas = this[symbolName];
        if (!taskDatas) {
            return;
        }
        var args = [event];
        if (taskDatas.length === 1) {
            // if taskDatas only have one element, just invoke it
            var taskData = taskDatas[0];
            if (taskData.zone !== Zone.current) {
                // only use Zone.run when Zone.current not equals to stored zone
                return taskData.zone.run(taskData.handler, this, args);
            }
            else {
                return taskData.handler.apply(this, args);
            }
        }
        else {
            // copy tasks as a snapshot to avoid event handlers remove
            // itself or others
            var copiedTasks = taskDatas.slice();
            for (var i = 0; i < copiedTasks.length; i++) {
                // if other listener call event.stopImmediatePropagation
                // just break
                if (event[stopSymbol] === true) {
                    break;
                }
                var taskData = copiedTasks[i];
                if (taskData.zone !== Zone.current) {
                    // only use Zone.run when Zone.current not equals to stored zone
                    taskData.zone.run(taskData.handler, this, args);
                }
                else {
                    taskData.handler.apply(this, args);
                }
            }
        }
    };
    var DomEventsPlugin = /** @class */ (function (_super) {
        __extends$1(DomEventsPlugin, _super);
        function DomEventsPlugin(doc, ngZone) {
            var _this = _super.call(this, doc) || this;
            _this.ngZone = ngZone;
            _this.patchEvent();
            return _this;
        }
        DomEventsPlugin.prototype.patchEvent = function () {
            if (!Event || !Event.prototype) {
                return;
            }
            if (Event.prototype[stopMethodSymbol]) {
                // already patched by zone.js
                return;
            }
            var delegate = Event.prototype[stopMethodSymbol] =
                Event.prototype.stopImmediatePropagation;
            Event.prototype.stopImmediatePropagation = function () {
                if (this) {
                    this[stopSymbol] = true;
                }
                // should call native delegate in case
                // in some environment part of the application
                // will not use the patched Event
                delegate && delegate.apply(this, arguments);
            };
        };
        // This plugin should come last in the list of plugins, because it accepts all
        // events.
        // This plugin should come last in the list of plugins, because it accepts all
        // events.
        DomEventsPlugin.prototype.supports = 
        // This plugin should come last in the list of plugins, because it accepts all
        // events.
        function (eventName) { return true; };
        DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var _this = this;
            /**
                 * This code is about to add a listener to the DOM. If Zone.js is present, than
                 * `addEventListener` has been patched. The patched code adds overhead in both
                 * memory and speed (3x slower) than native. For this reason if we detect that
                 * Zone.js is present we use a simple version of zone aware addEventListener instead.
                 * The result is faster registration and the zone will be restored.
                 * But ZoneSpec.onScheduleTask, ZoneSpec.onInvokeTask, ZoneSpec.onCancelTask
                 * will not be invoked
                 * We also do manual zone restoration in element.ts renderEventHandlerClosure method.
                 *
                 * NOTE: it is possible that the element is from different iframe, and so we
                 * have to check before we execute the method.
                 */
            var zoneJsLoaded = element[ADD_EVENT_LISTENER];
            var callback = handler;
            // if zonejs is loaded and current zone is not ngZone
            // we keep Zone.current on target for later restoration.
            if (zoneJsLoaded && (!core.NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
                var symbolName = symbolNames[eventName];
                if (!symbolName) {
                    symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
                }
                var taskDatas = element[symbolName];
                var globalListenerRegistered = taskDatas && taskDatas.length > 0;
                if (!taskDatas) {
                    taskDatas = element[symbolName] = [];
                }
                var zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
                if (taskDatas.length === 0) {
                    taskDatas.push({ zone: zone, handler: callback });
                }
                else {
                    var callbackRegistered = false;
                    for (var i = 0; i < taskDatas.length; i++) {
                        if (taskDatas[i].handler === callback) {
                            callbackRegistered = true;
                            break;
                        }
                    }
                    if (!callbackRegistered) {
                        taskDatas.push({ zone: zone, handler: callback });
                    }
                }
                if (!globalListenerRegistered) {
                    element[ADD_EVENT_LISTENER](eventName, globalListener, false);
                }
            }
            else {
                element[NATIVE_ADD_LISTENER](eventName, callback, false);
            }
            return function () { return _this.removeEventListener(element, eventName, callback); };
        };
        DomEventsPlugin.prototype.removeEventListener = function (target, eventName, callback) {
            var underlyingRemove = target[REMOVE_EVENT_LISTENER];
            // zone.js not loaded, use native removeEventListener
            if (!underlyingRemove) {
                return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
            }
            var symbolName = symbolNames[eventName];
            var taskDatas = symbolName && target[symbolName];
            if (!taskDatas) {
                // addEventListener not using patched version
                // just call native removeEventListener
                return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
            }
            // fix issue 20532, should be able to remove
            // listener which was added inside of ngZone
            var found = false;
            for (var i = 0; i < taskDatas.length; i++) {
                // remove listener from taskDatas if the callback equals
                if (taskDatas[i].handler === callback) {
                    found = true;
                    taskDatas.splice(i, 1);
                    break;
                }
            }
            if (found) {
                if (taskDatas.length === 0) {
                    // all listeners are removed, we can remove the globalListener from target
                    underlyingRemove.apply(target, [eventName, globalListener, false]);
                }
            }
            else {
                // not found in taskDatas, the callback may be added inside of ngZone
                // use native remove listener to remove the callback
                target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
            }
        };
        DomEventsPlugin.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DomEventsPlugin.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
            { type: core.NgZone, },
        ]; };
        return DomEventsPlugin;
    }(EventManagerPlugin));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var EVENT_NAMES = {
        // pan
        'pan': true,
        'panstart': true,
        'panmove': true,
        'panend': true,
        'pancancel': true,
        'panleft': true,
        'panright': true,
        'panup': true,
        'pandown': true,
        // pinch
        'pinch': true,
        'pinchstart': true,
        'pinchmove': true,
        'pinchend': true,
        'pinchcancel': true,
        'pinchin': true,
        'pinchout': true,
        // press
        'press': true,
        'pressup': true,
        // rotate
        'rotate': true,
        'rotatestart': true,
        'rotatemove': true,
        'rotateend': true,
        'rotatecancel': true,
        // swipe
        'swipe': true,
        'swipeleft': true,
        'swiperight': true,
        'swipeup': true,
        'swipedown': true,
        // tap
        'tap': true,
    };
    /**
     * A DI token that you can use to provide{@link HammerGestureConfig} to Angular. Use it to configure
     * Hammer gestures.
     *
     * @experimental
     */
    var HAMMER_GESTURE_CONFIG = new core.InjectionToken('HammerGestureConfig');
    /**
     * @experimental
     */
    var HammerGestureConfig = /** @class */ (function () {
        function HammerGestureConfig() {
            this.events = [];
            this.overrides = {};
        }
        HammerGestureConfig.prototype.buildHammer = function (element) {
            var mc = new Hammer(element, this.options);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            for (var eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        };
        HammerGestureConfig.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HammerGestureConfig.ctorParameters = function () { return []; };
        return HammerGestureConfig;
    }());
    var HammerGesturesPlugin = /** @class */ (function (_super) {
        __extends$1(HammerGesturesPlugin, _super);
        function HammerGesturesPlugin(doc, _config, console) {
            var _this = _super.call(this, doc) || this;
            _this._config = _config;
            _this.console = console;
            return _this;
        }
        HammerGesturesPlugin.prototype.supports = function (eventName) {
            if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
                return false;
            }
            if (!window.Hammer) {
                this.console.warn("Hammer.js is not loaded, can not bind '" + eventName + "' event.");
                return false;
            }
            return true;
        };
        HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var _this = this;
            var zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            return zone.runOutsideAngular(function () {
                // Creating the manager bind events, must be done outside of angular
                var mc = _this._config.buildHammer(element);
                var callback = function (eventObj) {
                    zone.runGuarded(function () { handler(eventObj); });
                };
                mc.on(eventName, callback);
                return function () { return mc.off(eventName, callback); };
            });
        };
        HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
        HammerGesturesPlugin.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HammerGesturesPlugin.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
            { type: HammerGestureConfig, decorators: [{ type: core.Inject, args: [HAMMER_GESTURE_CONFIG,] },] },
            { type: core.ɵConsole, },
        ]; };
        return HammerGesturesPlugin;
    }(EventManagerPlugin));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
    var ɵ0$1 = function (event) { return event.altKey; };
    var ɵ1$1 = function (event) { return event.ctrlKey; };
    var ɵ2$1 = function (event) { return event.metaKey; };
    var ɵ3 = function (event) { return event.shiftKey; };
    var MODIFIER_KEY_GETTERS = {
        'alt': ɵ0$1,
        'control': ɵ1$1,
        'meta': ɵ2$1,
        'shift': ɵ3
    };
    /**
     * @experimental
     */
    var KeyEventsPlugin = /** @class */ (function (_super) {
        __extends$1(KeyEventsPlugin, _super);
        function KeyEventsPlugin(doc) {
            return _super.call(this, doc) || this;
        }
        KeyEventsPlugin.prototype.supports = function (eventName) { return KeyEventsPlugin.parseEventName(eventName) != null; };
        KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var parsedEvent = (KeyEventsPlugin.parseEventName(eventName));
            var outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(function () {
                return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
            });
        };
        KeyEventsPlugin.parseEventName = function (eventName) {
            var parts = eventName.toLowerCase().split('.');
            var domEventName = parts.shift();
            if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
                return null;
            }
            var key = KeyEventsPlugin._normalizeKey((parts.pop()));
            var fullKey = '';
            MODIFIER_KEYS.forEach(function (modifierName) {
                var index = parts.indexOf(modifierName);
                if (index > -1) {
                    parts.splice(index, 1);
                    fullKey += modifierName + '.';
                }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
                // returning null instead of throwing to let another plugin process the event
                return null;
            }
            var result = {};
            result['domEventName'] = domEventName;
            result['fullKey'] = fullKey;
            return result;
        };
        KeyEventsPlugin.getEventFullKey = function (event) {
            var fullKey = '';
            var key = getDOM().getEventKey(event);
            key = key.toLowerCase();
            if (key === ' ') {
                key = 'space'; // for readability
            }
            else if (key === '.') {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            MODIFIER_KEYS.forEach(function (modifierName) {
                if (modifierName != key) {
                    var modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            fullKey += key;
            return fullKey;
        };
        KeyEventsPlugin.eventCallback = function (fullKey, handler, zone) {
            return function (event /** TODO #9100 */) {
                if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                    zone.runGuarded(function () { return handler(event); });
                }
            };
        };
        /** @internal */
        /** @internal */
        KeyEventsPlugin._normalizeKey = /** @internal */
        function (keyName) {
            // TODO: switch to a Map if the mapping grows too much
            switch (keyName) {
                case 'esc':
                    return 'escape';
                default:
                    return keyName;
            }
        };
        KeyEventsPlugin.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        KeyEventsPlugin.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
        ]; };
        return KeyEventsPlugin;
    }(EventManagerPlugin));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
     * values to be safe to use in the different DOM contexts.
     *
     * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
     * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
     * the website.
     *
     * In specific situations, it might be necessary to disable sanitization, for example if the
     * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
     * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
     * methods, and then binding to that value from the template.
     *
     * These situations should be very rare, and extraordinary care must be taken to avoid creating a
     * Cross Site Scripting (XSS) security bug!
     *
     * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
     * close as possible to the source of the value, to make it easy to verify no security bug is
     * created by its use.
     *
     * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
     * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
     * code. The sanitizer leaves safe values intact.
     *
     * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
     * sanitization for the value passed in. Carefully check and audit all values and code paths going
     * into this call. Make sure any user data is appropriately escaped for this security context.
     * For more detail, see the [Security Guide](http://g.co/ng/security).
     *
     *
     */
    var DomSanitizer = /** @class */ (function () {
        function DomSanitizer() {
        }
        return DomSanitizer;
    }());
    var DomSanitizerImpl = /** @class */ (function (_super) {
        __extends$1(DomSanitizerImpl, _super);
        function DomSanitizerImpl(_doc) {
            var _this = _super.call(this) || this;
            _this._doc = _doc;
            return _this;
        }
        DomSanitizerImpl.prototype.sanitize = function (ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case core.SecurityContext.NONE:
                    return value;
                case core.SecurityContext.HTML:
                    if (value instanceof SafeHtmlImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'HTML');
                    return core.ɵ_sanitizeHtml(this._doc, String(value));
                case core.SecurityContext.STYLE:
                    if (value instanceof SafeStyleImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'Style');
                    return core.ɵ_sanitizeStyle(value);
                case core.SecurityContext.SCRIPT:
                    if (value instanceof SafeScriptImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'Script');
                    throw new Error('unsafe value used in a script context');
                case core.SecurityContext.URL:
                    if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                        // Allow resource URLs in URL contexts, they are strictly more trusted.
                        return value.changingThisBreaksApplicationSecurity;
                    }
                    this.checkNotSafeValue(value, 'URL');
                    return core.ɵ_sanitizeUrl(String(value));
                case core.SecurityContext.RESOURCE_URL:
                    if (value instanceof SafeResourceUrlImpl) {
                        return value.changingThisBreaksApplicationSecurity;
                    }
                    this.checkNotSafeValue(value, 'ResourceURL');
                    throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
                default:
                    throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
            }
        };
        DomSanitizerImpl.prototype.checkNotSafeValue = function (value, expectedType) {
            if (value instanceof SafeValueImpl) {
                throw new Error("Required a safe " + expectedType + ", got a " + value.getTypeName() + " " +
                    "(see http://g.co/ng/security#xss)");
            }
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function (value) { return new SafeHtmlImpl(value); };
        DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function (value) { return new SafeStyleImpl(value); };
        DomSanitizerImpl.prototype.bypassSecurityTrustScript = function (value) { return new SafeScriptImpl(value); };
        DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function (value) { return new SafeUrlImpl(value); };
        DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
            return new SafeResourceUrlImpl(value);
        };
        DomSanitizerImpl.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DomSanitizerImpl.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT$1,] },] },
        ]; };
        return DomSanitizerImpl;
    }(DomSanitizer));
    var SafeValueImpl = /** @class */ (function () {
        function SafeValueImpl(changingThisBreaksApplicationSecurity) {
            // empty
            this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        }
        SafeValueImpl.prototype.toString = function () {
            return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity +
                " (see http://g.co/ng/security#xss)";
        };
        return SafeValueImpl;
    }());
    var SafeHtmlImpl = /** @class */ (function (_super) {
        __extends$1(SafeHtmlImpl, _super);
        function SafeHtmlImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SafeHtmlImpl.prototype.getTypeName = function () { return 'HTML'; };
        return SafeHtmlImpl;
    }(SafeValueImpl));
    var SafeStyleImpl = /** @class */ (function (_super) {
        __extends$1(SafeStyleImpl, _super);
        function SafeStyleImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SafeStyleImpl.prototype.getTypeName = function () { return 'Style'; };
        return SafeStyleImpl;
    }(SafeValueImpl));
    var SafeScriptImpl = /** @class */ (function (_super) {
        __extends$1(SafeScriptImpl, _super);
        function SafeScriptImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SafeScriptImpl.prototype.getTypeName = function () { return 'Script'; };
        return SafeScriptImpl;
    }(SafeValueImpl));
    var SafeUrlImpl = /** @class */ (function (_super) {
        __extends$1(SafeUrlImpl, _super);
        function SafeUrlImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SafeUrlImpl.prototype.getTypeName = function () { return 'URL'; };
        return SafeUrlImpl;
    }(SafeValueImpl));
    var SafeResourceUrlImpl = /** @class */ (function (_super) {
        __extends$1(SafeResourceUrlImpl, _super);
        function SafeResourceUrlImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SafeResourceUrlImpl.prototype.getTypeName = function () { return 'ResourceURL'; };
        return SafeResourceUrlImpl;
    }(SafeValueImpl));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
        { provide: core.PLATFORM_ID, useValue: common.ɵPLATFORM_BROWSER_ID },
        { provide: core.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
        { provide: common.PlatformLocation, useClass: BrowserPlatformLocation, deps: [DOCUMENT$1] },
        { provide: DOCUMENT$1, useFactory: _document, deps: [] },
    ];
    /**
     *
     */
    var platformBrowser = core.createPlatformFactory(core.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
    function initDomAdapter() {
        BrowserDomAdapter.makeCurrent();
        BrowserGetTestability.init();
    }
    function _document() {
        return document;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     *
     */
    var VERSION = new core.Version('6.0.0');

    /**
     * @license Angular v6.0.4
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
     * Supported http methods.
     * @deprecated see https://angular.io/guide/http
     */
    var RequestMethod;
    (function (RequestMethod) {
        RequestMethod[RequestMethod["Get"] = 0] = "Get";
        RequestMethod[RequestMethod["Post"] = 1] = "Post";
        RequestMethod[RequestMethod["Put"] = 2] = "Put";
        RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
        RequestMethod[RequestMethod["Options"] = 4] = "Options";
        RequestMethod[RequestMethod["Head"] = 5] = "Head";
        RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
    })(RequestMethod || (RequestMethod = {}));
    /**
     * All possible states in which a connection can be, based on
     * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
     * additional "CANCELLED" state.
     * @deprecated see https://angular.io/guide/http
     */
    var ReadyState;
    (function (ReadyState) {
        ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
        ReadyState[ReadyState["Open"] = 1] = "Open";
        ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
        ReadyState[ReadyState["Loading"] = 3] = "Loading";
        ReadyState[ReadyState["Done"] = 4] = "Done";
        ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
    })(ReadyState || (ReadyState = {}));
    /**
     * Acceptable response types to be associated with a {@link Response}, based on
     * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
     * @deprecated see https://angular.io/guide/http
     */
    var ResponseType;
    (function (ResponseType) {
        ResponseType[ResponseType["Basic"] = 0] = "Basic";
        ResponseType[ResponseType["Cors"] = 1] = "Cors";
        ResponseType[ResponseType["Default"] = 2] = "Default";
        ResponseType[ResponseType["Error"] = 3] = "Error";
        ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
    })(ResponseType || (ResponseType = {}));
    /**
     * Supported content type to be automatically associated with a {@link Request}.
     * @deprecated see https://angular.io/guide/http
     */
    var ContentType;
    (function (ContentType) {
        ContentType[ContentType["NONE"] = 0] = "NONE";
        ContentType[ContentType["JSON"] = 1] = "JSON";
        ContentType[ContentType["FORM"] = 2] = "FORM";
        ContentType[ContentType["FORM_DATA"] = 3] = "FORM_DATA";
        ContentType[ContentType["TEXT"] = 4] = "TEXT";
        ContentType[ContentType["BLOB"] = 5] = "BLOB";
        ContentType[ContentType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
    })(ContentType || (ContentType = {}));
    /**
     * Define which buffer to use to store the response
     * @deprecated see https://angular.io/guide/http
     */
    var ResponseContentType;
    (function (ResponseContentType) {
        ResponseContentType[ResponseContentType["Text"] = 0] = "Text";
        ResponseContentType[ResponseContentType["Json"] = 1] = "Json";
        ResponseContentType[ResponseContentType["ArrayBuffer"] = 2] = "ArrayBuffer";
        ResponseContentType[ResponseContentType["Blob"] = 3] = "Blob";
    })(ResponseContentType || (ResponseContentType = {}));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
     * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
     *
     * The only known difference between this `Headers` implementation and the spec is the
     * lack of an `entries` method.
     *
     * ### Example
     *
     * ```
     * import {Headers} from '@angular/http';
     *
     * var firstHeaders = new Headers();
     * firstHeaders.append('Content-Type', 'image/jpeg');
     * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
     *
     * // Create headers from Plain Old JavaScript Object
     * var secondHeaders = new Headers({
     *   'X-My-Custom-Header': 'Angular'
     * });
     * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
     *
     * var thirdHeaders = new Headers(secondHeaders);
     * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var Headers = /** @class */ (function () {
        // TODO(vicb): any -> string|string[]
        function Headers(headers) {
            var _this = this;
            /** @internal header names are lower case */
            this._headers = new Map();
            /** @internal map lower case names to actual names */
            this._normalizedNames = new Map();
            if (!headers) {
                return;
            }
            if (headers instanceof Headers) {
                headers.forEach(function (values, name) {
                    values.forEach(function (value) { return _this.append(name, value); });
                });
                return;
            }
            Object.keys(headers).forEach(function (name) {
                var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
                _this.delete(name);
                values.forEach(function (value) { return _this.append(name, value); });
            });
        }
        /**
         * Returns a new Headers instance from the given DOMString of Response Headers
         */
        Headers.fromResponseHeaderString = function (headersString) {
            var headers = new Headers();
            headersString.split('\n').forEach(function (line) {
                var index = line.indexOf(':');
                if (index > 0) {
                    var name_1 = line.slice(0, index);
                    var value = line.slice(index + 1).trim();
                    headers.set(name_1, value);
                }
            });
            return headers;
        };
        /**
         * Appends a header to existing list of header values for a given header name.
         */
        Headers.prototype.append = function (name, value) {
            var values = this.getAll(name);
            if (values === null) {
                this.set(name, value);
            }
            else {
                values.push(value);
            }
        };
        /**
         * Deletes all header values for the given name.
         */
        Headers.prototype.delete = function (name) {
            var lcName = name.toLowerCase();
            this._normalizedNames.delete(lcName);
            this._headers.delete(lcName);
        };
        Headers.prototype.forEach = function (fn) {
            var _this = this;
            this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
        };
        /**
         * Returns first header that matches given name.
         */
        Headers.prototype.get = function (name) {
            var values = this.getAll(name);
            if (values === null) {
                return null;
            }
            return values.length > 0 ? values[0] : null;
        };
        /**
         * Checks for existence of header by given name.
         */
        Headers.prototype.has = function (name) { return this._headers.has(name.toLowerCase()); };
        /**
         * Returns the names of the headers
         */
        Headers.prototype.keys = function () { return Array.from(this._normalizedNames.values()); };
        /**
         * Sets or overrides header value for given name.
         */
        Headers.prototype.set = function (name, value) {
            if (Array.isArray(value)) {
                if (value.length) {
                    this._headers.set(name.toLowerCase(), [value.join(',')]);
                }
            }
            else {
                this._headers.set(name.toLowerCase(), [value]);
            }
            this.mayBeSetNormalizedName(name);
        };
        /**
         * Returns values of all headers.
         */
        Headers.prototype.values = function () { return Array.from(this._headers.values()); };
        /**
         * Returns string of all headers.
         */
        // TODO(vicb): returns {[name: string]: string[]}
        Headers.prototype.toJSON = function () {
            var _this = this;
            var serialized = {};
            this._headers.forEach(function (values, name) {
                var split = [];
                values.forEach(function (v) { return split.push.apply(split, __spread(v.split(','))); });
                serialized[_this._normalizedNames.get(name)] = split;
            });
            return serialized;
        };
        /**
         * Returns list of header values for a given name.
         */
        Headers.prototype.getAll = function (name) {
            return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
        };
        /**
         * This method is not implemented.
         */
        Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
        Headers.prototype.mayBeSetNormalizedName = function (name) {
            var lcName = name.toLowerCase();
            if (!this._normalizedNames.has(lcName)) {
                this._normalizedNames.set(lcName, name);
            }
        };
        return Headers;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates a response options object to be optionally provided when instantiating a
     * {@link Response}.
     *
     * This class is based on the `ResponseInit` description in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#responseinit).
     *
     * All values are null by default. Typical defaults can be found in the
     * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
     *
     * This class may be used in tests to build {@link Response Responses} for
     * mock responses (see {@link MockBackend}).
     *
     * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from '@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: '{"name":"Jeff"}'
     * });
     * var res = new Response(options);
     *
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var ResponseOptions = /** @class */ (function () {
        function ResponseOptions(opts) {
            if (opts === void 0) { opts = {}; }
            var body = opts.body, status = opts.status, headers = opts.headers, statusText = opts.statusText, type = opts.type, url = opts.url;
            this.body = body != null ? body : null;
            this.status = status != null ? status : null;
            this.headers = headers != null ? headers : null;
            this.statusText = statusText != null ? statusText : null;
            this.type = type != null ? type : null;
            this.url = url != null ? url : null;
        }
        /**
         * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
         * override
         * existing values. This method will not change the values of the instance on which it is being
         * called.
         *
         * This may be useful when sharing a base `ResponseOptions` object inside tests,
         * where certain properties may change from test to test.
         *
         * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
         *
         * ```typescript
         * import {ResponseOptions, Response} from '@angular/http';
         *
         * var options = new ResponseOptions({
         *   body: {name: 'Jeff'}
         * });
         * var res = new Response(options.merge({
         *   url: 'https://google.com'
         * }));
         * console.log('options.url:', options.url); // null
         * console.log('res.json():', res.json()); // Object {name: "Jeff"}
         * console.log('res.url:', res.url); // https://google.com
         * ```
         */
        ResponseOptions.prototype.merge = function (options) {
            return new ResponseOptions({
                body: options && options.body != null ? options.body : this.body,
                status: options && options.status != null ? options.status : this.status,
                headers: options && options.headers != null ? options.headers : this.headers,
                statusText: options && options.statusText != null ? options.statusText : this.statusText,
                type: options && options.type != null ? options.type : this.type,
                url: options && options.url != null ? options.url : this.url,
            });
        };
        return ResponseOptions;
    }());
    /**
     * Subclass of {@link ResponseOptions}, with default values.
     *
     * Default values:
     *  * status: 200
     *  * headers: empty {@link Headers} object
     *
     * This class could be extended and bound to the {@link ResponseOptions} class
     * when configuring an {@link Injector}, in order to override the default options
     * used by {@link Http} to create {@link Response Responses}.
     *
     * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
     *
     * ```typescript
     * import {provide} from '@angular/core';
     * import {bootstrap} from '@angular/platform-browser/browser';
     * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
     * '@angular/http';
     * import {App} from './myapp';
     *
     * class MyOptions extends BaseResponseOptions {
     *   headers:Headers = new Headers({network: 'github'});
     * }
     *
     * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
     * ```
     *
     * The options could also be extended when manually creating a {@link Response}
     * object.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
     *
     * ```
     * import {BaseResponseOptions, Response} from '@angular/http';
     *
     * var options = new BaseResponseOptions();
     * var res = new Response(options.merge({
     *   body: 'Angular',
     *   headers: new Headers({framework: 'angular'})
     * }));
     * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
     * console.log('res.text():', res.text()); // Angular;
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var BaseResponseOptions = /** @class */ (function (_super) {
        __extends$1(BaseResponseOptions, _super);
        function BaseResponseOptions() {
            return _super.call(this, { status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() }) || this;
        }
        BaseResponseOptions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BaseResponseOptions.ctorParameters = function () { return []; };
        return BaseResponseOptions;
    }(ResponseOptions));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Abstract class from which real backends are derived.
     *
     * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
     * {@link Request}.
     *
     * @deprecated see https://angular.io/guide/http
     */
    var ConnectionBackend = /** @class */ (function () {
        function ConnectionBackend() {
        }
        return ConnectionBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function normalizeMethodName(method) {
        if (typeof method !== 'string')
            return method;
        switch (method.toUpperCase()) {
            case 'GET':
                return RequestMethod.Get;
            case 'POST':
                return RequestMethod.Post;
            case 'PUT':
                return RequestMethod.Put;
            case 'DELETE':
                return RequestMethod.Delete;
            case 'OPTIONS':
                return RequestMethod.Options;
            case 'HEAD':
                return RequestMethod.Head;
            case 'PATCH':
                return RequestMethod.Patch;
        }
        throw new Error("Invalid request method. The method \"" + method + "\" is not supported.");
    }

    function stringToArrayBuffer(input) {
        var view = new Uint16Array(input.length);
        for (var i = 0, strLen = input.length; i < strLen; i++) {
            view[i] = input.charCodeAt(i);
        }
        return view.buffer;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function paramParser(rawParams) {
        if (rawParams === void 0) { rawParams = ''; }
        var map = new Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&');
            params.forEach(function (param) {
                var eqIdx = param.indexOf('=');
                var _a = __read(eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], 2), key = _a[0], val = _a[1];
                var list = map.get(key) || [];
                list.push(val);
                map.set(key, list);
            });
        }
        return map;
    }
    /**
     * @deprecated see https://angular.io/guide/http
     **/
    var QueryEncoder = /** @class */ (function () {
        function QueryEncoder() {
        }
        QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
        QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
        return QueryEncoder;
    }());
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
     * Map-like representation of url search parameters, based on
     * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
     * with several extensions for merging URLSearchParams objects:
     *   - setAll()
     *   - appendAll()
     *   - replaceAll()
     *
     * This class accepts an optional second parameter of ${@link QueryEncoder},
     * which is used to serialize parameters before making a request. By default,
     * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
     * and then un-encodes certain characters that are allowed to be part of the query
     * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
     *
     * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
     *
     * If the set of allowed query characters is not acceptable for a particular backend,
     * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
     *
     * ```
     * import {URLSearchParams, QueryEncoder} from '@angular/http';
     * class MyQueryEncoder extends QueryEncoder {
     *   encodeKey(k: string): string {
     *     return myEncodingFunction(k);
     *   }
     *
     *   encodeValue(v: string): string {
     *     return myEncodingFunction(v);
     *   }
     * }
     *
     * let params = new URLSearchParams('', new MyQueryEncoder());
     * ```
     * @deprecated see https://angular.io/guide/http
     */
    var URLSearchParams = /** @class */ (function () {
        function URLSearchParams(rawParams, queryEncoder) {
            if (rawParams === void 0) { rawParams = ''; }
            if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
            this.rawParams = rawParams;
            this.queryEncoder = queryEncoder;
            this.paramsMap = paramParser(rawParams);
        }
        URLSearchParams.prototype.clone = function () {
            var clone = new URLSearchParams('', this.queryEncoder);
            clone.appendAll(this);
            return clone;
        };
        URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
        URLSearchParams.prototype.get = function (param) {
            var storedParam = this.paramsMap.get(param);
            return Array.isArray(storedParam) ? storedParam[0] : null;
        };
        URLSearchParams.prototype.getAll = function (param) { return this.paramsMap.get(param) || []; };
        URLSearchParams.prototype.set = function (param, val) {
            if (val === void 0 || val === null) {
                this.delete(param);
                return;
            }
            var list = this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(val);
            this.paramsMap.set(param, list);
        };
        // A merge operation
        // For each name-values pair in `searchParams`, perform `set(name, values[0])`
        //
        // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
        //
        // TODO(@caitp): document this better
        URLSearchParams.prototype.setAll = function (searchParams) {
            var _this = this;
            searchParams.paramsMap.forEach(function (value, param) {
                var list = _this.paramsMap.get(param) || [];
                list.length = 0;
                list.push(value[0]);
                _this.paramsMap.set(param, list);
            });
        };
        URLSearchParams.prototype.append = function (param, val) {
            if (val === void 0 || val === null)
                return;
            var list = this.paramsMap.get(param) || [];
            list.push(val);
            this.paramsMap.set(param, list);
        };
        // A merge operation
        // For each name-values pair in `searchParams`, perform `append(name, value)`
        // for each value in `values`.
        //
        // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
        //
        // TODO(@caitp): document this better
        URLSearchParams.prototype.appendAll = function (searchParams) {
            var _this = this;
            searchParams.paramsMap.forEach(function (value, param) {
                var list = _this.paramsMap.get(param) || [];
                for (var i = 0; i < value.length; ++i) {
                    list.push(value[i]);
                }
                _this.paramsMap.set(param, list);
            });
        };
        // A merge operation
        // For each name-values pair in `searchParams`, perform `delete(name)`,
        // followed by `set(name, values)`
        //
        // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
        //
        // TODO(@caitp): document this better
        URLSearchParams.prototype.replaceAll = function (searchParams) {
            var _this = this;
            searchParams.paramsMap.forEach(function (value, param) {
                var list = _this.paramsMap.get(param) || [];
                list.length = 0;
                for (var i = 0; i < value.length; ++i) {
                    list.push(value[i]);
                }
                _this.paramsMap.set(param, list);
            });
        };
        URLSearchParams.prototype.toString = function () {
            var _this = this;
            var paramsList = [];
            this.paramsMap.forEach(function (values, k) {
                values.forEach(function (v) { return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v)); });
            });
            return paramsList.join('&');
        };
        URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
        return URLSearchParams;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * HTTP request body used by both {@link Request} and {@link Response}
     * https://fetch.spec.whatwg.org/#body
     */
    var Body = /** @class */ (function () {
        function Body() {
        }
        /**
         * Attempts to return body as parsed `JSON` object, or raises an exception.
         */
        Body.prototype.json = function () {
            if (typeof this._body === 'string') {
                return JSON.parse(this._body);
            }
            if (this._body instanceof ArrayBuffer) {
                return JSON.parse(this.text());
            }
            return this._body;
        };
        /**
         * Returns the body as a string, presuming `toString()` can be called on the response body.
         *
         * When decoding an `ArrayBuffer`, the optional `encodingHint` parameter determines how the
         * bytes in the buffer will be interpreted. Valid values are:
         *
         * - `legacy` - incorrectly interpret the bytes as UTF-16 (technically, UCS-2). Only characters
         *   in the Basic Multilingual Plane are supported, surrogate pairs are not handled correctly.
         *   In addition, the endianness of the 16-bit octet pairs in the `ArrayBuffer` is not taken
         *   into consideration. This is the default behavior to avoid breaking apps, but should be
         *   considered deprecated.
         *
         * - `iso-8859` - interpret the bytes as ISO-8859 (which can be used for ASCII encoded text).
         */
        Body.prototype.text = function (encodingHint) {
            if (encodingHint === void 0) { encodingHint = 'legacy'; }
            if (this._body instanceof URLSearchParams) {
                return this._body.toString();
            }
            if (this._body instanceof ArrayBuffer) {
                switch (encodingHint) {
                    case 'legacy':
                        return String.fromCharCode.apply(null, new Uint16Array(this._body));
                    case 'iso-8859':
                        return String.fromCharCode.apply(null, new Uint8Array(this._body));
                    default:
                        throw new Error("Invalid value for encodingHint: " + encodingHint);
                }
            }
            if (this._body == null) {
                return '';
            }
            if (typeof this._body === 'object') {
                return JSON.stringify(this._body, null, 2);
            }
            return this._body.toString();
        };
        /**
         * Return the body as an ArrayBuffer
         */
        Body.prototype.arrayBuffer = function () {
            if (this._body instanceof ArrayBuffer) {
                return this._body;
            }
            return stringToArrayBuffer(this.text());
        };
        /**
          * Returns the request's body as a Blob, assuming that body exists.
          */
        Body.prototype.blob = function () {
            if (this._body instanceof Blob) {
                return this._body;
            }
            if (this._body instanceof ArrayBuffer) {
                return new Blob([this._body]);
            }
            throw new Error('The request body isn\'t either a blob or an array buffer');
        };
        return Body;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates `Response` instances from provided values.
     *
     * Though this object isn't
     * usually instantiated by end-users, it is the primary object interacted with when it comes time to
     * add data to a view.
     *
     * ### Example
     *
     * ```
     * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
     * ```
     *
     * The Response's interface is inspired by the Response constructor defined in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
     * can be accessed many times. There are other differences in the implementation, but this is the
     * most significant.
     *
     * @deprecated see https://angular.io/guide/http
     */
    var Response = /** @class */ (function (_super) {
        __extends$1(Response, _super);
        function Response(responseOptions) {
            var _this = _super.call(this) || this;
            _this._body = responseOptions.body;
            _this.status = responseOptions.status;
            _this.ok = (_this.status >= 200 && _this.status <= 299);
            _this.statusText = responseOptions.statusText;
            _this.headers = responseOptions.headers;
            _this.type = responseOptions.type;
            _this.url = responseOptions.url;
            return _this;
        }
        Response.prototype.toString = function () {
            return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
        };
        return Response;
    }(Body));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var _nextRequestId = 0;
    var JSONP_HOME = '__ng_jsonp__';
    var _jsonpConnections = null;
    function _getJsonpConnections() {
        var w = typeof window == 'object' ? window : {};
        if (_jsonpConnections === null) {
            _jsonpConnections = w[JSONP_HOME] = {};
        }
        return _jsonpConnections;
    }
    // Make sure not to evaluate this in a non-browser environment!
    var BrowserJsonp = /** @class */ (function () {
        function BrowserJsonp() {
        }
        // Construct a <script> element with the specified URL
        BrowserJsonp.prototype.build = function (url) {
            var node = document.createElement('script');
            node.src = url;
            return node;
        };
        BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
        BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
        BrowserJsonp.prototype.exposeConnection = function (id, connection) {
            var connections = _getJsonpConnections();
            connections[id] = connection;
        };
        BrowserJsonp.prototype.removeConnection = function (id) {
            var connections = _getJsonpConnections();
            connections[id] = null;
        };
        // Attach the <script> element to the DOM
        BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
        // Remove <script> element from the DOM
        BrowserJsonp.prototype.cleanup = function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild((node));
            }
        };
        BrowserJsonp.decorators = [
            { type: core.Injectable }
        ];
        return BrowserJsonp;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
    var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
    /**
     * Base class for an in-flight JSONP request.
     *
     * @deprecated see https://angular.io/guide/http
     */
    var JSONPConnection = /** @class */ (function () {
        /** @internal */
        function JSONPConnection(req, _dom, baseResponseOptions) {
            var _this = this;
            this._dom = _dom;
            this.baseResponseOptions = baseResponseOptions;
            this._finished = false;
            if (req.method !== RequestMethod.Get) {
                throw new TypeError(JSONP_ERR_WRONG_METHOD);
            }
            this.request = req;
            this.response = new rxjs.Observable(function (responseObserver) {
                _this.readyState = ReadyState.Loading;
                var id = _this._id = _dom.nextRequestID();
                _dom.exposeConnection(id, _this);
                // Workaround Dart
                // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
                var callback = _dom.requestCallback(_this._id);
                var url = req.url;
                if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                    url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
                }
                else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                    url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
                }
                var script = _this._script = _dom.build(url);
                var onLoad = function (event) {
                    if (_this.readyState === ReadyState.Cancelled)
                        return;
                    _this.readyState = ReadyState.Done;
                    _dom.cleanup(script);
                    if (!_this._finished) {
                        var responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
                        if (baseResponseOptions) {
                            responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                        }
                        responseObserver.error(new Response(responseOptions_1));
                        return;
                    }
                    var responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
                    if (_this.baseResponseOptions) {
                        responseOptions = _this.baseResponseOptions.merge(responseOptions);
                    }
                    responseObserver.next(new Response(responseOptions));
                    responseObserver.complete();
                };
                var onError = function (error) {
                    if (_this.readyState === ReadyState.Cancelled)
                        return;
                    _this.readyState = ReadyState.Done;
                    _dom.cleanup(script);
                    var responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                    if (baseResponseOptions) {
                        responseOptions = baseResponseOptions.merge(responseOptions);
                    }
                    responseObserver.error(new Response(responseOptions));
                };
                script.addEventListener('load', onLoad);
                script.addEventListener('error', onError);
                _dom.send(script);
                return function () {
                    _this.readyState = ReadyState.Cancelled;
                    script.removeEventListener('load', onLoad);
                    script.removeEventListener('error', onError);
                    _this._dom.cleanup(script);
                };
            });
        }
        /**
         * Callback called when the JSONP request completes, to notify the application
         * of the new data.
         */
        JSONPConnection.prototype.finished = function (data) {
            // Don't leak connections
            this._finished = true;
            this._dom.removeConnection(this._id);
            if (this.readyState === ReadyState.Cancelled)
                return;
            this._responseData = data;
        };
        return JSONPConnection;
    }());
    /**
     * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
     *
     * @deprecated see https://angular.io/guide/http
     */
    var JSONPBackend = /** @class */ (function (_super) {
        __extends$1(JSONPBackend, _super);
        /** @internal */
        function JSONPBackend(_browserJSONP, _baseResponseOptions) {
            var _this = _super.call(this) || this;
            _this._browserJSONP = _browserJSONP;
            _this._baseResponseOptions = _baseResponseOptions;
            return _this;
        }
        JSONPBackend.prototype.createConnection = function (request) {
            return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
        };
        JSONPBackend.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JSONPBackend.ctorParameters = function () { return [
            { type: BrowserJsonp },
            { type: ResponseOptions }
        ]; };
        return JSONPBackend;
    }(ConnectionBackend));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates a request options object to be optionally provided when instantiating a
     * {@link Request}.
     *
     * This class is based on the `RequestInit` description in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#requestinit).
     *
     * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
     * class, which sub-classes `RequestOptions`.
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '@angular/http';
     *
     * const options = new RequestOptions({
     *   method: RequestMethod.Post,
     *   url: 'https://google.com'
     * });
     * const req = new Request(options);
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // https://google.com
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var RequestOptions = /** @class */ (function () {
        // TODO(Dzmitry): remove search when this.search is removed
        function RequestOptions(opts) {
            if (opts === void 0) { opts = {}; }
            var method = opts.method, headers = opts.headers, body = opts.body, url = opts.url, search = opts.search, params = opts.params, withCredentials = opts.withCredentials, responseType = opts.responseType;
            this.method = method != null ? normalizeMethodName(method) : null;
            this.headers = headers != null ? headers : null;
            this.body = body != null ? body : null;
            this.url = url != null ? url : null;
            this.params = this._mergeSearchParams(params || search);
            this.withCredentials = withCredentials != null ? withCredentials : null;
            this.responseType = responseType != null ? responseType : null;
        }
        Object.defineProperty(RequestOptions.prototype, "search", {
            /**
             * @deprecated from 4.0.0. Use params instead.
             */
            get: function () { return this.params; },
            /**
             * @deprecated from 4.0.0. Use params instead.
             */
            set: function (params) { this.params = params; },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
         * existing values. This method will not change the values of the instance on which it is being
         * called.
         *
         * Note that `headers` and `search` will override existing values completely if present in
         * the `options` object. If these values should be merged, it should be done prior to calling
         * `merge` on the `RequestOptions` instance.
         *
         * ```typescript
         * import {RequestOptions, Request, RequestMethod} from '@angular/http';
         *
         * const options = new RequestOptions({
         *   method: RequestMethod.Post
         * });
         * const req = new Request(options.merge({
         *   url: 'https://google.com'
         * }));
         * console.log('req.method:', RequestMethod[req.method]); // Post
         * console.log('options.url:', options.url); // null
         * console.log('req.url:', req.url); // https://google.com
         * ```
         */
        RequestOptions.prototype.merge = function (options) {
            return new RequestOptions({
                method: options && options.method != null ? options.method : this.method,
                headers: options && options.headers != null ? options.headers : new Headers(this.headers),
                body: options && options.body != null ? options.body : this.body,
                url: options && options.url != null ? options.url : this.url,
                params: options && this._mergeSearchParams(options.params || options.search),
                withCredentials: options && options.withCredentials != null ? options.withCredentials :
                    this.withCredentials,
                responseType: options && options.responseType != null ? options.responseType :
                    this.responseType
            });
        };
        RequestOptions.prototype._mergeSearchParams = function (params) {
            if (!params)
                return this.params;
            if (params instanceof URLSearchParams) {
                return params.clone();
            }
            if (typeof params === 'string') {
                return new URLSearchParams(params);
            }
            return this._parseParams(params);
        };
        RequestOptions.prototype._parseParams = function (objParams) {
            var _this = this;
            if (objParams === void 0) { objParams = {}; }
            var params = new URLSearchParams();
            Object.keys(objParams).forEach(function (key) {
                var value = objParams[key];
                if (Array.isArray(value)) {
                    value.forEach(function (item) { return _this._appendParam(key, item, params); });
                }
                else {
                    _this._appendParam(key, value, params);
                }
            });
            return params;
        };
        RequestOptions.prototype._appendParam = function (key, value, params) {
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            params.append(key, value);
        };
        return RequestOptions;
    }());
    /**
     * Subclass of {@link RequestOptions}, with default values.
     *
     * Default values:
     *  * method: {@link RequestMethod RequestMethod.Get}
     *  * headers: empty {@link Headers} object
     *
     * This class could be extended and bound to the {@link RequestOptions} class
     * when configuring an {@link Injector}, in order to override the default options
     * used by {@link Http} to create and send {@link Request Requests}.
     *
     * ```typescript
     * import {BaseRequestOptions, RequestOptions} from '@angular/http';
     *
     * class MyOptions extends BaseRequestOptions {
     *   search: string = 'coreTeam=true';
     * }
     *
     * {provide: RequestOptions, useClass: MyOptions};
     * ```
     *
     * The options could also be extended when manually creating a {@link Request}
     * object.
     *
     * ```
     * import {BaseRequestOptions, Request, RequestMethod} from '@angular/http';
     *
     * const options = new BaseRequestOptions();
     * const req = new Request(options.merge({
     *   method: RequestMethod.Post,
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var BaseRequestOptions = /** @class */ (function (_super) {
        __extends$1(BaseRequestOptions, _super);
        function BaseRequestOptions() {
            return _super.call(this, { method: RequestMethod.Get, headers: new Headers() }) || this;
        }
        BaseRequestOptions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BaseRequestOptions.ctorParameters = function () { return []; };
        return BaseRequestOptions;
    }(RequestOptions));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // TODO(jeffbcross): properly implement body accessors
    /**
     * Creates `Request` instances from provided values.
     *
     * The Request's interface is inspired by the Request constructor defined in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#request-class),
     * but is considered a static value whose body can be accessed many times. There are other
     * differences in the implementation, but this is the most significant.
     *
     * `Request` instances are typically created by higher-level classes, like {@link Http} and
     * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
     * One such example is when creating services that wrap higher-level services, like {@link Http},
     * where it may be useful to generate a `Request` with arbitrary headers and search params.
     *
     * ```typescript
     * import {Injectable, Injector} from '@angular/core';
     * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
     *
     * @Injectable()
     * class AutoAuthenticator {
     *   constructor(public http:Http) {}
     *   request(url:string) {
     *     return this.http.request(new Request({
     *       method: RequestMethod.Get,
     *       url: url,
     *       search: 'password=123'
     *     }));
     *   }
     * }
     *
     * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
     * var authenticator = injector.get(AutoAuthenticator);
     * authenticator.request('people.json').subscribe(res => {
     *   //URL should have included '?password=123'
     *   console.log('people', res.json());
     * });
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var Request = /** @class */ (function (_super) {
        __extends$1(Request, _super);
        function Request(requestOptions) {
            var _this = _super.call(this) || this;
            // TODO: assert that url is present
            var url = requestOptions.url;
            _this.url = requestOptions.url;
            var paramsArg = requestOptions.params || requestOptions.search;
            if (paramsArg) {
                var params = void 0;
                if (typeof paramsArg === 'object' && !(paramsArg instanceof URLSearchParams)) {
                    params = urlEncodeParams(paramsArg).toString();
                }
                else {
                    params = paramsArg.toString();
                }
                if (params.length > 0) {
                    var prefix = '?';
                    if (_this.url.indexOf('?') != -1) {
                        prefix = (_this.url[_this.url.length - 1] == '&') ? '' : '&';
                    }
                    // TODO: just delete search-query-looking string in url?
                    _this.url = url + prefix + params;
                }
            }
            _this._body = requestOptions.body;
            _this.method = normalizeMethodName(requestOptions.method);
            // TODO(jeffbcross): implement behavior
            // Defaults to 'omit', consistent with browser
            _this.headers = new Headers(requestOptions.headers);
            _this.contentType = _this.detectContentType();
            _this.withCredentials = requestOptions.withCredentials;
            _this.responseType = requestOptions.responseType;
            return _this;
        }
        /**
         * Returns the content type enum based on header options.
         */
        Request.prototype.detectContentType = function () {
            switch (this.headers.get('content-type')) {
                case 'application/json':
                    return ContentType.JSON;
                case 'application/x-www-form-urlencoded':
                    return ContentType.FORM;
                case 'multipart/form-data':
                    return ContentType.FORM_DATA;
                case 'text/plain':
                case 'text/html':
                    return ContentType.TEXT;
                case 'application/octet-stream':
                    return this._body instanceof ArrayBuffer$1 ? ContentType.ARRAY_BUFFER : ContentType.BLOB;
                default:
                    return this.detectContentTypeFromBody();
            }
        };
        /**
         * Returns the content type of request's body based on its type.
         */
        Request.prototype.detectContentTypeFromBody = function () {
            if (this._body == null) {
                return ContentType.NONE;
            }
            else if (this._body instanceof URLSearchParams) {
                return ContentType.FORM;
            }
            else if (this._body instanceof FormData) {
                return ContentType.FORM_DATA;
            }
            else if (this._body instanceof Blob$1) {
                return ContentType.BLOB;
            }
            else if (this._body instanceof ArrayBuffer$1) {
                return ContentType.ARRAY_BUFFER;
            }
            else if (this._body && typeof this._body === 'object') {
                return ContentType.JSON;
            }
            else {
                return ContentType.TEXT;
            }
        };
        /**
         * Returns the request's body according to its type. If body is undefined, return
         * null.
         */
        Request.prototype.getBody = function () {
            switch (this.contentType) {
                case ContentType.JSON:
                    return this.text();
                case ContentType.FORM:
                    return this.text();
                case ContentType.FORM_DATA:
                    return this._body;
                case ContentType.TEXT:
                    return this.text();
                case ContentType.BLOB:
                    return this.blob();
                case ContentType.ARRAY_BUFFER:
                    return this.arrayBuffer();
                default:
                    return null;
            }
        };
        return Request;
    }(Body));
    function urlEncodeParams(params) {
        var searchParams = new URLSearchParams();
        Object.keys(params).forEach(function (key) {
            var value = params[key];
            if (value && Array.isArray(value)) {
                value.forEach(function (element) { return searchParams.append(key, element.toString()); });
            }
            else {
                searchParams.append(key, value.toString());
            }
        });
        return searchParams;
    }
    var noop = function () { };
    var w = typeof window == 'object' ? window : noop;
    var FormData = w /** TODO #9100 */['FormData'] || noop;
    var Blob$1 = w /** TODO #9100 */['Blob'] || noop;
    var ArrayBuffer$1 = w /** TODO #9100 */['ArrayBuffer'] || noop;

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function httpRequest(backend, request) {
        return backend.createConnection(request).response;
    }
    function mergeOptions(defaultOpts, providedOpts, method, url) {
        var newOptions = defaultOpts;
        if (providedOpts) {
            // Hack so Dart can used named parameters
            return newOptions.merge(new RequestOptions({
                method: providedOpts.method || method,
                url: providedOpts.url || url,
                search: providedOpts.search,
                params: providedOpts.params,
                headers: providedOpts.headers,
                body: providedOpts.body,
                withCredentials: providedOpts.withCredentials,
                responseType: providedOpts.responseType
            }));
        }
        return newOptions.merge(new RequestOptions({ method: method, url: url }));
    }
    /**
     * Performs http requests using `XMLHttpRequest` as the default backend.
     *
     * `Http` is available as an injectable class, with methods to perform http requests. Calling
     * `request` returns an `Observable` which will emit a single {@link Response} when a
     * response is received.
     *
     * ### Example
     *
     * ```typescript
     * import {Http, HTTP_PROVIDERS} from '@angular/http';
     * import {map} from 'rxjs/operators';
     *
     * @Component({
     *   selector: 'http-app',
     *   viewProviders: [HTTP_PROVIDERS],
     *   templateUrl: 'people.html'
     * })
     * class PeopleComponent {
     *   constructor(http: Http) {
     *     http.get('people.json')
     *       // Call map on the response observable to get the parsed people object
     *       .pipe(map(res => res.json()))
     *       // Subscribe to the observable to get the parsed people object and attach it to the
     *       // component
     *       .subscribe(people => this.people = people);
     *   }
     * }
     * ```
     *
     *
     * ### Example
     *
     * ```
     * http.get('people.json').subscribe((res:Response) => this.people = res.json());
     * ```
     *
     * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
     * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
     * the {@link XHRBackend} provider, as in the following example:
     *
     * ### Example
     *
     * ```typescript
     * import {BaseRequestOptions, Http} from '@angular/http';
     * import {MockBackend} from '@angular/http/testing';
     * var injector = Injector.resolveAndCreate([
     *   BaseRequestOptions,
     *   MockBackend,
     *   {provide: Http, useFactory:
     *       function(backend, defaultOptions) {
     *         return new Http(backend, defaultOptions);
     *       },
     *       deps: [MockBackend, BaseRequestOptions]}
     * ]);
     * var http = injector.get(Http);
     * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
     * ```
     *
     * @deprecated see https://angular.io/guide/http
     */
    var Http = /** @class */ (function () {
        function Http(_backend, _defaultOptions) {
            this._backend = _backend;
            this._defaultOptions = _defaultOptions;
        }
        /**
         * Performs any type of http request. First argument is required, and can either be a url or
         * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
         * object can be provided as the 2nd argument. The options object will be merged with the values
         * of {@link BaseRequestOptions} before performing the request.
         */
        Http.prototype.request = function (url, options) {
            var responseObservable;
            if (typeof url === 'string') {
                responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
            }
            else if (url instanceof Request) {
                responseObservable = httpRequest(this._backend, url);
            }
            else {
                throw new Error('First argument must be a url string or Request instance.');
            }
            return responseObservable;
        };
        /**
         * Performs a request with `get` http method.
         */
        Http.prototype.get = function (url, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
        };
        /**
         * Performs a request with `post` http method.
         */
        Http.prototype.post = function (url, body, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
        };
        /**
         * Performs a request with `put` http method.
         */
        Http.prototype.put = function (url, body, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
        };
        /**
         * Performs a request with `delete` http method.
         */
        Http.prototype.delete = function (url, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
        };
        /**
         * Performs a request with `patch` http method.
         */
        Http.prototype.patch = function (url, body, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
        };
        /**
         * Performs a request with `head` http method.
         */
        Http.prototype.head = function (url, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
        };
        /**
         * Performs a request with `options` http method.
         */
        Http.prototype.options = function (url, options) {
            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
        };
        Http.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Http.ctorParameters = function () { return [
            { type: ConnectionBackend },
            { type: RequestOptions }
        ]; };
        return Http;
    }());
    /**
     * @deprecated see https://angular.io/guide/http
     */
    var Jsonp = /** @class */ (function (_super) {
        __extends$1(Jsonp, _super);
        function Jsonp(backend, defaultOptions) {
            return _super.call(this, backend, defaultOptions) || this;
        }
        /**
         * Performs any type of http request. First argument is required, and can either be a url or
         * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
         * object can be provided as the 2nd argument. The options object will be merged with the values
         * of {@link BaseRequestOptions} before performing the request.
         *
         * @security Regular XHR is the safest alternative to JSONP for most applications, and is
         * supported by all current browsers. Because JSONP creates a `<script>` element with
         * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
         * source could expose your application to XSS risks. Data exposed by JSONP may also be
         * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
         * future security issues (e.g. content sniffing).  For more detail, see the
         * [Security Guide](http://g.co/ng/security).
         */
        Jsonp.prototype.request = function (url, options) {
            var responseObservable;
            if (typeof url === 'string') {
                url =
                    new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
            }
            if (url instanceof Request) {
                if (url.method !== RequestMethod.Get) {
                    throw new Error('JSONP requests must use GET request method.');
                }
                responseObservable = httpRequest(this._backend, url);
            }
            else {
                throw new Error('First argument must be a url string or Request instance.');
            }
            return responseObservable;
        };
        Jsonp.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Jsonp.ctorParameters = function () { return [
            { type: ConnectionBackend },
            { type: RequestOptions }
        ]; };
        return Jsonp;
    }(Http));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @module
     * @description
     * Entry point for all public APIs of the common package.
     */
    /**
     * @deprecated see https://angular.io/guide/http
     */
    var VERSION$1 = new core.Version('6.0.4');

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
                    _this.http.get("/umbraco/api/thirdpartycaching/GetGoogleDirections?request=" + hash).subscribe(function (cacheResponse) {
                        cacheResponse = cacheResponse.json();
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
            { type: Http, },
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
                        imports: [],
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

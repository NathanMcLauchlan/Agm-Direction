import { OnChanges, OnInit, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { Http } from '@angular/http';
export declare class AgmDirection implements OnChanges, OnInit {
    private gmapsApi;
    private http;
    /**
     * LatLng | String | google.maps.Place
     */
    origin: any;
    /**
     * LatLng | String | google.maps.Place
     */
    destination: any;
    travelMode: String;
    transitOptions: any;
    drivingOptions: any;
    waypoints: any;
    optimizeWaypoints: Boolean;
    provideRouteAlternatives: Boolean;
    avoidHighways: Boolean;
    avoidTolls: Boolean;
    renderOptions: any;
    visible: Boolean;
    panel: object | undefined;
    markerOptions: {
        origin: any;
        destination: any;
        waypoints: any;
    };
    infoWindow: InfoWindow;
    renderRoute: any;
    onChange: EventEmitter<any>;
    onResponse: EventEmitter<any>;
    sendInfoWindow: EventEmitter<InfoWindow>;
    directionsService: any;
    directionsDisplay: any;
    private originMarker;
    private destinationMarker;
    private waypointsMarker;
    private isFirstChange;
    constructor(gmapsApi: GoogleMapsAPIWrapper, http: Http);
    ngOnInit(): void;
    ngOnChanges(obj: any): void;
    /**
     * This event is fired when the user creating or updating this direction
     */
    private directionDraw();
    /**
     * Custom Origin and Destination Icon
     * @param map map
     * @param marker marker
     * @param markerOpts properties
     * @param content marker's infowindow content
     * @returns new marker
     * @memberof AgmDirection
     */
    private setMarker(map, marker, markerOpts, content);
}

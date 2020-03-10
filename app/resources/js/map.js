/* eslint-env browser */

import MapView from "./UI/MapView.js";
import platform from "./Maps/mapk.js";
import Geodcoder from "./Maps/Geodcoder.js";

let mapView;

function init() {
    mapView = new MapView();
    mapView.setElement(document.querySelector("#mapContainer"));
    mapView.addMap(initMap());
    mapView.addEventListener("geocode", onGeodcodingRequested);
    Geodcoder.addEventListener("geocodingFinished", onGeocodingFinished);

    let locations = JSON.parse(localStorage.getItem("locations"));
    for (let i = 0; i < locations.length; i++) {
        mapView.requestMarker(locations[i]);
    }
}

function initMap() {
    let defaultLayers = platform.createDefaultLayers(),
        map = new H.Map(document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map, {
            center: { lat: 49.014335, lng: 12.094758 },
            zoom: 14,
            pixelRatio: window.devicePixelRatio || 1
        }),
        behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)),
        ui = H.ui.UI.createDefault(map, defaultLayers);
    window.addEventListener('resize', () => map.getViewPort().resize());
    return { map, ui, behavior };
}

function onGeodcodingRequested(event) {
    let location = event.data.location;
    Geodcoder.getLatLng(location);
}

function onGeocodingFinished(event) {
    let result = event.data.result;
    mapView.addMarker(result);
}

init();


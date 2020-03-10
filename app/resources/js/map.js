/* eslint-env browser */

import platform from "./Maps/mapk.js";

function init() {
    myMap();
}

function myMap() {
    // Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 14,
      center: { lat: 49.014335, lng: 12.094758 }
    });

    var animatedSvg ='<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

    var icon = new H.map.DomIcon(animatedSvg),
    coords = { lat: 49.014335, lng: 12.094758},
    marker = new H.map.DomMarker(coords, {icon: icon});

    map.addObject(marker);
// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'de-DE');
var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');

mapSettings.setAlignment('top-left');
zoom.setAlignment('top-left');
scalebar.setAlignment('top-left');

// Create an info bubble object at a specific geographic location:
var bubble = new H.ui.InfoBubble({ lat: 49.014335, lng: 12.094758 }, {
    content: '<b>Beats Club</b>'
 });

// Add info bubble to the UI:
ui.addBubble(bubble);
}


init();


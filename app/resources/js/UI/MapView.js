/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

const CLUB_MARKER = "../resources/img/map_flag_club.png",
    BAR_MARKER = "../resources/img/map_flag_bar.png",
    ELSE_MARKER = "../resources/img/map_flag_else.png";

class MapView extends View {
    constructor() {
        super();
        this.bubble = undefined;
    }

    setElement(element) {
        super.setElement(element);
    }

    addMap({ map, ui, behavior }) {
        this.map = map;
        this.ui = ui;
        this.behavior = behavior;
    }

    requestMarker(location) {
        let geocodeEvent = new Event("geocode", { location: location });
        this.notifyAll(geocodeEvent);
    }

    addMarker(latLng, location) {
        let position = {
            lat: latLng.location.displayPosition.latitude,
            lng: latLng.location.displayPosition.longitude
        },
            markerAsset,
            asset;

        if (location.art === "Club") {
            let icon = new H.map.Icon(CLUB_MARKER);
            markerAsset = { icon: icon };
            asset = CLUB_MARKER;
        } else if (location.art === "Bar") {
            let icon = new H.map.Icon(BAR_MARKER);
            markerAsset = { icon: icon };
            asset = BAR_MARKER;
        } else {
            let icon = new H.map.Icon(ELSE_MARKER);
            markerAsset = { icon: icon };
            asset = ELSE_MARKER;
        }
        let marker = new H.map.Marker(position, markerAsset);
        marker.label = '<a href="./detailedLocation.html" id="' + location.id + '" class="bubble-link" ><b>' + location.name + '</b>   <img src="' + asset + '"></img><span>(' + location.art + ')<span></a><br>' + location.street + " " + location.housenumber + ",<br>" + location.zip + " " + location.city;
        marker.addEventListener("tap", this.onMarkerTapped.bind(this));
        this.map.addObject(marker);
    }

    openBubble(position, text) {
        if (!this.bubble) {
            this.bubble = new H.ui.InfoBubble(
                position,
                { content: text });
            this.ui.addBubble(this.bubble);
        } else {
            this.bubble.setPosition(position);
            this.bubble.setContent(text);
            this.bubble.open();
        }

        this.element.querySelector(".bubble-link").addEventListener("click", this.onBubbleLinkClicked.bind(this));
    }

    onMarkerTapped(event) {
        this.map.setCenter(event.target.getGeometry());
        this.openBubble(event.target.getGeometry(), event.target.label);
    }

    onBubbleLinkClicked(event) {
        let locationID = event.target.parentElement.getAttribute("id"),
            bubbleLinkEvent = new Event("bubbleClicked", { locationID: locationID });
        console.log(locationID);
        this.notifyAll(bubbleLinkEvent);
    }
}

export default MapView;
/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

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

    addMarker(latLng) {
        let position = {
            lat: latLng.location.displayPosition.latitude,
            lng: latLng.location.displayPosition.longitude
        },
            marker = new H.map.Marker(position);
        marker.label = latLng.location.address.label;
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
    }

    onMarkerTapped(event) {
        this.map.setCenter(event.target.getGeometry());
        this.openBubble(event.target.getGeometry(), event.target.label);
    }
}

export default MapView;
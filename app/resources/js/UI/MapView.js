/* eslint-env browser */

import View from "./View.js";

class MapView extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
    }

    addMap(map) {
        this.map = map,
            self = this;
        window.onload = function () {
            self.moveMapToRegensburg(this.map);
        };
    }

    moveMapToRegensburg(map) {
        map.setCenter({ lat: 49.014335, lng: 12.094758 });
        map.setZoom(14);
    }
}

export default MapView;
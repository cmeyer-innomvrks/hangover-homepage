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

    addMarker(location) {
        // TODO
    }
}

export default MapView;
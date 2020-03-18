/* eslint-env browser */

import View from "../View.js";

class LocationDetailReviews extends View {
    constructor() {
        super();
        this.location = JSON.parse(localStorage.getItem("locationDetail"));
    }

    setAverage() {
        this.element.querySelector(".average").textContent = this.location.average;
        // TODO
    }

    setOverview() {
        // TODO
    }

    showReviews() {
        // TODO
    }
}

export default new LocationDetailReviews();
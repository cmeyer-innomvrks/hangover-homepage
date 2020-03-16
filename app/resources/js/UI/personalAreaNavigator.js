/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

class Navigator extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
        this.eventsBtn = this.element.firstElementChild.nextElementSibling.firstElementChild;
        this.locationsBtn = this.element.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling;
        this.eventsBtn.addEventListener("click", this.onEventsRequested.bind(this));
        this.locationsBtn.addEventListener("click", this.onLocationsRequested.bind(this));
    }

    onEventsRequested() {
        let savedEventsEvent = new Event("savedEvents", {});
        this.notifyAll(savedEventsEvent);
    }

    onLocationsRequested() {
        let savedLocationsEvent = new Event("savedLocations", {});
        this.notifyAll(savedLocationsEvent);
    }

    activateEvents() {
        this.eventsBtn.classList.add("is-active");
        this.locationsBtn.classList.remove("is-active");
    }

    activateLocations() {
        this.eventsBtn.classList.remove("is-active");
        this.locationsBtn.classList.add("is-active");
    }
}

export default new Navigator();
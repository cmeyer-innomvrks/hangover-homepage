/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailNavigator extends View {
    constructor() {
        super();
        this.location = JSON.parse(localStorage.getItem("locationDetail"));
    }

    setElement(element) {
        super.setElement(element);
        this.element.addEventListener("click", this.onClick.bind(this));
        this.infoBtn = this.element.querySelector(".btn-info");
        this.eventBtn = this.element.querySelector(".btn-event");
        this.reviewBtn = this.element.querySelector(".btn-review");
    }

    setLocationName() {
        this.element.firstElementChild.textContent = this.location.name;
    }

    activateInfo() {
        this.infoBtn.classList.add("is-active");
        this.eventBtn.classList.remove("is-active");
        this.reviewBtn.classList.remove("is-active");
    }

    activateEvents() {
        this.infoBtn.classList.remove("is-active");
        this.eventBtn.classList.add("is-active");
        this.reviewBtn.classList.remove("is-active");
    }

    activateReviews() {
        this.infoBtn.classList.remove("is-active");
        this.eventBtn.classList.remove("is-active");
        this.reviewBtn.classList.add("is-active");
    }

    onClick(event) {
        let target = event.target,
            clickEvent;
        if (target.classList.contains("btn-info")) {
            clickEvent = new Event("infoRequested", {});
        }
        if (target.classList.contains("btn-event")) {
            clickEvent = new Event("eventRequested", {});
        }
        if (target.classList.contains("btn-review")) {
            clickEvent = new Event("reviewRequested", {});
        }
        if (clickEvent) {
            this.notifyAll(clickEvent);
        }
    }
}

export default new LocationDetailNavigator();
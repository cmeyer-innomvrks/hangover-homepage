/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailCard extends View {
    constructor() {
        super();
        this.location = JSON.parse(localStorage.getItem("locationDetail"));
    }

    setElement(element) {
        super.setElement(element);
        if (JSON.parse(localStorage.getItem("isSignedIn"))) {
            let checkIfSavedEvent = new Event("isEventSaved", { id: this.event.id });
            this.notifyAll(checkIfSavedEvent);
        } else {
            // TODO this.element.querySelector("").classList.add("inactive");
        }
    }

    updateNavigator() {
        let listItems = this.element.querySelector(".breadcrumb").getElementsByTagName("li");
        listItems[1].firstElementChild.textContent = this.location.art;
        listItems[2].textContent = this.location.name;
        /* TODO localStorage.setItem("locationDetail", JSON.stringify(this.location)); */
    }

    displayLocation() {
        let card = this.element.querySelector(".card");
        if (this.event.image !== "") {
            card.querySelector(".card-img-top").src = this.location.image;
        } else {
            card.querySelector(".card-img-top").src = "../resources/img/Hangover_Logo_mit_Schrift.png";
        }
        /* TODO card.querySelector(".event-date").textContent = this.event.date;
        card.querySelector(".event-title").textContent = this.event.headline;
        card.querySelector(".card-text").textContent = this.event.info;
        card.querySelector(".event-time").textContent = this.event.time;
        card.querySelector(".event-cost").textContent = this.event.price;
        card.querySelector(".event-musik").textContent = this.event.music; */

    }

    setSavedStatus(status) {
        this.saveStatus = status;
        this.element.querySelector("#save-location").checked = status;
        this.element.querySelector("#save-location").addEventListener("click", this.onSave.bind(this));
    }

    onSave() {
        if (this.saveStatus) {
            let requesUnsaveEvent = new Event("unsaveLocation", { id: this.location.id });
            this.notifyAll(requesUnsaveEvent);
            this.saveStatus = false;
        } else {
            let requestSaveEvent = new Event("saveLocation", { id: this.location.id });
            this.notifyAll(requestSaveEvent);
            this.saveStatus = true;
        }
    }
}

export default LocationDetailCard;
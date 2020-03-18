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
            let checkIfSavedEvent = new Event("isLocationSaved", { id: this.location.id });
            this.notifyAll(checkIfSavedEvent);
        } else {
            this.element.querySelector(".save-event").classList.add("inactive");
        }
    }

    displayLocation() {
        let card = this.element;
        card.querySelector(".art").textContent = this.location.art;
        card.querySelector(".info").textContent = this.location.info;

        // ÖFFNUNGSZEITEN
        if (this.location.monday_from !== "") {
            card.querySelector("#monday-from").textContent = this.location.monday_from;
            card.querySelector(".monday-till").textContent = this.location.monday_till;
        } else {
            card.querySelector("#monday-from").textContent = "- geschlossen";
        }
        if (this.location.tuesday_from !== "") {
            card.querySelector("#tuesday-from").textContent = this.location.tuesday_from;
            card.querySelector(".tuesday-till").textContent = this.location.tuesday_till;
        } else {
            card.querySelector("#tuesday-from").textContent = "- geschlossen";
        }
        if (this.location.wednesday_from !== "") {
            card.querySelector("#wednesday-from").textContent = this.location.wednesday_from;
            card.querySelector(".wednesday-till").textContent = this.location.wednesday_till;
        } else {
            card.querySelector("#wednesday-from").textContent = "- geschlossen";
        }
        if (this.location.thursday_from !== "") {
            card.querySelector("#thursday-from").textContent = this.location.thursday_from;
            card.querySelector(".thursday-till").textContent = this.location.thursday_till;
        } else {
            card.querySelector("#thursday-from").textContent = "- geschlossen";
        }
        if (this.location.friday_from !== "") {
            card.querySelector("#friday-from").textContent = this.location.friday_from;
            card.querySelector(".friday-till").textContent = this.location.friday_till;
        } else {
            card.querySelector("#friday-from").textContent = "- geschlossen";
        }
        if (this.location.saturday_from !== "") {
            card.querySelector("#saturday-from").textContent = this.location.saturday_from;
            card.querySelector(".saturday-till").textContent = this.location.saturday_till;
        } else {
            card.querySelector("#saturday-from").textContent = "- geschlossen";
        }
        if (this.location.sunday_from !== "") {
            card.querySelector("#sunday-from").textContent = this.location.sunday_from;
            card.querySelector(".sunday-till").textContent = this.location.sunday_till;
        } else {
            card.querySelector("#sunday-from").textContent = "- geschlossen";
        }
    }

    setSavedStatus(status) {
        console.log(status);
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
/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js"

class PersonalLocations extends View {
    constructor() {
        super();
    }

    getSavedLocations(locationIDs) {
        let locations = JSON.parse(localStorage.getItem("locations")),
            result = [];
        for (let i = 0; i < locations.length; i++) {
            for (let j = 0; j < locationIDs.length; j++) {
                if (locations[i].id === locationIDs[j]) {
                    result.push(locations[i]);
                }
            }
        }
        this.savedlocations = result;
    }

    displaySavedLocations() {
        if (this.savedlocations.length > 0) {
            this.element.innerHTML = "";
            for (let i = 0; i < this.savedlocations.length; i++) {
                let current = this.getLocationElement(this.savedlocations[i]);
                this.element.appendChild(current);
            }
        } else {
            this.element.innerHTML = "Noch keine gespeicherten Locations...";
        }
    }

    getLocationElement(location) {
        let template = document.querySelector(".location-template").innerHTML.trim(),
            item = document.createElement("div");
        item.innerHTML = template;
        if (location.image !== "") {
            item.querySelector(".card-img-top").src = location.image;
        } else {
            item.querySelector(".card-img-top").src = "../resources/img/Hangover_Logo_mit_Schrift.png";
        }
        item.querySelector(".location-name").textContent = location.name;
        item.querySelector(".location-street").textContent = location.street;
        item.querySelector(".location-housenumber").textContent = location.housenumber;
        item.querySelector(".location-zip").textContent = location.zip;
        item.querySelector(".location-city").textContent = location.city;
        item.querySelector(".location-art").textContent = location.art;

        item.querySelector("#location-average").textContent = location.average;
        if (location.average === "") {
            item.querySelector(".location-star").classList.add("hidden");
        }

        item = item.firstElementChild;
        item.setAttribute("id", location.id);
        item.addEventListener("click", this.onClick.bind(this));
        return item;
    }

    onClick(event) {
        let target = event.target,
            originalTarget = event.target;
        while (target.getAttribute("id") === null) {
            target = target.parentElement;
        }
        if (originalTarget.classList.contains("unsave-location")) {
            console.log("onClick");
            let unsaveEvent = new Event("unsave", { locationId: target.getAttribute("id") });
            this.notifyAll(unsaveEvent);
        } else {
            let toDetailEvent = new Event("toLocationDetail", { locationId: target.getAttribute("id") });
            this.notifyAll(toDetailEvent);
        }
    }

}

export default new PersonalLocations();
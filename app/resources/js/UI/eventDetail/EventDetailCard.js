/* eslint-env browser */

import View from "../View.js";

class EventDetailCard extends View {
    constructor() {
        super();
        this.event = JSON.parse(localStorage.getItem("eventDetail"));
    }

    updateNavigator() {
        let listItems = this.element.querySelector(".breadcrumb").getElementsByTagName("li");
        listItems[1].firstElementChild.textContent = this.location.name;
        listItems[2].textContent = this.event.headline;
        localStorage.setItem("locationDetail", JSON.stringify(this.location));
    }

    displayEvent() {
        let card = this.element.querySelector(".card"),
            locations = JSON.parse(localStorage.getItem("locations"));
        if (this.event.image !== "") {
            card.querySelector(".card-img-top").src = this.event.image;
        } else {
            card.querySelector(".card-img-top").src = "../resources/img/Hangover_Logo_mit_Schrift.png";
        }
        card.querySelector(".event-date").textContent = this.event.date;
        card.querySelector(".event-title").textContent = this.event.headline;
        card.querySelector(".card-text").textContent = this.event.info;
        card.querySelector(".event-time").textContent = this.event.time;
        card.querySelector(".event-cost").textContent = this.event.price;
        card.querySelector(".event-musik").textContent = this.event.music;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].id === this.event.locationid) {
                this.location = locations[i];
                card.querySelector(".location-name").textContent = "@" + locations[i].name;
                break;
            }
        }
    }
}

export default EventDetailCard;
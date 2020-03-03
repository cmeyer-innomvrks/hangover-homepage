/* eslint-env browser */

import View from "./View.js";

class EventList extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
    }

    onClick(event) {
        console.log("Klick!");
    }

    displayEvents(eventItems) {
        for (let i = 0; i < eventItems.length; i++) {
            let template = document.querySelector(".event-template").innerHTML.trim(),
                item = document.createElement("div");
            item.innerHTML = template;
            item.querySelector(".card-img-top").src = eventItems[i].image;
            item.querySelector(".headline").textContent = eventItems[i].headline;
            item.querySelector(".shortDescription").textContent = eventItems[i].info.substring(0, 150) + "...";
            item.querySelector(".event-location").textContent = "@" + eventItems[i].locationid;
            item.querySelector(".event-time").textContent = eventItems[i].time + "Uhr";
            item = item.firstElementChild;
            item.addEventListener("click", this.onClick.bind(this));
            this.element.appendChild(item);
        }
    }
}

export default EventList;
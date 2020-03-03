/* eslint-env browser */

import View from "./View.js";

class EventList extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
        element.addEventListener("click", this.onClick.bind(this));
    }

    onClick(event) {
        let target = event.target;
        console.log(target);
    }

    displayEvents(eventItems) {
        console.log(eventItems);
        for (let i = 0; i < 2; i++) {
            console.log(eventItems);

            let template = document.querySelector(".event-template").innerHTML.trim(),
                item = document.createElement("div");
            item.innerHTML = template;
            item.querySelector(".card-img-top").src = eventItems[i].image;
            item.querySelector(".headline").textContent = eventItems[i].headline;
            item.querySelector(".shortDescription").textContent = eventItems[i].info;
            item.querySelector(".event-location").textContent = "@" + eventItems[i].locationid;
            item.querySelector(".event-time").textContent = eventItems[i].time;
            this.element.appendChild(item);
        }
    }
}

export default EventList;
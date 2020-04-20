/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailEvents extends View {
  constructor() {
    super();
    this.location = JSON.parse(localStorage.getItem("locationDetail"));
    this.events = [];

    let allEvents = JSON.parse(localStorage.getItem("events"));
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].locationid === this.location.id) {
        this.events.push(allEvents[i]);
      }
    }
  }

  displayEvents() {
    if (this.events.length > 0) {
      this.element.innerHTML = "";
      for (let i = 0; i < this.events.length; i++) {
        let current = this.getEventElement(this.events[i]);
        this.element.appendChild(current);
      }
    } else {
      this.element.innerHTML =
        "Diese Location hat leider im Moment keine Veranstaltungen.";
    }
  }

  getEventElement(event) {
    let template = document.querySelector(".event-template").innerHTML.trim(),
      item = document.createElement("div");
    item.innerHTML = template;
    if (event.image !== "") {
      item.querySelector(".card-img-top").src = event.image;
    } else {
      item.querySelector(".card-img-top").src =
        "../resources/img/Hangover_Logo_mit_Schrift.png";
    }
    item.querySelector(".headline").textContent = event.headline;
    if (event.info.length > 150) {
      item.querySelector(".shortDescription").textContent =
        event.info.substring(0, 150) + "...";
    } else {
      item.querySelector(".shortDescription").textContent = event.info;
    }
    item.querySelector(".event-location").textContent =
      "@" + this.location.name;

    item.querySelector(".event-time").textContent =
      event.date + " - " + event.time + "Uhr";
    item = item.firstElementChild;
    item.setAttribute("id", event.id);
    item.addEventListener("click", this.onClick.bind(this));

    return item;
  }

  onClick(event) {
    let target = event.target;
    while (target.getAttribute("id") === null) {
      target = target.parentElement;
    }
    let toDetailEvent = new Event("toEventDetail", {
      eventId: target.getAttribute("id")
    });
    this.notifyAll(toDetailEvent);
  }
}

export default new LocationDetailEvents();

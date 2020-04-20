/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

class PersonalEvents extends View {
  constructor() {
    super();
  }

  getSavedEvents(eventIDs) {
    let events = JSON.parse(localStorage.getItem("events")),
      result = [];
    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < eventIDs.length; j++) {
        if (events[i].id === eventIDs[j]) {
          result.push(events[i]);
        }
      }
    }
    this.savedEvents = result;
  }

  displaySavedEvents() {
    let locations = JSON.parse(localStorage.getItem("locations"));
    if (this.savedEvents.length > 0) {
      this.element.innerHTML = "";
      for (let i = 0; i < this.savedEvents.length; i++) {
        let current = this.getEventElement(this.savedEvents[i], locations);
        this.element.appendChild(current);
      }
    } else {
      this.element.innerHTML = "Noch keine gespeicherten Events...";
    }
  }

  getEventElement(event, locationItems) {
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

    for (let j = 0; j < locationItems.length; j++) {
      if (event.locationid === locationItems[j].id) {
        item.querySelector(".event-location").textContent =
          "@" + locationItems[j].name;
        item.querySelector(".location-art").textContent = locationItems[j].art;
        break;
      }
    }

    item.querySelector(".event-time").textContent =
      event.date + " - " + event.time + "Uhr";
    item = item.firstElementChild;
    item.setAttribute("id", event.id);
    item.addEventListener("click", this.onClick.bind(this));

    return item;
  }

  onClick(event) {
    let target = event.target,
      originalTarget = event.target;
    while (target.getAttribute("id") === null) {
      target = target.parentElement;
    }
    if (originalTarget.classList.contains("unsave-event")) {
      console.log(target.getAttribute("id"));
      let unsaveEvent = new Event("unsave", {
        eventId: target.getAttribute("id")
      });
      this.notifyAll(unsaveEvent);
    } else {
      let toDetailEvent = new Event("toEventDetail", {
        eventId: target.getAttribute("id")
      });
      this.notifyAll(toDetailEvent);
    }
  }
}

export default new PersonalEvents();

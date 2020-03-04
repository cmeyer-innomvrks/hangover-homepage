/* eslint-env browser */

import View from "./View.js";

function getDayString(date) {
  switch (date.getDay()) {
    case 0:
      return "Montag";
    case 1:
      return "Dienstag";
    case 2:
      return "Mittwoch";
    case 3:
      return "Donnerstag";
    case 4:
      return "Freitag";
    case 5:
      return "Samstag";
    case 6:
      return "Sonntag";
    default:
      return "";
  }
}

class EventList extends View {
  constructor(events) {
    super();
    this.dates = [];
    this.dateCards = [];
    for (let i = 0; i < events.length; i++) {
      let date = events[i].jsDate;
      date.setHours(0);
      date.setMinutes(0);
      if (!this.dates.includes(events[i].date)) {
        this.dates.push(events[i].date);
      }
    }

    for (let i = 0; i < this.dates.length; i++) {
      let day = parseInt(this.dates[i].substring(0, 2)),
        month = parseInt(this.dates[i].substring(3, 5)),
        year = parseInt(this.dates[i].substring(6));
      this.dates[i] = new Date(year, month, day, 0, 0, 0, 0);
    }

    this.dates.sort(function (a, b) {
      return a - b;
    });

    for (let i = 0; i < this.dates.length; i++) {
      this.dateCards.push(this.getDateCard(this.dates[i]));
    }
  }

  setElement(element) {
    super.setElement(element);
  }

  onClick(event) {
    console.log("Klick!");
  }

  getEventElement(event, locationItems) {
    let template = document.querySelector(".event-template").innerHTML.trim(),
      item = document.createElement("div");
    item.innerHTML = template;
    if (event.image !== "") {
      item.querySelector(".card-img-top").src = event.image;
    } else {
      item.querySelector(".card-img-top").src = "./resources/img/Hangover_Logo_mit_Schrift.png";
    }
    item.querySelector(".headline").textContent = event.headline;
    if (event.info.length > 150) {
      item.querySelector(".shortDescription").textContent = event.info.substring(0, 150) + "...";
    } else {
      item.querySelector(".shortDescription").textContent = event.info;
    }

    for (let j = 0; j < locationItems.length; j++) {
      if (event.locationid === locationItems[j].id) {
        item.querySelector(".event-location").textContent = "@" + locationItems[j].name;
        break;
      }
    }

    item.querySelector(".event-time").textContent =
      event.time + "Uhr";
    item = item.firstElementChild;
    item.addEventListener("click", this.onClick.bind(this));

    return item;
  }

  getDateCard(date) {
    let template = document.querySelector(".date-card").innerHTML.trim(),
      item = document.createElement("div");
    item.innerHTML = template;
    item.querySelector(".week-day").textContent = getDayString(date);
    item.querySelector(".event-date").textContent = "" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    item = item.innerHTML.trim();
    return item;
  }

  appendEventsToDateCards(events, locations) {
    for (let i = 0; i < this.dateCards.length; i++) {
      let element = new DOMParser().parseFromString(this.dateCards[i], "text/html");
      this.dateCards[i] = element.body;
    }

    for (let i = 0; i < events.length; i++) {
      let date = events[i].jsDate,
        index = -1;
      date.setHours(0);
      date.setMinutes(0);
      index = this.dates.map(Number).indexOf(+date);
      if (index !== -1) {
        this.dateCards[index].querySelector(".event-list").appendChild(this.getEventElement(events[i], locations));
      }
    }

    for (let i = 0; i < this.dateCards.length; i++) {
      let firstChild = this.dateCards[i].firstElementChild,
        secondChild = firstChild.nextElementSibling;
      this.element.appendChild(firstChild);
      this.element.appendChild(secondChild);
    }
  }

}

export default EventList;

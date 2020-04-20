/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

class LocationList extends View {
  constructor() {
    super();
    this.letterCards = new Array(26);
    for (let i = 0; i < this.letterCards.length; i++) {
      this.letterCards[i] = this.getLetterCard(String.fromCharCode(i + 65));
    }
    this.letterCards.push(this.getLetterCard("#"));
  }

  setElement(element) {
    super.setElement(element);
  }

  onClick(event) {
    let target = event.target;
    while (target.getAttribute("id") === null) {
      console.log(target);
      target = target.parentElement;
    }
    let toDetailLocation = new Event("toLocationDetail", {
      locationId: target.getAttribute("id")
    });
    this.notifyAll(toDetailLocation);
  }

  getLocationElement(location) {
    let template = document
        .querySelector(".location-template")
        .innerHTML.trim(),
      item = document.createElement("div");
    item.innerHTML = template;
    if (location.image !== "") {
      item.querySelector(".card-img-top").src = location.image;
    } else {
      item.querySelector(".card-img-top").src =
        "../resources/img/Hangover_Logo_mit_Schrift.png";
    }
    item.querySelector(".location-name").textContent = location.name;
    item.querySelector(".location-street").textContent = location.street;
    item.querySelector(".location-housenumber").textContent =
      location.housenumber;
    item.querySelector(".location-zip").textContent = location.zip;
    item.querySelector(".location-city").textContent = location.city;
    item.querySelector(".location-art").textContent = location.art;

    if (location.calcAverageRating() === 0) {
      item.querySelector(".location-star").classList.add("hidden");
      item.querySelector("#location-average").classList.add("hidden");
    } else {
      item.querySelector(
        "#location-average"
      ).textContent = location.average.toFixed(2);
    }

    item = item.firstElementChild;
    item.setAttribute("id", location.id);
    item.addEventListener("click", this.onClick.bind(this));
    return item;
  }

  getLetterCard(letter) {
    let template = document.querySelector(".letter-card").innerHTML.trim(),
      item = document.createElement("div");
    item.innerHTML = template;
    item.querySelector(".letter").textContent = letter;
    item = item.innerHTML.trim();
    return item;
  }

  appendLocationsToLetterCards(locations) {
    for (let i = 0; i < this.letterCards.length; i++) {
      let element = new DOMParser().parseFromString(
        this.letterCards[i],
        "text/html"
      );
      this.letterCards[i] = element.body;
    }

    for (let j = 0; j < locations.length; j++) {
      let firstChar = locations[j].name.charAt(0);
      if (
        firstChar.charCodeAt(0) >= "A".charCodeAt(0) &&
        firstChar.charCodeAt(0) <= "Z".charCodeAt(0)
      ) {
        this.letterCards[firstChar.charCodeAt(0) - "A".charCodeAt(0)]
          .querySelector(".location-list")
          .appendChild(this.getLocationElement(locations[j]));
      } else {
        this.letterCards[this.letterCards.length - 1].appendChild(
          this.getLocationElement(locations[j])
        );
      }
    }

    for (let i = 0; i < this.letterCards.length; i++) {
      let firstChild = this.letterCards[i].firstElementChild,
        secondChild = firstChild.nextElementSibling;

      if (secondChild.innerHTML !== "") {
        this.element.appendChild(firstChild);
        this.element.appendChild(secondChild);
      }
    }
  }
}

export default LocationList;

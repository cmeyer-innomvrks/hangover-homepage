/* eslint-env browser */

import View from "./View.js";

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
    console.log("Klick!");
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

    item.querySelector("#location-average").textContent = location.calcAverageRating();
    if (location.calcAverageRating() === "") {
      item.querySelector(".location-star").classList.add("hidden");
    }

    item = item.firstElementChild;
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
      let element = new DOMParser().parseFromString(this.letterCards[i], "text/html");
      this.letterCards[i] = element.body;
    }

    for (let j = 0; j < locations.length; j++) {
      let firstChar = locations[j].name.charAt(0);
      if (firstChar.charCodeAt(0) >= "A".charCodeAt(0) && firstChar.charCodeAt(0) <= "Z".charCodeAt(0)) {
        this.letterCards[firstChar.charCodeAt(0) - "A".charCodeAt(0)].querySelector(".location-list").appendChild(this.getLocationElement(locations[j]));
      } else {
        this.letterCards[this.letterCards.length - 1].appendChild(this.getLocationElement(locations[j]));
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

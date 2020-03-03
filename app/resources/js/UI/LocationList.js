/* eslint-env browser */

import View from "./View.js";

class LocationList extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
  }

  onClick(event) {
    console.log("Klick!");
  }

  displayLocations(locationItems) {
    for (let i = 0; i < locationItems.length; i++) {
      let template = document
          .querySelector(".location-template")
          .innerHTML.trim(),
        item = document.createElement("div");
      item.innerHTML = template;
      item.querySelector(".card-img-top").src = locationItems[i].image;
      item.querySelector(".location-name").textContent = locationItems[i].name;
      item.querySelector(".location-street").textContent =
        locationItems[i].street;
      item.querySelector(".location-housenumber").textContent =
        locationItems[i].housenumber;
      item.querySelector(".location-zip").textContent = locationItems[i].zip;
      item.querySelector(".location-city").textContent = locationItems[i].city;
      item.querySelector(".location-art").textContent =
        "@" + locationItems[i].art;
      item = item.firstElementChild;
      item.addEventListener("click", this.onClick.bind(this));
      this.element.appendChild(item);
    }
  }
}

export default LocationList;

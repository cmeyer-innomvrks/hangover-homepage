/* eslint-env browser */

import View from "../View.js";

class LocationDetailPics extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
  }

  addPicture(url, text) {
    let template = document.querySelector(".img-template").innerHTML,
      item = document.createElement("div");
    item.innerHTML = template;
    item.querySelector(".location-img").src = url;
    item.querySelector(".location-img-text").textContent = url; // TODO
    item = item.firstElementChild;
    this.element.appendChild(item);
  }
}

export default new LocationDetailPics();

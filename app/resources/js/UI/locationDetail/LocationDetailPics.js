/* eslint-env browser */

import View from "../View.js";

class LocationDetailPics extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
  }

  addPictures(pictures) {
    for (let i = 0; i < pictures.length; i++) {
      let template = document.querySelector(".img-template").innerHTML,
        item = document.createElement("div");
      item.innerHTML = template;
      item.querySelector(".location-img").src = pictures[i].url;
      item.querySelector(".location-img-text").textContent = pictures[i].text; // TODO
      item = item.firstElementChild;
      // TODO CLICK LISTENER
      this.element.appendChild(item);
    }
  }

  reset() {
    this.element.innerHTML = "";
  }
}

export default new LocationDetailPics();

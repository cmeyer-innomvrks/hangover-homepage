/* eslint-env browser */

import { Event } from "../../utils/Observable.js";
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
      item.addEventListener("click", this.onClick.bind(this));
      this.element.appendChild(item);
    }
  }

  reset() {
    this.element.innerHTML = "";
  }

  onClick(event) {
    let target = event.target,
      src = target.src;
    if (target.classList.contains("location-img")) {
      let bigPicEvent = new Event("displaySinglePic", { src: src });
      this.notifyAll(bigPicEvent);
    }
  }
}

export default new LocationDetailPics();

/* eslint-env browser */

import View from "../View.js";

class LocationDetailHeader extends View {
  constructor() {
    super();
    this.location = JSON.parse(localStorage.getItem("locationDetail"));
  }

  setElement(element) {
    super.setElement(element);
  }

  setHeader() {
    this.location = JSON.parse(localStorage.getItem("locationDetail"));
    this.element.querySelector(
      ".location-name"
    ).textContent = this.location.name;
    if (this.location.image !== "") {
      this.element.querySelector(".img-responsive").src = this.location.image;
    } else {
      this.element.querySelector(".img-responsive").src =
        "../resources/img/Hangover_Logo_mit_Schrift.png";
    }
    this.element.querySelector(
      ".location-full-name"
    ).textContent = this.location.name;
    this.element.querySelector(
      ".location-adress"
    ).firstElementChild.textContent = `${this.location.street} ${this.location.housenumber}, ${this.location.zip} ${this.location.city}`;
    this.element.querySelector(
      ".profile-comments"
    ).textContent = this.location.rating.length;
    this.element.querySelector(".profile-views").textContent =
      this.location.watched + 1;
    this.element.querySelector(
      ".profile-likes"
    ).textContent = this.location.saved;
    this.element.querySelector("#user-email").textContent =
      " " + this.location.art;
  }

  setIndexTab(text) {
    this.element.querySelector(".tab-index").textContent = text;
  }
}

export default LocationDetailHeader;

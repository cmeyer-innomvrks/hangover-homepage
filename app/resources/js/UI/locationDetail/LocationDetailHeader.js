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
        if (this.location.image !== "") {
            this.element.querySelector(".img-responsive").src = this.location.image;
        } else {
            this.element.querySelector(".img-responsive").src = "../../../img/Hangover_Logo_mit_Schrift.png";
        }
        this.element.querySelector(".user-full-name").textContent = this.location.name;
        this.element.querySelector(".location-adress").firstElementChild.textContent = `${this.location.zip} ${this.location.city}, ${this.location.street} ${this.location.housenumber}`;
        this.element.querySelector(".profile-comments").textContent = this.location.rating.length;
        this.element.querySelector(".profile-views").textContent = "TODO";
        this.element.querySelector(".profile-likes").textContent = "TODO";
        this.element.querySelector("#user-email").textContent = "TODO";
    }
}

export default new LocationDetailHeader();
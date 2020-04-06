/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailLeaveRating extends View {
  constructor() {
    super();
    this.stars = [false, false, false, false, false];
    this.location = JSON.parse(localStorage.getItem("locationDetail"));
  }

  setElement(element) {
    super.setElement(element);
    this.element
      .querySelector(".btn-success")
      .addEventListener("click", this.onSubmit.bind(this));
    this.element
      .querySelector(".rating-block")
      .addEventListener("click", this.onStarsClicked.bind(this));

    let buttons = this.element.getElementsByTagName("button");
    for (let i = 0; i < this.stars.length; i++) {
      buttons[i].classList.remove("btn-warning");
      buttons[i].classList.add("btn-grey");
      buttons[i].classList.add("btn-default");
    }
  }

  onSubmit() {
    let starsCount = 0,
      date,
      text,
      now = new Date(),
      id;
    for (let i = 0; i < this.stars.length; i++) {
      if (this.stars[i]) {
        starsCount++;
      }
    }
    date = now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
    text = this.element.querySelector(".form-control").value;
    id = this.location.id;
    let reviewSubmit = new Event("submitReview", {
      id: id,
      stars: starsCount,
      text: text,
      date: date,
    });
    this.notifyAll(reviewSubmit);
  }

  onStarsClicked(event) {
    let buttons = this.element
        .querySelector(".rating-block")
        .getElementsByTagName("button"),
      target = event.target;
    while (target.tagName !== "BUTTON") {
      target = target.parentElement;
    }
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] === target) {
        for (let j = 0; j < buttons.length; j++) {
          if (j <= i) {
            this.stars[j] = true;
            buttons[j].classList.add("btn-warning");
            buttons[j].classList.remove("btn-grey");
            buttons[j].classList.remove("btn-default");
          } else {
            this.stars[j] = false;
            buttons[j].classList.remove("btn-warning");
            buttons[j].classList.add("btn-grey");
            buttons[j].classList.add("btn-default");
          }
        }
        break;
      }
    }
  }
}

export default new LocationDetailLeaveRating();

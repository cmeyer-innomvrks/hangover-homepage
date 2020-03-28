/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailLeaveRatingBtn extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
    this.element
      .querySelector(".leave-rating-btn")
      .addEventListener("click", this.onClick.bind(this));
  }

  hide() {
    this.element.querySelector(".leave-rating-btn").classList.add("hidden");
  }

  show() {
    this.element.querySelector(".leave-rating-btn").classList.remove("hidden");
  }

  onClick() {
    let newReviewEvent = new Event("leaveReview", {});
    this.notifyAll(newReviewEvent);
  }
}

export default new LocationDetailLeaveRatingBtn();

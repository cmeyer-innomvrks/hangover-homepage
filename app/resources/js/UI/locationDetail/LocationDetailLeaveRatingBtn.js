/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailLeaveRatingBtn extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  onClick() {
    let newReviewEvent = new Event("leaveReview", {});
    this.notifyAll(newReviewEvent);
  }
}

export default new LocationDetailLeaveRatingBtn();

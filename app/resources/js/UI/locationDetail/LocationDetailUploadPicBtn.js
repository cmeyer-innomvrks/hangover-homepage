/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailUploadPicBtn extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
    this.element
      .querySelector(".upload-pic-btn")
      .addEventListener("click", this.onClick.bind(this));
  }

  hide() {
    this.element.querySelector(".upload-pic-btn").classList.add("hidden");
  }

  show() {
    this.element.querySelector(".upload-pic-btn").classList.remove("hidden");
  }

  onClick() {
    let newReviewEvent = new Event("uploadPic", {});
    this.notifyAll(newReviewEvent);
  }
}

export default new LocationDetailUploadPicBtn();

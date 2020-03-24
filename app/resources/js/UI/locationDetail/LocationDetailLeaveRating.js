/* eslint-env browser */

import View from "../View.js";

class LocationDetailLeaveRating extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
    this.element
      .querySelector(".btn-success")
      .addEventListener("click", this.onSubmit.bind(this));
  }

  onSubmit() {
    // TODO
  }
}

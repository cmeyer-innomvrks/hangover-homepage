/* eslint-env browser */

import Observable from "../utils/Observable.js";

class View extends Observable {
  constructor() {
    super();
    this.element = undefined;
  }

  setElement(element) {
    this.element = element;
  }

  show() {
    if (this.element) {
      this.element.classList.remove("Test");
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.add("Test");
    }
  }
}

export default View;

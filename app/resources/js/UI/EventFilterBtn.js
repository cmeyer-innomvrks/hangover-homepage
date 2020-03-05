/* eslint-env browser */

import View from "./View.js";
import Event from "../utils/Observable.js";

class EventFilterBtn extends View {
    constructor() {
        super();
        this.filterDisplayed = false;
    }

    setElement(element) {
        super.setElement(element);
        this.element.addEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        console.log("Klick");
        if (!this.filterDisplayed) {
            let filterRequestedEvent = new Event("displayFilters");
            this.notifyAll(filterRequestedEvent);
            this.filterDisplayed = true;
        } else {
            //TODO
            this.filterDisplayed = false;
        }
    }
}

export default new EventFilterBtn();
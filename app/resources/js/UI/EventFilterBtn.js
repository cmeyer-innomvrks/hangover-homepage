/* eslint-env browser */

import View from "./View.js";
import { Event, Observable } from "../utils/Observable.js";

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
        if (!this.filterDisplayed) {
            let filterRequestedEvent = new Event("displayFilters", {});
            this.notifyAll(filterRequestedEvent);
            this.filterDisplayed = true;
        } else {
            let filterHideEvent = new Event("hideFilters", {});
            this.notifyAll(filterHideEvent);
            this.filterDisplayed = false;
        }
    }
}

export default new EventFilterBtn();
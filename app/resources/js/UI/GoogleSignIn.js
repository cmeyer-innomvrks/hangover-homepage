/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

class GoogleSignIn extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
        this.element.addEventListener("signIn", this.onSignIn.bind(this));
    }

    onSignIn() {
        let signInEvent = new Event("signIn", {});
        this.notifyAll(signInEvent);
    }
}

export default new GoogleSignIn();
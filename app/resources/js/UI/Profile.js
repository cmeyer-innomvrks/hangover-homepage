/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

class Profile extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
        this.element.querySelector(".user-logout").addEventListener("click", this.onLogoutRequested.bind(this));
    }

    setProfile(user) {
        this.element.querySelector(".img-responsive").src = user.img;
        this.element.querySelector(".user-full-name").textContent = user.name;
        this.element.querySelector("#user-email").textContent = user.mail;
    }

    onLogoutRequested() {
        let logoutEvent = new Event("logoutRequest", {});
        this.notifyAll(logoutEvent);
    }
}

export default new Profile();
/* eslint-env browser */

import View from "./View.js";
import { Event, Observable } from "../utils/Observable.js";

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class LocationFilterView extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
    }

    setupAllSlider() {
        let template = document.querySelector(".slider-template").innerHTML.trim(),
            listItem = document.createElement("div");
        listItem.innerHTML = template;
        listItem.firstElementChild.firstElementChild.textContent = "ALLE";
        listItem = listItem.firstElementChild;
        listItem.setAttribute("id", 0);
        listItem.querySelector(".slider").addEventListener("click", this.allSliderClicked.bind(this));
        return listItem;
    }

    setupFilterView(listOfTypes) {
        let template = document.querySelector(".location-filter").innerHTML.trim(),
            item = document.createElement("div");
        item.innerHTML = template;
        item.querySelector(".art-list").appendChild(this.setupAllSlider());

        for (let i = 0; i < listOfTypes.length; i++) {
            let listTemplate = document.querySelector(".slider-template").innerHTML.trim(),
                listItem = document.createElement("div");
            listItem.innerHTML = listTemplate;
            listItem.firstElementChild.firstElementChild.textContent = listOfTypes[i];
            listItem = listItem.firstElementChild;
            listItem.querySelector(".slider").addEventListener("click", this.onSliderClicked.bind(this));
            listItem.querySelector(".slider").addEventListener("change", this.onSliderClicked.bind(this));
            item.querySelector(".art-list").appendChild(listItem);
        }
        console.log(this);
        this.element.appendChild(item.firstElementChild);
        this.onSliderClicked();
    }

    async onSliderClicked() {
        await sleep(10);
        let checkedTypes = [],
            types = this.element.querySelector(".art-list").getElementsByClassName("default"),
            typeFlag = true;

        for (let i = 1; i < types.length; i++) {
            if (types[i].checked) {
                checkedTypes.push(types[i].parentElement.previousElementSibling.textContent);
            } else {
                types[0].checked = false;
                typeFlag = false;
            }
        }
        if (types[0].checked) {
            for (let i = 1; i < types.length; i++) {
                types[i].checked = true;
            }
        }
        if (typeFlag) {
            types[0].checked = true;
        }

        let onFilterChangedEvent = new Event("onFilterChanged", { selectedTypes: checkedTypes });
        this.notifyAll(onFilterChangedEvent);
    }

    async allSliderClicked(event) {
        await sleep(10);
        if (event.target.parentElement.parentElement.getAttribute("id") === "0") {
            let types = this.element.querySelector(".art-list").getElementsByClassName("default");
            if (types[0].checked) {
                for (let i = 1; i < types.length; i++) {
                    types[i].checked = true;
                }
            } else {
                for (let i = 1; i < types.length; i++) {
                    types[i].checked = false;
                }
            }
        }
        this.onSliderClicked()
    }

    hideFilters() {
        this.element.innerHTML = "";
    }
}

export default new LocationFilterView()
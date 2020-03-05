/* eslint-env browser */

import View from "./View.js";

class FilterView extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
    }

    setupFilterView(listOfGenres, listOfTypes, maxPrice) {
        let template = document.querySelector(".event-filter"),
            item = document.createElement("div");
        item.innerHTML = template;

        for (let i = 0; i < listOfGenres.length; i++) {
            let listItem = document.querySelector(".slider-template");
            listItem.textContent = listOfGenres[i];
            item.querySelector(".music").appendChild(listItem);
        }
    }
}
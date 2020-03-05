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
        let template = document.querySelector(".event-filter").innerHTML.trim(),
            item = document.createElement("div");
        item.innerHTML = template;

        for (let i = 0; i < listOfTypes.length; i++) {
            let listTemplate = document.querySelector(".slider-template").innerHTML.trim(),
                listItem = document.createElement("div");
            listItem.innerHTML = listTemplate;
            listItem.firstElementChild.firstElementChild.textContent = listOfTypes[i];
            listItem = listItem.firstElementChild;
            listItem.addEventListener("click", this.onClick);
            item.querySelector(".art-list").appendChild(listItem);
        }
        for (let i = 0; i < listOfGenres.length; i++) {
            let listTemplate = document.querySelector(".slider-template").innerHTML.trim(),
                listItem = document.createElement("div");
            listItem.innerHTML = listTemplate;
            listItem.firstElementChild.firstElementChild.textContent = listOfGenres[i];
            listItem = listItem.firstElementChild;
            listItem.addEventListener("click", this.onClick);
            item.querySelector(".music-list").appendChild(listItem);
        }

        item.querySelector(".price").setAttribute("max", maxPrice);
        item.querySelector(".price-max").textContent = maxPrice + " €";

        this.element.appendChild(item.firstElementChild);
    }

    onClick(event) {
        if (event.target.classList.contains("slider")) {
            console.log("Klick");
        }
    }

    hideFilters() {
        this.element.innerHTML = "";
    }
}

export default new FilterView();
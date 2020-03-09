/* eslint-env browser */

import View from "./View.js";
import { Event, Observable } from "../utils/Observable.js";

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class FilterView extends View {
    constructor() {
        super();
    }

    setElement(element) {
        super.setElement(element);
    }

    setupAllSlider() {
        let listTemplate = document.querySelector(".slider-template").innerHTML.trim(),
            listItem = document.createElement("div"),
            result = [];
        listItem.innerHTML = listTemplate;
        listItem.firstElementChild.firstElementChild.textContent = "ALLE";
        listItem = listItem.firstElementChild;
        listItem.setAttribute("id", 0);
        listItem.querySelector(".slider").addEventListener("click", this.allSliderClicked.bind(this));
        result.push(listItem);

        listTemplate = document.querySelector(".slider-template").innerHTML.trim();
        listItem = document.createElement("div");
        listItem.innerHTML = listTemplate;
        listItem.firstElementChild.firstElementChild.textContent = "ALLE";
        listItem = listItem.firstElementChild;
        listItem.setAttribute("id", 1);
        listItem.querySelector(".slider").addEventListener("click", this.allSliderClicked.bind(this));
        result.push(listItem);

        return result;
    }

    setupFilterView(listOfGenres, listOfTypes, maxPrice) {
        let template = document.querySelector(".event-filter").innerHTML.trim(),
            item = document.createElement("div"),
            allSliders = this.setupAllSlider();
        item.innerHTML = template;
        item.querySelector(".art-list").appendChild(allSliders[0]);
        item.querySelector(".music-list").appendChild(allSliders[1]);

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
        for (let i = 0; i < listOfGenres.length; i++) {
            let listTemplate = document.querySelector(".slider-template").innerHTML.trim(),
                listItem = document.createElement("div");
            listItem.innerHTML = listTemplate;
            listItem.firstElementChild.firstElementChild.textContent = listOfGenres[i];
            listItem = listItem.firstElementChild;
            listItem.querySelector(".slider").addEventListener("click", this.onSliderClicked.bind(this));
            listItem.querySelector(".slider").addEventListener("change", this.onSliderClicked.bind(this));
            item.querySelector(".music-list").appendChild(listItem);
        }

        item.querySelector(".price").setAttribute("max", maxPrice);
        item.querySelector(".price").value = maxPrice;
        item.querySelector(".price").addEventListener("change", this.onSliderClicked.bind(this));
        item.querySelector(".price-max").textContent = maxPrice + " €";

        this.element.appendChild(item.firstElementChild);
        this.onSliderClicked();
    }

    async onSliderClicked(event) {
        await sleep(10);
        let checkedTypes = [],
            checkedGenres = [],
            selectedMaxPrice = -1,
            types = this.element.querySelector(".art-list").getElementsByClassName("default"),
            genres = this.element.querySelector(".music-list").getElementsByClassName("default"),
            typeFlag = true,
            genreFlag = true;

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

        for (let i = 1; i < genres.length; i++) {
            if (genres[i].checked) {
                checkedGenres.push(genres[i].parentElement.previousElementSibling.textContent);
            } else {
                genres[0].checked = false;
                genreFlag = false;
            }
        }
        if (genres[0].checked) {
            for (let i = 1; i < genres.length; i++) {
                genres[i].checked = true;
            }
        }
        if (genreFlag) {
            genres[0].checked = true;
        }

        selectedMaxPrice = this.element.querySelector(".price").value;

        let onFilterChangedEvent = new Event("onFilterChanged", { selectedTypes: checkedTypes, selectedGenres: checkedGenres, selectedPrice: selectedMaxPrice });
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
        } else {
            let genres = this.element.querySelector(".music-list").getElementsByClassName("default");
            if (genres[0].checked) {
                for (let i = 1; i < genres.length; i++) {
                    genres[i].checked = true;
                }
            } else {
                for (let i = 1; i < genres.length; i++) {
                    genres[i].checked = false;
                }
            }
        }
        this.onSliderClicked()
    }

    hideFilters() {
        this.element.innerHTML = "";
    }
}

export default new FilterView();
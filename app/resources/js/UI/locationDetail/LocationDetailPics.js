/* eslint-env browser */

import { Event } from "../../utils/Observable.js";
import View from "../View.js";

class LocationDetailPics extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
  }

  addPictures(pictures) {
    for (let i = 0; i < pictures.length; i++) {
      let template = document.querySelector(".img-template").innerHTML,
        item = document.createElement("div");
      item.innerHTML = template;
      item.querySelector(".location-img").src = pictures[i].url;
      item.querySelector(".location-img-text").textContent = pictures[i].text;
      item.querySelector(".fa-thumbs-up").textContent = pictures[i].liked;
      item.querySelector(".fa-thumbs-down").textContent = pictures[i].disliked;
      item = item.firstElementChild;
      item.setAttribute("id", pictures[i].id);
      item.addEventListener("click", this.onClick.bind(this));
      this.element.appendChild(item);
    }
  }

  reset() {
    this.element.innerHTML = "";
  }

  onClick(event) {
    let target = event.target,
      src = target.src;
    if (target.classList.contains("location-img")) {
      let bigPicEvent = new Event("displaySinglePic", { src: src });
      this.notifyAll(bigPicEvent);
    } else if (target.classList.contains("fa-thumbs-up")) {
      let likes = parseInt(target.textContent),
        id = target.parentElement.parentElement.getAttribute("id"),
        likeEvent = new Event("pictureLike", { pictureID: id, likes: likes });
      this.notifyAll(likeEvent);
      target.textContent = likes + 1;
      target.style.pointerEvents = "none";
    } else if (target.classList.contains("fa-thumbs-down")) {
      let dislikes = parseInt(target.textContent),
        id = target.parentElement.parentElement.getAttribute("id"),
        likeEvent = new Event("pictureDislike", {
          pictureID: id,
          dislikes: dislikes,
        });
      this.notifyAll(likeEvent);
      target.textContent = dislikes + 1;
      target.style.pointerEvents = "none";
    } else if (target.classList.contains("fa-bomb")) {
      let id = target.parentElement.parentElement.getAttribute("id"),
        reportEvent = new Event("report", {
          objectID: id,
          reportType: "Picture",
        });
      this.notifyAll(reportEvent);
      target.classList.add("hidden");
    }
  }
}

export default new LocationDetailPics();

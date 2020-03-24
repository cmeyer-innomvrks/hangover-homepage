/* eslint-env browser */

import View from "../View.js";

class LocationDetailReviews extends View {
  constructor() {
    super();
    this.location = JSON.parse(localStorage.getItem("locationDetail"));
  }

  setAverage() {
    this.element.querySelector(".average").textContent = this.location.average;
    let stars = this.element
      .querySelector(".rating-avg")
      .getElementsByTagName("button");
    for (let i = 0; i < stars.length; i++) {
      if (this.location.average >= i + 1) {
        stars[i].classList.add("btn-warning");
        stars[i].classList.remove("btn-grey");
        stars[i].classList.remove("btn-default");
      }
    }
  }

  setOverview() {
    let progressBars = this.element
        .querySelector(".rating-overview")
        .getElementsByClassName("progress-bar"),
      numbersCount = this.element
        .querySelector(".rating-overview")
        .getElementsByClassName("pull-right");
    for (let i = 5; i > 0; i--) {
      let reviewCount = this.location.rating.length,
        proportion = 0;
      for (let j = 0; j < this.location.rating.length; j++) {
        if (parseInt(this.location.rating[j].stars) === i) {
          proportion++;
        }
      }
      numbersCount[(i - 5) * -1].textContent = proportion;
      proportion = (proportion / reviewCount) * 100;
      progressBars[(i - 5) * -1].style.width = proportion + "%";
    }
  }

  showReviews() {
    // TODO
  }
}

export default new LocationDetailReviews();

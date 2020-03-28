/* eslint-env browser */

import LocationDetailCard from "./UI/locationDetail/LocationDetailCard.js";
import SavedLocationsLoader from "./SavedItems/SavedLocationsLoader.js";
import LocationDetailHeader from "./UI/locationDetail/LocationDetailHeader.js";
import LocationDetailNavigator from "./UI/locationDetail/LocationDetailNavigator.js";
import LocationDetailEvents from "./UI/locationDetail/LocationDetailEvents.js";
import LocationDetailReviews from "./UI/locationDetail/LocationDetailReviews.js";
import LocationDetailPics from "./UI/locationDetail/LocationDetailPics.js";
import LocationDetailLeaveRatingBtn from "./UI/locationDetail/LocationDetailLeaveRatingBtn.js";
import LocationDetailLeaveRating from "./UI/locationDetail/LocationDetailLeaveRating.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import ProfileLoader from "./FirebaseDownloader/ProfileLoader.js";

let locationDetailCard, locationDetailReviews, locationDetailHeader;

function init() {
  locationDetailHeader = new LocationDetailHeader();
  locationDetailHeader.setElement(document.querySelector(".profile-panel"));
  locationDetailHeader.setHeader();

  LocationDetailNavigator.setElement(document.querySelector(".navigator"));
  LocationDetailNavigator.setLocationName();
  LocationDetailNavigator.addEventListener("infoRequested", onInfoRequested);
  LocationDetailNavigator.addEventListener("eventRequested", onEventRequested);
  LocationDetailNavigator.addEventListener(
    "reviewRequested",
    onReviewRequested
  );
  LocationDetailNavigator.addEventListener("picsRequested", onPicsRequested);

  locationDetailCard = new LocationDetailCard();
  locationDetailCard.addEventListener("isLocationSaved", checkIfLocationSaved);
  locationDetailCard.addEventListener("saveLocation", onLocationSafeRequest);
  locationDetailCard.addEventListener(
    "unsaveLocation",
    onLocationUnsaveRequest
  );
  locationDetailCard.setElement(document.querySelector(".infos"));
  locationDetailCard.displayLocation();

  LocationDetailEvents.setElement(document.querySelector(".events"));
  LocationDetailEvents.displayEvents();
  LocationDetailEvents.addEventListener(
    "toEventDetail",
    onEventDetailRequested
  );
  LocationDetailEvents.hide();

  locationDetailReviews = new LocationDetailReviews();
  locationDetailReviews.setElement(
    document.getElementsByClassName("review-class")[0]
  );
  locationDetailReviews.setAverage();
  locationDetailReviews.setOverview();
  locationDetailReviews.showReviews();
  locationDetailReviews.hide();

  LocationDetailPics.setElement(document.querySelector(".picture-area"));
  LocationDetailPics.hide();

  LocationDetailLeaveRatingBtn.setElement(
    document.querySelector(".leave-rating-btn")
  );
  LocationDetailLeaveRatingBtn.addEventListener(
    "leaveReview",
    onReviewInputRequested
  );
  LocationDetailLeaveRatingBtn.hide();

  LocationDetailLeaveRating.setElement(document.querySelector(".leave-review"));
  console.log(LocationDetailLeaveRating.element);
  LocationDetailLeaveRating.addEventListener("submitReview", onReviewSubmit);
  LocationDetailLeaveRating.hide();
}

function onInfoRequested() {
  locationDetailCard.show();
  LocationDetailNavigator.activateInfo();
  LocationDetailEvents.hide();
  locationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.hide();
}

function onEventRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activateEvents();
  LocationDetailEvents.show();
  locationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.hide();
}

function onReviewRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activateReviews();
  LocationDetailEvents.hide();
  locationDetailReviews.show();
  LocationDetailLeaveRatingBtn.show();
  LocationDetailPics.hide();
}

function onPicsRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activatePics();
  LocationDetailEvents.hide();
  locationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.show();
}

async function checkIfLocationSaved(event) {
  let id = event.data.id;
  let result = await SavedLocationsLoader.isSaved(id);
  locationDetailCard.setSavedStatus(result);
}

function onLocationSafeRequest(event) {
  console.log("SAVE");
  SavedLocationsLoader.save(event.data.id);
}

function onLocationUnsaveRequest(event) {
  console.log("UNSAVE");
  SavedLocationsLoader.unsave(event.data.id);
}

function onEventDetailRequested(event) {
  let eventID = event.data.eventId,
    events = JSON.parse(localStorage.getItem("events"));
  for (let i = 0; i < events.length; i++) {
    if (eventID === events[i].id) {
      localStorage.setItem("eventDetail", JSON.stringify(events[i]));
      window.location.href = "./detailedEvent.html";
      break;
    }
  }
}

function onReviewInputRequested() {
  let flag = false;

  if (JSON.parse(localStorage.getItem("isSignedIn"))) {
    flag = true;
  } else {
    alert("Du musst eingeloggt sein, um eine Bewertung abgeben zu können.");
  }
  // if (
  //   JSON.parse(localStorage.getItem("user")).reviews.indexOf(
  //     JSON.parse(localStorage.getItem("locationDetail")).id
  //   ) !== -1
  // ) {
  //   flag = false;
  //   alert(
  //     "Du hast schon eine Bewertung für diese Location geschrieben. Du kannst keine weitere Bewertung schreiben."
  //   );
  // }
  if (flag) {
    LocationDetailLeaveRating.show();
    LocationDetailLeaveRatingBtn.hide();
  }
}

function onReviewSubmit(event) {
  let data = event.data,
    userName = JSON.parse(localStorage.getItem("user")).name,
    userImg = JSON.parse(localStorage.getItem("user")).img,
    count = 0,
    sum = 0;
  LocationLoader.pushReview(data.id, data.stars, data.text, data.date);
  LocationDetailLeaveRating.hide();
  let location = JSON.parse(localStorage.getItem("locationDetail"));
  location.rating.push({
    stars: data.stars,
    text: data.text,
    date: data.date,
    name: userName,
    img: userImg
  });
  for (let i = 0; i < location.rating.length; i++) {
    count++;
    sum += location.rating[i].stars;
  }
  location.average = sum / count;
  localStorage.setItem("locationDetail", JSON.stringify(location));
  locationDetailReviews.resetReviews();
  locationDetailHeader = new LocationDetailHeader();
  locationDetailHeader.setElement(document.querySelector(".profile-panel"));
  locationDetailHeader.setHeader();
  locationDetailReviews = new LocationDetailReviews();
  locationDetailReviews.setElement(
    document.getElementsByClassName("review-class")[0]
  );
  locationDetailReviews.setAverage();
  locationDetailReviews.setOverview();
  locationDetailReviews.showReviews();
  ProfileLoader.updateUserReviews(data.id);
}

init();

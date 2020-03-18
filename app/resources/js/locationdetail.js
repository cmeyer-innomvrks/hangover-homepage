/* eslint-env browser */

import LocationDetailCard from "./UI/locationDetail/LocationDetailCard.js";
import SavedLocationsLoader from "./SavedItems/SavedLocationsLoader.js";
import LocationDetailHeader from "./UI/locationDetail/LocationDetailHeader.js";
import LocationDetailNavigator from "./UI/locationDetail/LocationDetailNavigator.js";
import LocationDetailEvents from "./UI/locationDetail/LocationDetailEvents.js";
import LocationDetailReviews from "./UI/locationDetail/LocationDetailReviews.js";

let locationDetailCard;

function init() {

    LocationDetailHeader.setElement(document.querySelector(".profile-panel"));
    LocationDetailHeader.setHeader();

    LocationDetailNavigator.setElement(document.querySelector(".navigator"));
    LocationDetailNavigator.setLocationName();
    LocationDetailNavigator.addEventListener("infoRequested", onInfoRequested);
    LocationDetailNavigator.addEventListener("eventRequested", onEventRequested);
    LocationDetailNavigator.addEventListener("reviewRequested", onReviewRequested);

    locationDetailCard = new LocationDetailCard();
    locationDetailCard.addEventListener("isLocationSaved", checkIfLocationSaved);
    locationDetailCard.addEventListener("saveLocation", onLocationSafeRequest);
    locationDetailCard.addEventListener("unsaveLocation", onLocationUnsaveRequest);
    locationDetailCard.setElement(document.querySelector(".infos"));
    locationDetailCard.displayLocation();

    LocationDetailEvents.setElement(document.querySelector(".events"));
    LocationDetailEvents.displayEvents();
    LocationDetailEvents.addEventListener("toEventDetail", onEventDetailRequested);
    LocationDetailEvents.hide();

    LocationDetailReviews.setElement(document.querySelector(".review-block"));
    LocationDetailReviews.setAverage();
    LocationDetailReviews.hide();
}

function onInfoRequested() {
    locationDetailCard.show();
    LocationDetailNavigator.activateInfo();
    LocationDetailEvents.hide();
    LocationDetailReviews.hide();
}

function onEventRequested() {
    locationDetailCard.hide();
    LocationDetailNavigator.activateEvents();
    LocationDetailEvents.show();
    LocationDetailReviews.hide();
}

function onReviewRequested() {
    console.log("review");
    locationDetailCard.hide();
    LocationDetailNavigator.activateReviews();
    LocationDetailEvents.hide();
    LocationDetailReviews.show();
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

init();
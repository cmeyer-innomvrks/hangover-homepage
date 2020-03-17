/* eslint-env browser */

import LocationDetailCard from "./UI/eventDetail/EventDetailCard.js";
import SavedLocationsLoader from "./SavedItems/SavedLocationsLoader.js";

let locationDetailCard;

function init() {
    locationDetailCard = new LocationDetailCard();
    locationDetailCard.addEventListener("isEventSaved", checkIfLocationSaved);
    locationDetailCard.addEventListener("saveLocation", onLocationSafeRequest);
    locationDetailCard.addEventListener("unsaveLocation", onLocationUnsaveRequest);
    locationDetailCard.setElement(document.querySelector(".detailed-location"));
    locationDetailCard.displayEvent();
    locationDetailCard.updateNavigator();
}

async function checkIfLocationSaved(event) {
    let id = event.data.id;
    let result = await SavedLocationsLoader.isSaved(id);
    locationDetailCard.setSavedStatus(result);
}

function onLocationSafeRequest(event) {
    SavedLocationLoader.save(event.data.id);
}

function onLocationUnsaveRequest(event) {
    SavedLocationsLoader.unsave(event.data.id);
}

init();
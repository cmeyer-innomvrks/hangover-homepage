/* eslint-env browser */

import EventDetailCard from "./UI/eventDetail/EventDetailCard.js";
import SavedEventsLoader from "./SavedItems/SavedEventsLoader.js";

let eventDetailCard;

function init() {
    eventDetailCard = new EventDetailCard();
    eventDetailCard.addEventListener("isEventSaved", checkIfEventSaved);
    eventDetailCard.addEventListener("saveEvent", onEventSafeRequest);
    eventDetailCard.addEventListener("unsaveEvent", onEventUnsaveRequest);
    eventDetailCard.setElement(document.querySelector(".detailed-event"));
    eventDetailCard.displayEvent();
    eventDetailCard.updateNavigator();
}

async function checkIfEventSaved(event) {
    let id = event.data.id;
    let result = await SavedEventsLoader.isSaved(id);
    eventDetailCard.setSavedStatus(result);
}

function onEventSafeRequest(event) {
    SavedEventsLoader.save(event.data.id);
}

function onEventUnsaveRequest(event) {
    SavedEventsLoader.unsave(event.data.id);
}

init();
/* eslint-env browser */

import EventDetailCard from "./UI/eventDetail/EventDetailCard.js";
import SavedEventsLoader from "./SavedItems/SavedEventsLoader.js";
import EventLoader from "./FirebaseDownloader/EventLoader.js";

let eventDetailCard;

function init() {
  eventDetailCard = new EventDetailCard();
  eventDetailCard.addEventListener("isEventSaved", checkIfEventSaved);
  eventDetailCard.addEventListener("saveEvent", onEventSafeRequest);
  eventDetailCard.addEventListener("unsaveEvent", onEventUnsaveRequest);
  eventDetailCard.setElement(document.querySelector(".detailed-event"));
  eventDetailCard.displayEvent();
  eventDetailCard.updateNavigator();
  EventLoader.pushViews(
    JSON.parse(localStorage.getItem("eventDetail")).id,
    JSON.parse(localStorage.getItem("eventDetail")).watched
  );
}

async function checkIfEventSaved(event) {
  let id = event.data.id;
  let result = await SavedEventsLoader.isSaved(id);
  eventDetailCard.setSavedStatus(result);
}

function onEventSafeRequest(event) {
  SavedEventsLoader.save(event.data.id);
  EventLoader.pushSaved(
    JSON.parse(localStorage.getItem("eventDetail")).id,
    true,
    JSON.parse(localStorage.getItem("eventDetail")).saved
  );
  let currEvent = JSON.parse(localStorage.getItem("eventDetail"));
  currEvent.saved = currEvent.saved + 1;
  localStorage.setItem("eventDetail", JSON.stringify(currEvent));
  eventDetailCard.displayEvent();
}

function onEventUnsaveRequest(event) {
  SavedEventsLoader.unsave(event.data.id);
  EventLoader.pushSaved(
    JSON.parse(localStorage.getItem("eventDetail")).id,
    false,
    JSON.parse(localStorage.getItem("eventDetail")).saved
  );
  let currEvent = JSON.parse(localStorage.getItem("eventDetail"));
  currEvent.saved = currEvent.saved - 1;
  localStorage.setItem("eventDetail", JSON.stringify(currEvent));
  eventDetailCard.displayEvent();
}

init();

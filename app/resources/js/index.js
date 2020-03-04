/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";

let eventListView;

function init() {
  getEvents();
}

async function getEvents() {
  let events = await EventLoader.getEvents();
  let locations = await LocationLoader.getLocations();
  events.sort(function (a, b) {
    return a.jsDate - b.jsDate;
  });
  eventListView = new EventList(events);
  eventListView.setElement(document.querySelector(".eventlist"));
  eventListView.appendEventsToDateCards(events, locations)
}

init();
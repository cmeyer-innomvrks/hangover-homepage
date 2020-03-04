/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";

let eventListView;

function init() {
  eventListView = new EventList();
  eventListView.setElement(document.querySelector(".eventlist"));
  getEvents();
}

async function getEvents() {
  let events = await EventLoader.getEvents();
  let locations = await LocationLoader.getLocations();
  eventListView.displayEvents(events, locations);
}

init();
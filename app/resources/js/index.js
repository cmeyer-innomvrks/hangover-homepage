/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import EventFilterBtn from "./UI/EventFilterBtn.js";
import EventFilter from "./filter/EventFilter.js";

let eventListView,
  eventFilter,
  events,
  locations;

function init() {
  getEvents();
  EventFilterBtn.setElement(document.querySelector(".btn-success"));
  EventFilterBtn.addEventListener("displayFilters", onFilterRequested);
}

async function getEvents() {
  events = await EventLoader.getEvents();
  locations = await LocationLoader.getLocations();
  events.sort(function (a, b) {
    return a.jsDate - b.jsDate;
  });
  eventListView = new EventList(events);
  eventListView.setElement(document.querySelector(".eventlist"));
  eventListView.appendEventsToDateCards(events, locations)
}

function onFilterRequested() {
  eventFilter = new EventFilter(events, locations);
  console.log(eventFilter.getListOfAvailableMusicGenres);
  console.log(eventFilter.getListOfAvailableLocationsTypes);
  console.log(eventFilter.getMaxPriceOfAllEvents);
}

init();
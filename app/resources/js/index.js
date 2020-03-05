/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import EventFilterBtn from "./UI/EventFilterBtn.js";
import EventFilter from "./filter/EventFilter.js";
import FilterView from "./UI/FilterView.js";

let eventListView,
  eventFilter,
  events,
  locations;

function init() {
  getEvents();
  EventFilterBtn.setElement(document.querySelector(".filter-btn"));
  EventFilterBtn.addEventListener("displayFilters", onFilterRequested);
  EventFilterBtn.addEventListener("hideFilters", hideFilters);
  FilterView.setElement(document.querySelector(".col1"));
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
  FilterView.setupFilterView(eventFilter.getListOfAvailableMusicGenres(), eventFilter.getListOfAvailableLocationsTypes(), eventFilter.getMaxPriceOfAllEvents());
}

function hideFilters() {
  FilterView.hideFilters();
}

init();
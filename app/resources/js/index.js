/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import EventFilterBtn from "./UI/EventFilterBtn.js";
import EventFilter from "./filter/EventFilter.js";
import FilterView from "./UI/EventFilterView.js";

let eventListView,
	eventFilter,
	events,
	locations;

function init() {
	getEvents();
	EventFilterBtn.setElement(document.querySelector(".filter-btn"));
	EventFilterBtn.addEventListener("displayFilters", onFilterRequested);
	EventFilterBtn.addEventListener("hideFilters", hideFilters);
	FilterView.setElement(document.querySelector(".col-filter"));
	FilterView.addEventListener("onFilterChanged", onFilterChanged);
}

async function getEvents() {
	events = await EventLoader.getEvents();
	locations = await LocationLoader.getLocations();
	localStorage.setItem("events", JSON.stringify(events));
	localStorage.setItem("locations", JSON.stringify(locations));
	events.sort(function (a, b) {
		return a.jsDate - b.jsDate;
	});
	eventListView = new EventList(events);
	eventListView.setElement(document.querySelector(".eventlist"));
	eventListView.addEventListener("toEventDetail", onEventDetailRequested);
	eventListView.appendEventsToDateCards(events, locations)
}

function onFilterRequested() {
	eventFilter = new EventFilter(events, locations);
	FilterView.setupFilterView(eventFilter.getListOfAvailableMusicGenres(), eventFilter.getListOfAvailableLocationsTypes(), eventFilter.getMaxPriceOfAllEvents());
}

function hideFilters() {
	FilterView.hideFilters();
}

function onFilterChanged(event) {
	let selectedTypes = event.data.selectedTypes,
		selectedGenres = event.data.selectedGenres,
		selectedPrice = event.data.selectedPrice,
		result = eventFilter.getFilteredEventsByArt(selectedTypes, events);
	result = eventFilter.getFilteredEventsByMusic(selectedGenres, result);
	result = eventFilter.getFilteredEventsByPrice(selectedPrice, result);
	eventListView.element.innerHTML = "";
	eventListView = new EventList(result);
	eventListView.setElement(document.querySelector(".eventlist"));
	eventListView.addEventListener("toEventDetail", onEventDetailRequested);
	eventListView.appendEventsToDateCards(result, locations)

}

function onEventDetailRequested(event) {
	let eventID = event.data.eventId;
	for (let i = 0; i < events.length; i++) {
		if (eventID === events[i].id) {
			localStorage.setItem("eventDetail", JSON.stringify(events[i]));
			window.location.href = "./sites/detailedEvent.html";
			break;
		}
	}
}

init();
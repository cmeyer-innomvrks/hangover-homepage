/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";

let eventListView;

function init() {
	let data = EventLoader.getEvents();
	// EventLoader.addEventListener("eventDL", onEventDownloadFinished);
	eventListView = new EventList();
	eventListView.setElement(document.querySelector(".eventlist"));

	// EventLoader.getEvents();
	eventListView.displayEvents(data);
}

function onEventDownloadFinished(event) {
	let eventlist = event.data.events;
	eventListView.displayEvents(eventlist);
}

init();
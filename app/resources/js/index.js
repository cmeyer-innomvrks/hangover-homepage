/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";

let eventListView;

function init() {
	EventLoader.addEventListener("eventDL", onEventDownloadFinished);
	eventListView = new EventList();
	eventListView.setElement(document.querySelector(".event-list"));

	EventLoader.getEvents();
}

function onEventDownloadFinished(event) {
	let eventlist = event.data.events;
	eventListView.displayEvents(eventlist);
}

init();
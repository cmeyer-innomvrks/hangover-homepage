/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";

function init() {
	console.log("INIT");
	EventLoader.getEvents();
}

init();
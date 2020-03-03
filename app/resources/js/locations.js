/* eslint-env browser */
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import LocationList from "./UI/LocationList.js";

let locationListView;

function init() {
  LocationLoader.addEventListener("locationDL", onLocationDownloadFinished);
  locationListView = new LocationList();
  locationListView.setElement(document.querySelector(".location-list"));

  LocationLoader.getLocations();
}

function onLocationDownloadFinished(event) {
  let locationlist = event.data.locations;
  locationListView.displayLocations(locationlist);
}

init();
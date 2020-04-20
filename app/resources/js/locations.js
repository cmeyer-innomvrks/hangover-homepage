/* eslint-env browser */
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import LocationList from "./UI/LocationList.js";
import LocationFilter from "./filter/LocationFilter.js";
import LocationFilterView from "./UI/LocationFilterView.js";
import LocationFilterBtn from "./UI/LocationFilterBtn.js";

let locationListView, locationFilter, locations;

function init() {
  getLocations();
  LocationFilterBtn.setElement(document.querySelector(".filter-btn"));
  LocationFilterBtn.addEventListener("displayFilters", onFilterRequested);
  LocationFilterBtn.addEventListener("hideFilters", hideFilters);
  LocationFilterView.setElement(document.querySelector(".col-filter"));
  LocationFilterView.addEventListener("onFilterChanged", onFilterChanged);
}

async function getLocations() {
  locations = await LocationLoader.getLocations();
  console.log(locations);
  locationListView = new LocationList();
  locationListView.setElement(document.querySelector(".locationlist"));
  locationListView.addEventListener(
    "toLocationDetail",
    onLocationDetailRequested
  );
  locationListView.appendLocationsToLetterCards(locations);
}

function onFilterRequested() {
  locationFilter = new LocationFilter(locations);
  LocationFilterView.setupFilterView(
    locationFilter.getListOfAvailableLocationTypes()
  );
}

function hideFilters() {
  LocationFilterView.hideFilters();
}

function onFilterChanged(event) {
  let selectedTypes = event.data.selectedTypes,
    result = locationFilter.getFilteredLocationsByArt(selectedTypes);
  locationListView.element.innerHTML = "";
  locationListView = new LocationList();
  locationListView.setElement(document.querySelector(".locationlist"));
  locationListView.addEventListener(
    "toLocationDetail",
    onLocationDetailRequested
  );
  locationListView.appendLocationsToLetterCards(result);
}

function onLocationDetailRequested(event) {
  let locationID = event.data.locationId;
  for (let i = 0; i < locations.length; i++) {
    if (locationID === locations[i].id) {
      localStorage.setItem("locationDetail", JSON.stringify(locations[i]));
      window.location.href = "./detailedLocation.html";
      break;
    }
  }
}

init();

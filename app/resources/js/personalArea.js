/* eslint-env browser */

import GoogleSignIn from "./UI/GoogleSignIn.js";
import Navigator from "./UI/personalAreaNavigator.js";
import PersonalEvents from "./UI/PersonalEvents.js";
import PersonalLocations from "./UI/PersonalLocations.js";
import Profile from "./UI/Profile.js";
import ProfileLoader from "./FirebaseDownloader/ProfileLoader.js";
import SavedEventsLoader from "./SavedItems/SavedEventsLoader.js";
import SavedLocationsLoader from "./SavedItems/SavedLocationsLoader.js";

function init() {
  GoogleSignIn.setElement(document.querySelector(".modal-dialog"));
  GoogleSignIn.addEventListener("signIn", onSignInCompleted);

  Navigator.setElement(document.querySelector(".selection-toggler"));
  Navigator.addEventListener("savedEvents", onSavedEventsRequest);
  Navigator.addEventListener("savedLocations", onSavedLocationsRequest);

  PersonalEvents.setElement(document.querySelector(".profile-event-list"));
  PersonalEvents.addEventListener("unsave", onUnsaveRequested);
  PersonalEvents.addEventListener("toEventDetail", onEventDetailRequested);

  PersonalLocations.setElement(
    document.querySelector(".profile-location-list")
  );
  PersonalLocations.addEventListener("unsave", onUnsaveRequestedLoc);
  PersonalLocations.addEventListener(
    "toLocationDetail",
    onLocationDetailRequested
  );

  Profile.setElement(document.querySelector(".profile-panel"));
  Profile.addEventListener("logoutRequest", onLogoutRequested);
}

async function onSignInCompleted() {
  GoogleSignIn.hide();
  Navigator.show();
  Profile.setProfile(JSON.parse(localStorage.getItem("user")));
  if (
    await ProfileLoader.isExisting(JSON.parse(localStorage.getItem("user")))
  ) {
    console.log(JSON.parse(localStorage.getItem("user")));
  } else {
    ProfileLoader.uploadProfile(JSON.parse(localStorage.getItem("user")));
  }
  Profile.show();
  let ids = await SavedEventsLoader.get();
  PersonalEvents.getSavedEvents(ids);
  PersonalEvents.displaySavedEvents();
  PersonalEvents.show();
}

function onLogoutRequested() {
  GoogleSignIn.show();
  Navigator.hide();
  Profile.hide();
  PersonalEvents.hide();
  PersonalLocations.hide();

  let domEvent = new Event("logout");
  document.querySelector(".user-logout").dispatchEvent(domEvent);
}

async function onSavedEventsRequest() {
  let ids = await SavedEventsLoader.get();
  PersonalEvents.getSavedEvents(ids);
  PersonalEvents.displaySavedEvents();
  PersonalEvents.show();
  PersonalLocations.hide();
  Navigator.activateEvents();
}

async function onSavedLocationsRequest() {
  let ids = await SavedLocationsLoader.get();
  console.log(ids);
  PersonalLocations.getSavedLocations(ids);
  PersonalLocations.displaySavedLocations();
  PersonalLocations.show();
  PersonalEvents.hide();
  Navigator.activateLocations();
}

async function onUnsaveRequested(event) {
  let id = event.data.eventId;
  await SavedEventsLoader.unsave(id);
  onSavedEventsRequest();
}

async function onUnsaveRequestedLoc(event) {
  let id = event.data.locationId;
  await SavedLocationsLoader.unsave(id);
  onSavedLocationsRequest();
}

function onEventDetailRequested(event) {
  let eventID = event.data.eventId,
    events = JSON.parse(localStorage.getItem("events"));
  for (let i = 0; i < events.length; i++) {
    if (eventID === events[i].id) {
      localStorage.setItem("eventDetail", JSON.stringify(events[i]));
      window.location.href = "./detailedEvent.html";
      break;
    }
  }
}

function onLocationDetailRequested(event) {
  let locationID = event.data.locationId,
    locations = JSON.parse(localStorage.getItem("locations"));
  for (let i = 0; i < locations.length; i++) {
    if (locationID === locations[i].id) {
      localStorage.setItem("locationDetail", JSON.stringify(locations[i]));
      window.location.href = "./detailedLocation.html";
      break;
    }
  }
}

init();

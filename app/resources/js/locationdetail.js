/* eslint-env browser */

import LocationDetailCard from "./UI/locationDetail/LocationDetailCard.js";
import SavedLocationsLoader from "./SavedItems/SavedLocationsLoader.js";
import LocationDetailHeader from "./UI/locationDetail/LocationDetailHeader.js";
import LocationDetailNavigator from "./UI/locationDetail/LocationDetailNavigator.js";
import LocationDetailEvents from "./UI/locationDetail/LocationDetailEvents.js";
import LocationDetailReviews from "./UI/locationDetail/LocationDetailReviews.js";
import LocationDetailPics from "./UI/locationDetail/LocationDetailPics.js";
import LocationDetailLeaveRatingBtn from "./UI/locationDetail/LocationDetailLeaveRatingBtn.js";
import LocationDetailLeaveRating from "./UI/locationDetail/LocationDetailLeaveRating.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import ProfileLoader from "./FirebaseDownloader/ProfileLoader.js";
import PictureLoader from "./FirebaseDownloader/PictureLoader.js";
import LocationDetailUploadImage from "./UI/locationDetail/LocationDetailUploadImage.js";
import LocationDetailUploadPicBtn from "./UI/locationDetail/LocationDetailUploadPicBtn.js";
import ReportLoader from "./FirebaseDownloader/ReportLoader.js";

let locationDetailCard, locationDetailHeader;

function init() {
  locationDetailHeader = new LocationDetailHeader();
  locationDetailHeader.setElement(document.querySelector(".profile-panel"));
  locationDetailHeader.setHeader();

  LocationDetailNavigator.setElement(document.querySelector(".navigator"));
  LocationDetailNavigator.setLocationName();
  LocationDetailNavigator.addEventListener("infoRequested", onInfoRequested);
  LocationDetailNavigator.addEventListener("eventRequested", onEventRequested);
  LocationDetailNavigator.addEventListener(
    "reviewRequested",
    onReviewRequested
  );
  LocationDetailNavigator.addEventListener("picsRequested", onPicsRequested);

  locationDetailCard = new LocationDetailCard();
  locationDetailCard.addEventListener("isLocationSaved", checkIfLocationSaved);
  locationDetailCard.addEventListener("saveLocation", onLocationSafeRequest);
  locationDetailCard.addEventListener(
    "unsaveLocation",
    onLocationUnsaveRequest
  );
  locationDetailCard.setElement(document.querySelector(".infos"));
  locationDetailCard.displayLocation();

  LocationDetailEvents.setElement(document.querySelector(".events"));
  LocationDetailEvents.displayEvents();
  LocationDetailEvents.addEventListener(
    "toEventDetail",
    onEventDetailRequested
  );
  LocationDetailEvents.hide();

  LocationDetailReviews.setElement(
    document.getElementsByClassName("review-class")[0]
  );
  LocationDetailReviews.setAverage();
  LocationDetailReviews.setOverview();
  LocationDetailReviews.showReviews();
  LocationDetailReviews.addEventListener("reviewLike", onReviewLike);
  LocationDetailReviews.addEventListener("reviewDislike", onReviewDislike);
  LocationDetailReviews.addEventListener("report", onReportRequested);
  LocationDetailReviews.hide();

  LocationDetailPics.setElement(document.querySelector(".picture-area"));
  LocationDetailPics.addEventListener("displaySinglePic", onSinglePicRequested);
  LocationDetailPics.addEventListener("pictureLike", onPictureLike);
  LocationDetailPics.addEventListener("pictureDislike", onPictureDislike);
  LocationDetailPics.addEventListener("report", onReportRequested);
  LocationDetailPics.hide();

  LocationDetailLeaveRatingBtn.setElement(document.querySelector(".well-sm"));
  LocationDetailLeaveRatingBtn.addEventListener(
    "leaveReview",
    onReviewInputRequested
  );
  LocationDetailLeaveRatingBtn.hide();

  LocationDetailLeaveRating.setElement(document.querySelector(".leave-review"));
  console.log(LocationDetailLeaveRating.element);
  LocationDetailLeaveRating.addEventListener("submitReview", onReviewSubmit);
  LocationDetailLeaveRating.hide();

  PictureLoader.addEventListener("imageUploadFinished", onImageUploadFinished);
  PictureLoader.addEventListener("updateProgress", onProgressUpdate);

  LocationDetailUploadImage.setElement(document.querySelector(".upload-image"));
  LocationDetailUploadImage.addEventListener("newFile", onNewFileUploadRequest);
  LocationDetailUploadImage.hide();

  LocationDetailUploadPicBtn.setElement(document.querySelector(".upload-pic"));
  LocationDetailUploadPicBtn.addEventListener(
    "uploadPic",
    onPicUploadRequested
  );
  LocationDetailUploadPicBtn.hide();

  LocationLoader.pushViews(
    JSON.parse(localStorage.getItem("locationDetail")).id,
    JSON.parse(localStorage.getItem("locationDetail")).watched
  );
}

function onInfoRequested() {
  locationDetailCard.show();
  LocationDetailNavigator.activateInfo();
  LocationDetailEvents.hide();
  LocationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.hide();
  LocationDetailUploadImage.hide();
  LocationDetailUploadPicBtn.hide();
  locationDetailHeader.setIndexTab("Info");
  document.querySelector(".no-pictures").textContent = "";
  document.querySelector(".no-review").textContent = "";
}

function onEventRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activateEvents();
  LocationDetailEvents.show();
  LocationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.hide();
  LocationDetailUploadImage.hide();
  LocationDetailUploadPicBtn.hide();
  locationDetailHeader.setIndexTab("Events");
  document.querySelector(".no-pictures").textContent = "";
  document.querySelector(".no-review").textContent = "";
}

function onReviewRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activateReviews();
  LocationDetailEvents.hide();
  if (JSON.parse(localStorage.getItem("locationDetail")).rating.length === 0) {
    LocationDetailReviews.hide();
    document.querySelector(".no-review").textContent =
      "Noch kein Review vorhanden. Jetzt ";
  } else {
    LocationDetailReviews.show();
  }
  LocationDetailLeaveRatingBtn.show();
  LocationDetailPics.hide();
  LocationDetailUploadImage.hide();
  LocationDetailUploadPicBtn.hide();
  locationDetailHeader.setIndexTab("Reviews");
  document.querySelector(".no-pictures").textContent = "";
}

async function onPicsRequested() {
  locationDetailCard.hide();
  LocationDetailNavigator.activatePics();
  LocationDetailEvents.hide();
  LocationDetailReviews.hide();
  LocationDetailLeaveRating.hide();
  LocationDetailLeaveRatingBtn.hide();
  LocationDetailPics.show();
  LocationDetailUploadImage.hide();
  LocationDetailUploadPicBtn.show();
  locationDetailHeader.setIndexTab("Pictures");
  console.log(JSON.parse(localStorage.getItem("locationDetail")).id);
  let pictures = await LocationLoader.getPictures(
    JSON.parse(localStorage.getItem("locationDetail")).id
  );
  if (pictures.length == 0) {
    document.querySelector(".no-pictures").textContent =
      "Noch keine Bilder vorhanden. Jetzt";
  }
  LocationDetailPics.reset();
  LocationDetailPics.addPictures(pictures);
  document.querySelector(".no-review").textContent = "";
}

async function checkIfLocationSaved(event) {
  let id = event.data.id;
  let result = await SavedLocationsLoader.isSaved(id);
  locationDetailCard.setSavedStatus(result);
}

function onLocationSafeRequest(event) {
  console.log("SAVE");
  SavedLocationsLoader.save(event.data.id);
  LocationLoader.pushSaved(
    JSON.parse(localStorage.getItem("locationDetail")).id,
    true,
    JSON.parse(localStorage.getItem("locationDetail")).saved
  );
  let location = JSON.parse(localStorage.getItem("locationDetail"));
  location.saved = location.saved + 1;
  localStorage.setItem("locationDetail", JSON.stringify(location));
  locationDetailHeader.setHeader();
}

function onLocationUnsaveRequest(event) {
  console.log("UNSAVE");
  SavedLocationsLoader.unsave(event.data.id);
  LocationLoader.pushSaved(
    JSON.parse(localStorage.getItem("locationDetail")).id,
    false,
    JSON.parse(localStorage.getItem("locationDetail")).saved
  );
  location.saved = location.saved - 1;
  localStorage.setItem("locationDetail", JSON.stringify(location));
  locationDetailHeader.setHeader();
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

function onReviewInputRequested() {
  let flag = false;

  if (JSON.parse(localStorage.getItem("isSignedIn"))) {
    flag = true;
  } else {
    alert("Du musst eingeloggt sein, um eine Bewertung abgeben zu können.");
  }
  // if (
  //   JSON.parse(localStorage.getItem("user")).reviews.indexOf(
  //     JSON.parse(localStorage.getItem("locationDetail")).id
  //   ) !== -1
  // ) {
  //   flag = false;
  //   alert(
  //     "Du hast schon eine Bewertung für diese Location geschrieben. Du kannst keine weitere Bewertung schreiben."
  //   );
  // }
  if (flag) {
    LocationDetailLeaveRating.show();
    LocationDetailLeaveRatingBtn.hide();
  }
}

function onReviewSubmit(event) {
  let data = event.data,
    userName = JSON.parse(localStorage.getItem("user")).name,
    userImg = JSON.parse(localStorage.getItem("user")).img,
    count = 0,
    sum = 0;
  LocationLoader.pushReview(data.id, data.stars, data.text, data.date);
  LocationDetailLeaveRating.hide();
  let location = JSON.parse(localStorage.getItem("locationDetail"));
  location.rating.push({
    stars: data.stars,
    text: data.text,
    date: data.date,
    name: userName,
    img: userImg,
    liked: 0,
    disliked: 0,
  });
  for (let i = 0; i < location.rating.length; i++) {
    count++;
    sum += location.rating[i].stars;
  }
  location.average = sum / count;
  localStorage.setItem("locationDetail", JSON.stringify(location));
  LocationDetailReviews.resetReviews();
  locationDetailHeader = new LocationDetailHeader();
  locationDetailHeader.setElement(document.querySelector(".profile-panel"));
  locationDetailHeader.setHeader();
  LocationDetailReviews.setAverage();
  LocationDetailReviews.setOverview();
  LocationDetailReviews.showReviews();
  LocationDetailReviews.show();
  document.querySelector(".no-review").textContent = "";
  ProfileLoader.updateUserReviews(data.id);
}

function onNewFileUploadRequest(event) {
  let file = event.data.file,
    caption = event.data.caption,
    reader = new FileReader();
  reader.onload = function (e) {
    let blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
    handleFile(blob, caption);
  };
  reader.readAsArrayBuffer(file);
}

function handleFile(blob, caption) {
  let metaData = {
    contentType: "image/jpeg",
  };
  PictureLoader.uploadPicture(
    JSON.parse(localStorage.getItem("locationDetail")).id,
    blob,
    metaData,
    caption
  );
}

async function onImageUploadFinished(event) {
  let url = event.data.url,
    text = event.data.caption,
    id = JSON.parse(localStorage.getItem("locationDetail")).id;
  await LocationLoader.pushPicture(id, url, text);
  LocationDetailPics.reset();
  let pictures = await LocationLoader.getPictures(
    JSON.parse(localStorage.getItem("locationDetail")).id
  );
  LocationDetailPics.addPictures(pictures);
  LocationDetailUploadImage.hide();
  LocationDetailUploadPicBtn.show();
  document.querySelector(".no-pictures").textContent = "";
}

function onProgressUpdate(event) {
  let progress = event.data.progress;
  LocationDetailUploadImage.updateProgress(progress);
}

function onPicUploadRequested() {
  LocationDetailUploadImage.show();
  LocationDetailUploadPicBtn.hide();
}

function onSinglePicRequested(event) {
  let src = event.data.src,
    url = "./singleImage.html";
  localStorage.setItem("picSrc", JSON.stringify(src));
  window.location.href = url;
}

function onPictureLike(event) {
  let pictureID = event.data.pictureID,
    likes = event.data.likes,
    locationID = JSON.parse(localStorage.getItem("locationDetail")).id;
  LocationLoader.pushLike(locationID, pictureID, likes);
}

function onPictureDislike(event) {
  let pictureID = event.data.pictureID,
    dislikes = event.data.dislikes,
    locationID = JSON.parse(localStorage.getItem("locationDetail")).id;
  LocationLoader.pushDislike(locationID, pictureID, dislikes);
}

function onReviewLike(event) {
  let reviewID = event.data.reviewID,
    likes = event.data.likes,
    locationID = JSON.parse(localStorage.getItem("locationDetail")).id;
  LocationLoader.pushReviewLike(locationID, reviewID, likes);
}

function onReviewDislike(event) {
  let reviewID = event.data.reviewID,
    dislikes = event.data.dislikes,
    locationID = JSON.parse(localStorage.getItem("locationDetail")).id;
  LocationLoader.pushReviewDislike(locationID, reviewID, dislikes);
}

function onReportRequested(event) {
  let objectID = event.data.objectID,
    locationID = JSON.parse(localStorage.getItem("locationDetail")).id,
    reportType = event.data.reportType;
  ReportLoader.pushReport(locationID, reportType, objectID);
  alert("Danke für deine Mithilfe!");
}

init();

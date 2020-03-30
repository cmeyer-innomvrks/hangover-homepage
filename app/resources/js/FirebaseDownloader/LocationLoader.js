/* eslint-env browser */

import { locationConverter } from "./Location.js";
import { Event, Observable } from "../utils/Observable.js";
import { database } from "./Database.js";

class LocationLoader extends Observable {
  constructor() {
    super();
    this.locations = [];
  }

  async downloadLocations() {
    let locations = [];
    await database
      .collection("Locations")
      .withConverter(locationConverter)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let currLocation = doc.data();
          currLocation.addId(doc.id);
          locations.push(currLocation);
        });
      });
    // let downloadEvent = new Event("locationDL", { locations: locations });
    // this.notifyAll(downloadEvent);
    return locations;
  }

  async getRatings(locationID) {
    let ratings = [];
    await database
      .collection("Locations")
      .doc(locationID)
      .collection("Rating")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let currRating = {
            stars: parseFloat(doc.data().ratingStars),
            text: doc.data().ratingText,
            date: doc.data().ratingDate,
            name: doc.data().userName,
            img: doc.data().userImg
          };
          ratings.push(currRating);
        });
      });
    // let downloadEvent = new Event("locationDL", { locations: locations });
    // this.notifyAll(downloadEvent);
    return ratings;
  }

  async getLocations() {
    this.locations = await this.downloadLocations();
    for (let i = 0; i < this.locations.length; i++) {
      this.locations[i].addRatings(await this.getRatings(this.locations[i].id));
    }
    return this.locations;
  }

  pushReview(id, stars, text, date) {
    let userName = JSON.parse(localStorage.getItem("user")).name,
      img = JSON.parse(localStorage.getItem("user")).img;
    database
      .collection(`Locations/${id}/Rating`)
      .doc()
      .set({
        ratingDate: date,
        ratingStars: stars,
        ratingText: text,
        userName: userName,
        userImg: img
      })
      .then(function() {
        console.log("Doc written...");
      });
  }

  pushPicture(url, text) {
    database
      .collection(`Locations/${id}/Pics`)
      .doc()
      .set({
        url: url,
        text: text
      })
      .then(function() {
        console.log("Doc written...");
      });
  }

  async getPictures(locationID) {
    let pictures = [];
    await database
      .collection("Locations")
      .doc(locationID)
      .collection("Pics")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let currPicture = {
            url: doc.data().url,
            text: doc.data().ratingText
          };
          pictures.push(currPicture);
        });
      });
    return pictures;
  }
}

export default new LocationLoader();

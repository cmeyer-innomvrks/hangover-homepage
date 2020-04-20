/* eslint-env browser */

import { database } from "../FirebaseDownloader/Database.js";

class SavedLocationsLoader {
  async isSaved(id) {
    let flag;
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let savedLocations = doc.data().locations;
          if (savedLocations.indexOf(id) !== -1) {
            flag = true;
          } else {
            flag = false;
          }
        } else {
          flag = false;
        }
      });
    return flag;
  }

  async save(id) {
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let savedLocations = doc.data().locations;
          savedLocations.push(id);
          database
            .collection("User")
            .doc(JSON.parse(localStorage.getItem("user")).mail)
            .set(
              {
                locations: savedLocations
              },
              { merge: true }
            );
        }
      });
  }

  async unsave(id) {
    console.log(id);
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let savedLocations = doc.data().locations;
          savedLocations = savedLocations.filter(function(item) {
            return item !== id;
          });
          database
            .collection("User")
            .doc(JSON.parse(localStorage.getItem("user")).mail)
            .set(
              {
                locations: savedLocations
              },
              { merge: true }
            );
        }
      });
  }

  async get() {
    let savedLocations;
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          savedLocations = doc.data().locations;
          console.log("SAVED LOCATIONS LOADER get()", savedLocations);
        }
      });
    return savedLocations;
  }
}

export default new SavedLocationsLoader();

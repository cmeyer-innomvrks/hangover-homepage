/* eslint-env browser */

import { database } from "../FirebaseDownloader/Database.js";

class SavedEventsLoader {
  async isSaved(id) {
    let flag;
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let savedEvents = doc.data().events;
          console.log(savedEvents);
          if (savedEvents.indexOf(id) !== -1) {
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
          let savedEvents = doc.data().events;
          savedEvents.push(id);
          database
            .collection("User")
            .doc(JSON.parse(localStorage.getItem("user")).mail)
            .set(
              {
                events: savedEvents
              },
              { merge: true }
            );
        }
      });
  }

  async unsave(id) {
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let savedEvents = doc.data().events;
          savedEvents = savedEvents.filter(function(item) {
            return item !== id;
          });
          console.log("unsave()", savedEvents);
          database
            .collection("User")
            .doc(JSON.parse(localStorage.getItem("user")).mail)
            .set(
              {
                events: savedEvents
              },
              { merge: true }
            );
        }
      });
  }

  async get() {
    let savedEvents;
    await database
      .collection("User")
      .doc(JSON.parse(localStorage.getItem("user")).mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          savedEvents = doc.data().events;
        }
      });
    return savedEvents;
  }
}

export default new SavedEventsLoader();

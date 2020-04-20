/* eslint-env browser */

import eventConverter from "./Event.js";
import { Event, Observable } from "../utils/Observable.js";
import { database } from "./Database.js";

async function fetchEvents() {
  let events = [];
  await database
    .collection("Events")
    .withConverter(eventConverter)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let currEvent = doc.data();
        events.push(currEvent);
      });
    });
  return events;
}

class EventLoader extends Observable {
  async getEvents() {
    let events = [];
    await database
      .collection("Events")
      .withConverter(eventConverter)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let currEvent = doc.data();
          currEvent.addId(doc.id);
          events.push(currEvent);
        });
      });
    let downloadEvent = new Event("eventDL", { events: events });
    this.notifyAll(downloadEvent);
    return events;
  }

  pushViews(id, views) {
    database
      .collection(`Events`)
      .doc(id)
      .set(
        {
          watched: views + 1,
        },
        { merge: true }
      )
      .then(function () {
        console.log("Doc written...");
      });
  }

  pushSaved(id, flag, saved) {
    let newVal = saved;
    if (flag) {
      newVal += 1;
    } else {
      newVal -= 1;
    }
    database
      .collection(`Events`)
      .doc(id)
      .set(
        {
          saved: newVal,
        },
        { merge: true }
      )
      .then(function () {
        console.log("Doc written...");
      });
  }
}

export default new EventLoader();

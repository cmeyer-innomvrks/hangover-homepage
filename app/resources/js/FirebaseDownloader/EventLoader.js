import eventConverter from "./Event.js";
import { Event, Observable } from "../utils/Observable.js";

const firebaseConfig = {
    apiKey: "AIzaSyBTkMmhZ7Z4luQB8cQQlrVFtYzDwqO0fcs",
    authDomain: "hangover-243509.firebaseapp.com",
    databaseURL: "https://hangover-243509.firebaseio.com",
    projectId: "hangover-243509",
    storageBucket: "hangover-243509.appspot.com",
    messagingSenderId: "852344862579",
    appID: "1:852344862579:web:b6fece9d8273f06f",
};
firebase.initializeApp(firebaseConfig);

let database = firebase.firestore();

// function fetchEvents() {
//     let events = [];
//     database.collection("Events")
//         .withConverter(eventConverter)
//         .get().then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 let currEvent = doc.data();
//                 events.push(currEvent);
//             });
//         });
//     return events;
// }

class EventLoader extends Observable {

    getEvents() {
        let events = [],
            self = this;
        database.collection("Events")
            .withConverter(eventConverter)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let currEvent = doc.data();
                    events.push(currEvent);
                });
            });
        let downloadEvent = new Event("eventDL", { events: events });
        self.notifyAll(downloadEvent);
    }
}

export default new EventLoader();

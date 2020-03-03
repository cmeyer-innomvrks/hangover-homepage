import eventConverter from "./Event.js";
import { Event, Observable } from "../utils/Observable.js";
import database from "./Database.js";

async function fetchEvents() {
    let events = [];
    await database.collection("Events")
        .withConverter(eventConverter)
        .get().then(function (querySnapshot) {
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
        await database.collection("Events")
            .withConverter(eventConverter)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let currEvent = doc.data();
                    events.push(currEvent);
                });
            });
        let downloadEvent = new Event("eventDL", { events: events });
        this.notifyAll(downloadEvent);
        return events;
    }
}

export default new EventLoader();

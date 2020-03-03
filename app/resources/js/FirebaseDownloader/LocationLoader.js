import locationConverter from "./Location.js";
import { Event, Observable } from "../utils/Observable.js";
import database from "./Database.js";

async function fetchLocations() {
    let locations = [];
    await database.collection("Locations")
        .withConverter(locationConverter)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let currLocation = doc.data();
                locations.push(currLocation);
            });
        });
    return locations;
}

class LocationLoader extends Observable {

    async getLocations() {
        let locations = [];
        await database.collection("Locations")
            .withConverter(locationConverter)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let currLocation = doc.data();
                    currLocation.addId(doc.id);
                    locations.push(currLocation);
                });
            });
        let downloadEvent = new Event("locationDL", { locations: locations });
        this.notifyAll(downloadEvent);
        return locations;
    }
}

export default new LocationLoader();
import locationConverter from "./Location.js";
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
                    locations.push(currLocation);
                });
            });
        let downloadEvent = new Event("locationDL", { locations: locations });
        this.notifyAll(downloadEvent);
    }
}

export default new LocationLoader();
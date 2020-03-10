import platform from "./mapk.js";
import Observable, { Event } from "../utils/Observable.js";

/* eslint-env browser */

class Geodcoder extends Observable {
    constructor() {
        super();
        this.geocoder = platform.getGeocodingService();
    }

    getLatLng(location) {
        let params = {
            housenumber: location.housenumber,
            street: location.street,
            city: location.city,
            country: "germany",
            jsonattributes: 1
        };

        this.geocoder.geocode(params, this.onSuccess.bind(this), this.onError);
    }

    onSuccess(result) {
        let locations = result.response.view[0].result,
            onGeodingFinishedEvent = new Event("geocodingFinished", { result: locations[0] });
        this.notifyAll(onGeodingFinishedEvent);
    }

    onError() {
        console.log("Error while Geocoding!");
    }
}

export default new Geodcoder();
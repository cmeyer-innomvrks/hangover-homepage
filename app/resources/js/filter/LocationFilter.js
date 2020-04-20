/* eslint-env browser */

class LocationFilter {
    constructor(locations) {
        this.locations = locations;
    }

    getListOfAvailableLocationTypes() {
        let result = [];
        for (let i = 0; i < this.locations.length; i++) {
            if (result.indexOf(this.locations[i].art) === -1) {
                result.push(this.locations[i].art);
            }
        }
        return result;
    }

    getFilteredLocationsByArt(listOfActiveArts) {
        let result = [];
        for (let i = 0; i < listOfActiveArts.length; i++) {
            for (let j = 0; j < this.locations.length; j++) {
                if (this.locations[j].art === listOfActiveArts[i]) {
                    result.push(this.locations[j]);
                }
            }
        }
        return result;
    }
}

export default LocationFilter;
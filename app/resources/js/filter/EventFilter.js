/* eslint-env browser */

class EventFilter {
    constructor(events, locations) {
        this.events = events;
        this.locations = locations;
    }

    getListOfAvailableMusicGenres() {
        let genres = [];
        for (let i = 0; i < this.events.length; i++) {
            let temp = this.events[i].music.split(", ");
            for (let j = 0; j < temp.length; j++) {
                if (genres.indexOf(temp[j]) === -1) {
                    genres.push(temp[j]);
                }
            }
        }
        return genres;
    }

    getListOfAvailableLocationsTypes() {
        let locationsIDs = [],
            locationTypes = [];
        for (let i = 0; i < this.events.length; i++) {
            if (locationsIDs.indexOf(this.events[i].locationid) === -1) {
                locationsIDs.push(this.events[i].locationid);
            }
        }
        for (let i = 0; i < locationsIDs.length; i++) {
            let index = this.locations.indexOf(locationsIDs[i]);
            if (locationTypes.indexOf(this.locations[index].art) === -1) {
                locationTypes.push(this.locations[index].art);
            }
        }
        return locationTypes;
    }

    getMaxPriceOfAllEvents() {
        let max = 0;
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].price > max) {
                max = this.events[i].price;
            }
        }
        return max;
    }

    getFilteredEventsByMusic(listOfGenres) {
        //TODO
    }

    getFilteredEventsByArt(listOfArts) {
        //TODO
    }

    getFilteredEventsByPrice(maxPrice) {
        //TODO
    }
}

export default EventFilter;
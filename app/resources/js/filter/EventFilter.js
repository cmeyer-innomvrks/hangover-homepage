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
            for (let j = 0; j < this.locations.length; j++) {
                if (locationsIDs[i] === this.locations[j].id) {
                    if (locationTypes.indexOf(this.locations[j].art) === -1) {
                        locationTypes.push(this.locations[j].art);
                    }
                    break;
                }
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

    getFilteredEventsByMusic(listOfActiveGenres, events) {
        let result = [];
        for (let i = 0; i < events.length; i++) {
            let music = events[i].music.split(", ");
            for (let j = 0; j < music.length; j++) {
                if (listOfActiveGenres.indexOf(music[j]) !== -1) {
                    result.push(events[i]);
                    break;
                }
            }
        }
        return result;
    }

    getFilteredEventsByArt(listOfActiveArts, events) {
        let result = [];
        for (let i = 0; i < listOfActiveArts.length; i++) {
            for (let j = 0; j < events.length; j++) {
                for (let k = 0; k < this.locations.length; k++) {
                    if (events[j].locationid === this.locations[k].id) {
                        if (this.locations[k].art === listOfActiveArts[i]) {
                            result.push(events[j]);
                        }
                        break;
                    }
                }
            }
        }
        return result;
    }

    getFilteredEventsByPrice(maxPrice, events) {
        let result = [];
        for (let i = 0; i < events.length; i++) {
            if (events[i].price <= maxPrice) {
                result.push(events[i]);
            }
        }
        return result;
    }
}

export default EventFilter;
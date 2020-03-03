class Event {
    constructor(date, headline, image, info, isPremiumEvent, locationid, music, price, time) {
        this.date = date;
        this.headline = headline;
        this.image = image;
        this.info = info;
        this.isPremiumEvent = isPremiumEvent;
        this.locationid = locationid;
        this.music = music;
        this.price = price;
        this.time = time;
    }

    toString() {
        return this.headline + ", " + this.date;
    }
}

const eventConverter = {
    toFirestore: function (event) {
        return {
            date: event.date,
            headline: event.headline,
            ima: event.image,
            info: event.info,
            isPremiumEvent: event.isPremiumEvent,
            locationid: event.locationid,
            music: event.music,
            price: event.price,
            time: event.time,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Event(data.date, data.headline, data.ima, data.info, data.isPremiumEvent, data.locationid, data.music, data.price, data.time);
    },
};

export default (Event, eventConverter);

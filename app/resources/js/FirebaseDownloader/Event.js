/* eslint-env browser */
class Event {
  constructor(
    date,
    headline,
    image,
    info,
    isPremiumEvent,
    locationid,
    music,
    price,
    time,
    watched,
    saved
  ) {
    this.date = date;
    this.headline = headline;
    this.image = image;
    this.info = info;
    this.isPremiumEvent = isPremiumEvent;
    this.locationid = locationid;
    this.music = music;
    this.price = parseFloat(price);
    this.time = time;
    this.watched = watched;
    this.saved = saved;
    this.addDate();
  }

  addDate() {
    let day = parseInt(this.date.split(".")[0]),
      month = parseInt(this.date.split(".")[1]),
      year = parseInt(this.date.split(".")[2]),
      hours = parseInt(this.time.split(":")[0]),
      minutes = parseInt(this.time.split(":")[1]);
    this.jsDate = new Date(year, month, day, hours, minutes, 0, 0);
  }

  addId(id) {
    this.id = id;
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
      watched: event.watched,
      saved: event.saved,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Event(
      data.date,
      data.headline,
      data.ima,
      data.info,
      data.isPremiumEvent,
      data.locationid,
      data.music,
      data.price,
      data.time,
      data.watched,
      data.saved
    );
  },
};

export default (Event, eventConverter);

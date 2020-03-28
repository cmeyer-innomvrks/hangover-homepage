/* eslint-env browser */

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

class Location {
  constructor(
    id,
    art,
    city,
    housenumber,
    image,
    info,
    isPremiumLocation,
    isPremiumMapIcon,
    name,
    street,
    zip,
    monday_from,
    monday_till,
    tuesday_from,
    tuesday_till,
    wednesday_from,
    wednesday_till,
    thursday_from,
    thursday_till,
    friday_from,
    friday_till,
    saturday_from,
    saturday_till,
    sunday_from,
    sunday_till
  ) {
    this.id = id;
    this.art = art;
    this.city = city;
    this.housenumber = housenumber;
    this.image = image;
    this.info = info;
    this.isPremiumLocation = isPremiumLocation;
    this.isPremiumMapIcon = isPremiumMapIcon;
    this.name = name;
    this.street = street;
    this.zip = zip;
    this.monday_from = monday_from;
    this.monday_till = monday_till;
    this.tuesday_from = tuesday_from;
    this.tuesday_till = tuesday_till;
    this.wednesday_from = wednesday_from;
    this.wednesday_till = wednesday_till;
    this.thursday_from = thursday_from;
    this.thursday_till = thursday_till;
    this.friday_from = friday_from;
    this.friday_till = friday_till;
    this.saturday_from = saturday_from;
    this.saturday_till = saturday_till;
    this.sunday_from = sunday_from;
    this.sunday_till = sunday_till;
  }

  addId(id) {
    this.id = id;
  }

  addRatings(rating) {
    this.rating = rating;
    this.calcAverageRating();
  }

  calcAverageRating() {
    if (this.rating.length > 0) {
      let sum = 0;
      for (let i = 0; i < this.rating.length; i++) {
        sum += this.rating[i].stars;
      }
      this.average = round(sum / this.rating.length, 1);
      return round(sum / this.rating.length, 1);
    }
    this.average = 0;
    return 0;
  }
}

const locationConverter = {
  toFirestore: function(event) {
    return {
      art: art,
      city: city,
      housenumber: housenumber,
      ima: image,
      info: info,
      isPremiumLocation: isPremiumLocation,
      isPremiumMapIcon: isPremiumMapIcon,
      name: name,
      street: street,
      zip: zip,
      monday_from: monday_from,
      monday_till: monday_till,
      tuesday_from: tuesday_from,
      tuesday_till: tuesday_till,
      wednesday_from: wednesday_from,
      wednesday_till: wednesday_till,
      thursday_from: thursday_from,
      thursday_till: thursday_till,
      friday_from: friday_from,
      friday_till: friday_till,
      saturday_from: saturday_from,
      saturday_till: saturday_till,
      sunday_from: sunday_from,
      sunday_till: sunday_till
    };
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new Location(
      data.id,
      data.art,
      data.city,
      data.housenumber,
      data.ima,
      data.info,
      data.isPremiumLocation,
      data.isPremiumMapIcon,
      data.name,
      data.street,
      data.zip,
      data.monday_from,
      data.monday_till,
      data.tuesday_from,
      data.tuesday_till,
      data.wednesday_from,
      data.wednesday_till,
      data.thursday_from,
      data.thursday_till,
      data.friday_from,
      data.friday_till,
      data.saturday_from,
      data.saturday_till,
      data.sunday_from,
      data.sunday_till
    );
  }
};

export default Location;
export { locationConverter };

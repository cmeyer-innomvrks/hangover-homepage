/* eslint-env browser */

import { database } from "../FirebaseDownloader/Database.js";

class ProfileLoader {
  async isExisting(profile) {
    let flag,
      self = this;
    await database
      .collection("User")
      .doc(profile.mail)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("user exists");
          flag = true;
          let user = {
            name: profile.name,
            mail: doc.data().email,
            img: profile.img,
            reviews: doc.data().reviews
          };
          localStorage.setItem("user", JSON.stringify(user));
          self.updateProfile(profile);
        } else {
          console.log("user does not exist");
          flag = false;
        }
      });
    return flag;
  }

  uploadProfile(profile) {
    database
      .collection("User")
      .doc(profile.mail)
      .set({
        name: profile.name,
        email: profile.mail,
        img: profile.img,
        events: [],
        locations: [],
        reviews: []
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  updateProfile(profile) {
    database
      .collection("User")
      .doc(profile.mail)
      .set(
        {
          name: profile.name,
          img: profile.img
        },
        { merge: true }
      )
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  updateUserReviews(locationID) {
    let user = JSON.parse(localStorage.getItem("user")),
      userID = user.mail,
      reviews;
    console.log(user);
    if (user.reviews) {
      reviews = user.reviews;
      reviews.push(locationID);
    } else {
      reviews = [locationID];
    }
    user.reviews = reviews;
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));

    database
      .collection("User")
      .doc(userID)
      .set({ reviews: reviews }, { merge: true })
      .then(function() {
        console.log("Doc written...");
      });
  }
}

export default new ProfileLoader();

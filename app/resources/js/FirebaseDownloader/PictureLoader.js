/* eslint-env browser */

import { storageRef } from "./Database.js";
import { Event, Observable } from "../utils/Observable.js";

class PictureLoader extends Observable {
  constructor() {
    super();
  }

  uploadPicture(locationID, blob, metaData) {
    storageRef
      .child(`${locationID}/images/${new Date().toString()}.jpg`)
      .put(blob, metaData)
      .then(snapshot => {
        let downloadURL = snapshot.ref.getDownloadURL(),
          onUploadFinishedEvent = new Event("imageUploadFinished", {
            url: downloadURL
          });
        this.notifyAll(onUploadFinishedEvent);
      });
  }

  async getDownloadURLs(locationID) {
    let self = this;
    console.log(self);
    await storageRef
      .child(`${locationID}/images`)
      .listAll()
      .then(function(res) {
        res.items.forEach(function(itemRef) {
          console.log(itemRef.getDownloadURL());
          itemRef.getDownloadURL().then(function(url) {
            self.sendEvent(self, url);
          });
        });
      });
  }

  sendEvent(self, url) {
    let imageSrcRdyEvent = new Event("imageSrcRdy", { url: url });
    self.notifyAll(imageSrcRdyEvent);
  }
}

export default new PictureLoader();

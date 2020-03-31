/* eslint-env browser */

import { storageRef } from "./Database.js";
import { Event, Observable } from "../utils/Observable.js";

class PictureLoader extends Observable {
  constructor() {
    super();
  }

  async uploadPicture(locationID, blob, metaData) {
    let self = this,
      uploadTask = storageRef
        .child(`${locationID}/images/${new Date().toString()}.jpg`)
        .put(blob, metaData);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          progressEvent = new Event("updateProgress", { progress: progress });
        self.notifyAll(progressEvent);
      },
      function(error) {},
      async function() {
        let downloadURL = await uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(url) {
              return url;
            }),
          onUploadFinishedEvent = new Event("imageUploadFinished", {
            url: downloadURL
          });
        console.log("upload Finished");
        self.notifyAll(onUploadFinishedEvent);
      }
    );
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

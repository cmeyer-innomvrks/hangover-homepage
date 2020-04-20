/* eslint-env browser */

import { storageRef } from "./Database.js";
import { Event, Observable } from "../utils/Observable.js";

class PictureLoader extends Observable {
  constructor() {
    super();
  }

  async uploadPicture(locationID, blob, metaData, caption) {
    let self = this,
      uploadTask = storageRef
        .child(`${locationID}/images/${new Date().toString()}.jpg`)
        .put(blob, metaData);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          progressEvent = new Event("updateProgress", { progress: progress });
        self.notifyAll(progressEvent);
      },
      function (error) {},
      async function () {
        let downloadURL = await uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function (url) {
              return url;
            }),
          onUploadFinishedEvent = new Event("imageUploadFinished", {
            url: downloadURL,
            caption: caption,
          });
        self.notifyAll(onUploadFinishedEvent);
      }
    );
  }
}

export default new PictureLoader();

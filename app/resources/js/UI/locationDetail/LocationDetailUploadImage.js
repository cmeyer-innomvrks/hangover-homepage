/* eslint-env browser */

import View from "../View.js";
import { Event } from "../../utils/Observable.js";

class LocationDetailUploadImage extends View {
  constructor() {
    super();
  }

  setElement(element) {
    super.setElement(element);
    let self = this;
    this.progressBar = this.element.querySelector(".progress-bar");
    this.dropZone = this.element.querySelector("#drop-zone");
    this.uploadForm = this.element.querySelector("#js-upload-form");
    this.element.addEventListener("click", function(e) {
      if (event.target.classList.contains("upload-btn")) {
        console.log(
          self.element.querySelector("#js-upload-files"),
          "upload input"
        );
        let file = self.element.querySelector("#js-upload-files").files[0];
        self.startUpload(file);
      }
    });
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      this.element.addEventListener(eventName, this.preventDefaults);
    });
    this.element.addEventListener("drop", this.onDrop.bind(this));
    this.element.addEventListener("dragenter", this.onEnter.bind(this));
    this.element.addEventListener("dragleave", this.onLeave.bind(this));
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onDrop(e) {
    let files = e.dataTransfer.files;
    if (files[0].type.match(/image.*/)) {
      this.startUpload(files[0]);
    }
    this.dropZone.classList.remove("drop");
  }

  onEnter() {
    this.dropZone.classList.add("drop");
  }

  onLeave() {
    this.dropZone.classList.remove("drop");
  }

  startUpload(file) {
    let caption = this.element.querySelector("#new-image-caption").value,
      newFileEvent = new Event("newFile", { file: file, caption: caption });
    this.notifyAll(newFileEvent);
    this.element.querySelector("#new-image-caption").value = "";
  }

  updateProgress(progress) {
    this.progressBar.style.width = progress + "%";
  }
}

export default new LocationDetailUploadImage();

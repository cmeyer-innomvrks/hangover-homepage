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
    this.agb = this.element.querySelector(".form-check-input");
    this.fileName = this.element.querySelector(".file-name");
    this.progressBar = this.element.querySelector(".progress-bar");
    this.dropZone = this.element.querySelector("#drop-zone");
    this.uploadForm = this.element.querySelector("#js-upload-form");
    this.uploadForm.addEventListener("change", this.onFileInput.bind(this));
    this.element.addEventListener("click", function(e) {
      if (event.target.classList.contains("upload-btn")) {
        self.startUpload(self.file);
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
    this.file = files[0];
    if (files[0].type.match(/image.*/)) {
      this.fileName.textContent = files[0].name;
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
    if (this.agb.checked) {
      let caption = this.element.querySelector("#new-image-caption").value,
        newFileEvent = new Event("newFile", { file: file, caption: caption });
      this.notifyAll(newFileEvent);
      this.element.querySelector("#new-image-caption").value = "";
      this.agb.checked = false;
    } else {
      alert(
        "Du musst unsere AGB und Datenschutzerklärung akzeptieren, um Bilder hochzuladen."
      );
    }
  }

  updateProgress(progress) {
    this.progressBar.style.width = progress + "%";
  }

  onFileInput(e) {
    console.log(e);
    let file = e.target.files[0];
    this.file = file;
    this.fileName.textContent = file.name;
  }
}

export default new LocationDetailUploadImage();

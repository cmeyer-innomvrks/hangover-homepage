/* eslint-env browser */

function init() {
  let imageSrc = JSON.parse(localStorage.getItem("picSrc"));
  document.querySelector(".image").src = imageSrc;
}

window.onload = init;

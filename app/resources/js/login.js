
function init() {
  document.querySelector(".user-logout").addEventListener("logout", this.onSignOut);
}

function onSignIn(googleUser) {
  document.querySelector(".cd-secondary-nav")
    .firstElementChild.firstElementChild
    .textContent = "PERSÖNLICHER BEREICH";
  let profile = googleUser.getBasicProfile(),
    user = {
      name: profile.getName(),
      mail: profile.getEmail(),
      img: profile.getImageUrl(),
    },
    event = new Event("signIn");
  localStorage.setItem("isSignedIn", JSON.stringify(gapi.auth2.getAuthInstance().isSignedIn.get()));
  localStorage.setItem("user", JSON.stringify(user));
  document.querySelector(".modal-dialog").dispatchEvent(event);
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    document.querySelector(".cd-secondary-nav")
      .firstElementChild.firstElementChild
      .textContent = "LOG IN";
    localStorage.setItem("isSignedIn", JSON.stringify(gapi.auth2.getAuthInstance().isSignedIn.get()));
    alert("Sie wurden erfolgreich ausgeloggt.");
  });
}

window.onload = function () {
  this.init();
}
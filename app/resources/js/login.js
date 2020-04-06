function init() {
  let logoutBtn = document.querySelector(".login-out-btn").firstElementChild
    .firstElementChild;
  if (JSON.parse(localStorage.getItem("isSignedIn"))) {
    logoutBtn.setAttribute("href", "#");
    if (document.title === "HANGOVER - Profil") {
      logoutBtn.addEventListener("click", onSignOut);
    } else {
      logoutBtn.addEventListener("click", onSignOut2);
    }
    logoutBtn.textContent = "Log out";
  } else {
    logoutBtn.textContent = "Log in";
    if (document.title === "HANGOVER - Events") {
      logoutBtn.setAttribute("href", "./sites/userprofile.html");
    } else {
      logoutBtn.setAttribute("href", "./userprofile.html");
    }
  }
  if (document.title === "HANGOVER - Profil") {
    document
      .querySelector(".user-logout")
      .addEventListener("logout", onSignOut);
  }
}

function onSignIn(googleUser) {
  document.querySelector(
    ".login-out-btn"
  ).firstElementChild.firstElementChild.textContent = "Log out";
  let profile = googleUser.getBasicProfile(),
    user = {
      name: profile.getName(),
      mail: profile.getEmail(),
      img: profile.getImageUrl(),
    },
    event = new Event("signIn");
  localStorage.setItem(
    "isSignedIn",
    JSON.stringify(gapi.auth2.getAuthInstance().isSignedIn.get())
  );
  localStorage.setItem("user", JSON.stringify(user));
  document.querySelector(".modal-dialog").dispatchEvent(event);
  init();
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    document.querySelector(
      ".cd-secondary-nav"
    ).firstElementChild.firstElementChild.textContent = "LOG IN";
    localStorage.setItem(
      "isSignedIn",
      JSON.stringify(gapi.auth2.getAuthInstance().isSignedIn.get())
    );
    init();
    alert("Sie wurden erfolgreich ausgeloggt.");
    location.reload();
  });
}

function onSignOut2() {
  window.gapi.load("auth2", () => {
    window.gapi.auth2
      .init({
        client_id:
          "1025215188376-cjvem92vgkhqvg4euhh5vjmrh2eacbmo.apps.googleusercontent.com",
      })
      .then(() => {
        window.gapi.auth2
          .getAuthInstance()
          .signOut()
          .then(function () {
            document.querySelector(
              ".cd-secondary-nav"
            ).firstElementChild.firstElementChild.textContent = "LOG IN";
            localStorage.setItem(
              "isSignedIn",
              JSON.stringify(gapi.auth2.getAuthInstance().isSignedIn.get())
            );
            init();
            alert("Sie wurden erfolgreich ausgeloggt.");
            location.reload();
          });
      });
  });
}

window.onload = function () {
  init();
};

import database from "../js/FirebaseDownloader/Database.js";

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  
    const modal = document.querySelector(".modal-dialog");
    let profilePannel = document.querySelector(".profile-panel");
    let userName = document.getElementById("user-name");
    let userImg = document.getElementById("user-img");
  
    modal.classList.add("invisible")
    profilePannel.classList.remove("invisible");
  
    userName.textContent = `Hallo ${profile.getName()},`;
    userImg.textContent = `${profile.getImageUrl()}`;   
  
    // Add a new document in collection "cities"
    database.collection("User")
      .doc(profile.getEmail())
      .set({
        name: profile.getName(),
        email: profile.getEmail(),
        img: profile.getImageUrl()
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

/* eslint-env browser */

import database from "../FirebaseDownloader/Database.js";

class ProfileLoader {

    async isExisting(profile) {
        let flag;
        await database.collection("User").doc(profile.mail).get().then(function (doc) {
            if (doc.exists) {
                flag = true;
            } else {
                flag = false;
            }
        });
        return flag;
    }

    uploadProfile(profile) {
        database.collection("User")
            .doc(profile.mail)
            .set({
                name: profile.name,
                email: profile.mail,
                img: profile.img,
                events: [],
                locations: [],
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }
}

export default new ProfileLoader();
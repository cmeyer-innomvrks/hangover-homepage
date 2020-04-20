/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";
import { database } from "./Database.js";

class ReportLoader extends Observable {
  constructor() {
    super();
  }

  pushReport(locationID, reportType, objectID) {
    database
      .collection(`Reports`)
      .doc()
      .set({
        locationID: locationID,
        reportType: reportType,
        objectID: objectID,
      })
      .then(function () {
        console.log("Doc written...");
      });
  }
}
export default new ReportLoader();

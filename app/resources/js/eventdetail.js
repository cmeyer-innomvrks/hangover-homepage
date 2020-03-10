/* eslint-env browser */

import EventDetailCard from "./UI/eventDetail/EventDetailCard.js";

let eventDetailCard;

function init() {
    eventDetailCard = new EventDetailCard();
    eventDetailCard.setElement(document.querySelector(".detailed-event"));
    eventDetailCard.displayEvent();
    eventDetailCard.updateNavigator();
}

init();
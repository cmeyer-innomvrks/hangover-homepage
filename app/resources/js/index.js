/* eslint-env browser */
import EventLoader from "./FirebaseDownloader/EventLoader.js";
import EventList from "./UI/EventList.js";
import LocationLoader from "./FirebaseDownloader/LocationLoader.js";
import EventFilterBtn from "./UI/EventFilterBtn.js";
import EventFilter from "./filter/EventFilter.js";
import FilterView from "./UI/FilterView.js";

let eventListView,
	eventFilter,
	events,
	locations;

function init() {
	getEvents();
	EventFilterBtn.setElement(document.querySelector(".filter-btn"));
	EventFilterBtn.addEventListener("displayFilters", onFilterRequested);
	EventFilterBtn.addEventListener("hideFilters", hideFilters);
	FilterView.setElement(document.querySelector(".col1"));
	FilterView.addEventListener("onFilterChanged", onFilterChanged);
}

async function getEvents() {
	events = await EventLoader.getEvents();
	locations = await LocationLoader.getLocations();
	events.sort(function (a, b) {
		return a.jsDate - b.jsDate;
	});
	eventListView = new EventList(events);
	eventListView.setElement(document.querySelector(".eventlist"));
	eventListView.appendEventsToDateCards(events, locations)
}

function onFilterRequested() {
	eventFilter = new EventFilter(events, locations);
	FilterView.setupFilterView(eventFilter.getListOfAvailableMusicGenres(), eventFilter.getListOfAvailableLocationsTypes(), eventFilter.getMaxPriceOfAllEvents());
}

function hideFilters() {
	FilterView.hideFilters();
}

function onFilterChanged(event) {
	let selectedTypes = event.data.selectedTypes,
		selectedGenres = event.data.selectedGenres,
		selectedPrice = event.data.selectedPrice,
		result = eventFilter.getFilteredEventsByArt(selectedTypes, events);
	console.log(result);
	result = eventFilter.getFilteredEventsByMusic(selectedGenres, result);
	console.log(result);
	result = eventFilter.getFilteredEventsByPrice(selectedPrice, result);
	console.log(result);
	eventListView.element.innerHTML = "";
	eventListView = new EventList(result);
	eventListView.setElement(document.querySelector(".eventlist"));
	eventListView.appendEventsToDateCards(result, locations)

}

init();

jQuery(document).ready(function ($) {
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MQL = 1170;

	//primary navigation slide-in effect
	if ($(window).width() > MQL) {
		var headerHeight = $('.cd-header').height();
		$(window).on('scroll',
			{
				previousTop: 0
			},
			function () {
				var currentTop = $(window).scrollTop();
				//check if user is scrolling up
				if (currentTop < this.previousTop) {
					//if scrolling up...
					if (currentTop > 0 && $('.cd-header').hasClass('is-fixed')) {
						$('.cd-header').addClass('is-visible');
					} else {
						$('.cd-header').removeClass('is-visible is-fixed');
					}
				} else {
					//if scrolling down...
					$('.cd-header').removeClass('is-visible');
					if (currentTop > headerHeight && !$('.cd-header').hasClass('is-fixed')) $('.cd-header').addClass('is-fixed');
				}
				this.previousTop = currentTop;
			});
	}

	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function () {
		$('.cd-menu-icon').toggleClass('is-clicked');
		$('.cd-header').toggleClass('menu-is-open');

		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if ($('.cd-primary-nav').hasClass('is-visible')) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$('body').addClass('overflow-hidden');
			});
		}
	});
});
// Create Variables
var today = new Date();
var cityFormEl = document.querySelector("#city-form");
var cityNameInputEl = document.querySelector("#cityname");
var currentWeatherEl = document.querySelector('#current-weather');
var currentWeatherBoxEl = document.querySelector("#current-weather-box")
var fiveDayBoxEl = document.querySelector("#five-day-box");
var fiveDayEl = document.querySelector("#five-day-body");
var weatherStatusEl = document.querySelector('#weather-status');
var searchEl = document.querySelector('#search');
var historyButtonsEl = document.querySelector("#history-buttons")
var historyBoxEl = document.querySelector("#history")
var trashEl = document.querySelector("#trash")
var searchHistoryArray = []

// Submit handler to get city + prevent default page reloading 
var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityname = cityNameInputEl.value.trim();
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

        // Put city name into local storage and show search history buttons
        if (cityname) {
            searchHistoryArray.push(cityname);
            localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
            var searchHistoryEl = document.createElement('button');
            searchHistoryEl.className = "btn";
            searchHistoryEl.setAttribute("data-city", cityname)
            searchHistoryEl.innerHTML = cityname;
            historyButtonsEl.appendChild(searchHistoryEl);
            historyBoxEl.removeAttribute("style")
            getWeatherInfo(cityname);
            cityNameInputEl.value = "";
        }
        else {
            alert("Please try again. Enter a city name.");
        }
    
    }
    
    // Pull in weather API 
    var getWeatherInfo = function (cityname) {
        var apiCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f97301447cbd41068af8623a398ba1fb";
        fetch(
            // Fetch request using city name to get latitude and longitude
            apiCityUrl
        )
            .then(function (cityResponse) {
                return cityResponse.json();
            })
            .then(function (cityResponse) {
                // Variables to hold the latitude and longitude of requested city
                console.log(cityResponse)
                var latitude = cityResponse.coord.lat;
                var longitude = cityResponse.coord.lon;
    
                // Variables for City name, current date and icon information (current weather)
                var city = cityResponse.name;
                var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                var weatherIcon = cityResponse.weather[0].icon;
                var weatherDescription = cityResponse.weather[0].description;
                var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />"
    
                // Empty Current Weather element for new data to populate
                currentWeatherEl.textContent = "";
                fiveDayEl.textContent = "";
    
                // Update weather status to show city, date and icon
                weatherStatusEl.innerHTML = city + " (" + date + ") " + weatherIconLink;
    
                // Remove class name 'hidden' to show current weather box
                currentWeatherBoxEl.classList.remove("hidden");
                fiveDayBoxEl.classList.remove("hidden");
    
                // Return a fetch request to the OpenWeather using longitude and latitude from pervious fetch
                return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=f97301447cbd41068af8623a398ba1fb');
            })
            .then(function (response) {
                // Return response in json format
                return response.json();
            })
            .then(function (response) {
                console.log(response);
                displayWeather(response);
    
            });
    };
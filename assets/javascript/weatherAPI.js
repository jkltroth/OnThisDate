var date = "history_" + "20171103";

var state = "NH";

var city = "Portsmouth";

var stateCity = state + "/" + city;

var queryURL = "http://api.wunderground.com/api/759fcbc4347d1d57/" + date + "/q/" + stateCity + ".json";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function (response) {

console.log(queryURL);

//Weather conditions
let weatherCondition = response.history.observations[11].conds;

// Weather icon indicator
let weatherIcon = response.history.observations[11].icon;

// Average Temp in Celcius
let averageTempCelcius = response.history.dailysummary[0].meantempm;

// Average Temp in Fahrneheit
let averageTempFahrenheit = response.history.dailysummary[0].meantempi;

// Max humidity (%)
let maxHumidity = response.history.dailysummary[0].maxhumidity;

// Average wind speed (mph)
let averageWindSpeed = response.history.dailysummary[0].meanwindspdi;

// Totaaal precipitation (inches)
let totalPrecipitation = response.history.dailysummary[0].precipi;

console.log(weatherCondition);
console.log(weatherIcon);
console.log(averageTempFahrenheit + "/" + averageTempCelcius);
console.log("Max Humidity: " + maxHumidity + "%");
console.log("Total Precipitation: " + totalPrecipitation);
console.log("Average Wind Speed: " + averageWindSpeed + " mph");

});
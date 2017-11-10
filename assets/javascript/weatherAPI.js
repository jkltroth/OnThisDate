// Function to query weather API and append data to html
function displayWeatherInfo() {

    // Emptying the weatherResults table row
    $("#weatherResults").empty();

    // Set date input to dateInput variable
    var dateInput = $("#date-input").val().trim();

    // Format dateInput as YYYYMMDD
    var dateFormatted = "history_" + moment(dateInput).format("YYYYMMDD");

    // Set state input to state variable
    var state = $("#state-input").val().trim();

    // Set city input to city variable
    var city = $("#city-input").val().trim();

    // Concatenate state and city variables
    var stateCity = state + "/" + city;

    // Query URL used for weather API
    var queryURL = "http://api.wunderground.com/api/759fcbc4347d1d57/" + dateFormatted + "/q/" + stateCity + ".json";

    //AJAX call to query the weather API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        console.log(queryURL);

        var results = response.history

        if (!(results.observations[0])) {

            var weatherCondition = "No Results";

        } else {

            //Weather conditions
            var weatherCondition = results.observations[11].conds;

        };

        if(results.dailysummary[0].maxhumidity === "") {

            var maxHumidity = "No Results";

        } else {

            // Max humidity (%)
            var maxHumidity = results.dailysummary[0].maxhumidity + "%";

        };
        
        
        if (results.dailysummary[0].meanwindspdi === "") {
            
            var averageWindSpeed = "No Results";
            
        } else {
            
            // Average wind speed (mph)
            var averageWindSpeed = results.dailysummary[0].meanwindspdi + " mph";
            
        };
        
        // Average Temp in Celcius
        var averageTempCelcius = results.dailysummary[0].meantempm;

        // Average Temp in Fahrneheit
        var averageTempFahrenheit = results.dailysummary[0].meantempi;

        // Concatenate F and C temp
        var averageTempCombined = averageTempFahrenheit + " / " + averageTempCelcius;
        
        // Total precipitation (inches)
        var totalPrecipitation = results.dailysummary[0].precipi;

        console.log(weatherCondition);
        console.log(averageTempCombined);
        console.log("Max Humidity: " + maxHumidity);
        console.log("Total Precipitation: " + totalPrecipitation);
        console.log("Average Wind Speed: " + averageWindSpeed);

        // Append items to html
        $("#weatherResults").append(
            "<tr><td id='date'> " + moment(dateInput).format("MM/DD/YYYY") +
            " </td><td id='avgTemp'> " + averageTempCombined +
            " </td><td id='avgWindSpeed'> " + averageWindSpeed + 
            " </td><td id='maxHumidity'> " + maxHumidity + 
            " </td><td id='totalPrecipitation'> " + totalPrecipitation + "&Prime;" +
            " </td><td id='weatherConditions'> " + weatherCondition + "</td></tr>");

    });

};

// Click event listener to call displayWeatherInfo function when the 'search-btn' is clicked
$(document).on("click", "#search-btn", displayWeatherInfo);
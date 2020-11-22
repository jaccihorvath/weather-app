//current date variable in moment
var currentDate = moment().format('MM/D/YYYY');


//event listener for search button
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#city-search").val().trim();

    getCurrentWeather(cityName);
    getFiveDayForecast(cityName);

    //filling in current forecast header
    $("#city-name").text(cityName + " " + currentDate);

});

//function to get current weather info
function getCurrentWeather(city) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=8b552cf5834fc92f10f511a83f0cf2d9"
    }).then(function(response) {
        console.log(response);
        showWeather(response);

        var weatherIcon = response.weather[0].icon

        //adding current weather icon
        var weatherIconSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        $("#weather-icon").removeClass("d-none");
        $("#weather-icon").attr("src", weatherIconSrc);


        //storing lat and lon values for uvi
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        //ajax call to get uvi
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=8b552cf5834fc92f10f511a83f0cf2d9"
        }).then(function (uvi) {
            currentUVI = uvi.value;
            $("#uv-index").text("UV Index: " + currentUVI);

            //setting class for uvi
            if (currentUVI < 4) {
                $("#uv-index").attr("class", "uvi-low")
            } else if (currentUVI < 8) {
                $("#uv-index").attr("class", "uvi-med")
            } else {
                $("#uv-index").attr("class", "uvi-high")
            }

        });
    });
    
}

//function for displaying current weather info
function showWeather(response) {
        $("#temperature").text("Temperature: " + response.main.temp + "ºF");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind speed: " + response.wind.speed + "mph");

}

//function for getting 5 day forecast
function getFiveDayForecast(city) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=8b552cf5834fc92f10f511a83f0cf2d9"
    }).then(function(response) {
        console.log(response);

        //setting info for 5 day forecast
        $("#day-1").text(moment(response.list[1].dt_txt).format('L'));
        $("#day-1-temp").text("Temp: " + response.list[1].main.temp.toFixed(2) + "ºF");
        $("#day-1-humidity").text("Humidity: " + response.list[1].main.humidity + "%");

        $("#day-2").text(moment(response.list[8].dt_txt).format('L'));
        $("#day-2-temp").text("Temp: " + response.list[8].main.temp.toFixed(2) + "ºF");
        $("#day-2-humidity").text("Humidity: " + response.list[8].main.humidity + "%");

        $("#day-3").text(moment(response.list[16].dt_txt).format('L'));
        $("#day-3-temp").text("Temp: " + response.list[16].main.temp.toFixed(2) + "ºF");
        $("#day-3-humidity").text("Humidity: " + response.list[16].main.humidity + "%");

        $("#day-4").text(moment(response.list[24].dt_txt).format('L'));
        $("#day-4-temp").text("Temp: " + response.list[24].main.temp.toFixed(2) + "ºF");
        $("#day-4-humidity").text("Humidity: " + response.list[24].main.humidity + "%");

        $("#day-5").text(moment(response.list[32].dt_txt).format('L'));
        $("#day-5-temp").text("Temp: " + response.list[32].main.temp.toFixed(2) + "ºF");
        $("#day-5-humidity").text("Humidity: " + response.list[32].main.humidity + "%");

        //setting weather icons for 5 day forecast
        var dayOneIcon = response.list[1].weather[0].icon
        var dayOneIconSrc = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
        $("#day-1-img").removeClass("d-none");
        $("#day-1-img").attr("src", dayOneIconSrc);

        var dayTwoIcon = response.list[8].weather[0].icon
        var dayTwoIconSrc = "https://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
        $("#day-2-img").removeClass("d-none");
        $("#day-2-img").attr("src", dayTwoIconSrc);

        var dayThreeIcon = response.list[16].weather[0].icon
        var dayThreeIconSrc = "https://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
        $("#day-3-img").removeClass("d-none");
        $("#day-3-img").attr("src", dayThreeIconSrc);

        var dayFourIcon = response.list[24].weather[0].icon
        var dayFourIconSrc = "https://openweathermap.org/img/wn/" + dayFourIcon + ".png";
        $("#day-4-img").removeClass("d-none");
        $("#day-4-img").attr("src", dayFourIconSrc);

        var dayFiveIcon = response.list[32].weather[0].icon
        var dayFiveIconSrc = "https://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
        $("#day-5-img").removeClass("d-none");
        $("#day-5-img").attr("src", dayFiveIconSrc);

    })
}

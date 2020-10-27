
$(document).ready(function(){
    $("#run-search").on("click", function(event) {
        event.preventDefault();
    
        let city = $("#search-input").val();
    
        getWeather(city);
    });
    
    $(".history").on("click", "li", function() {
        getWeather($(this).text());
      });
    
    function makeRow(text) {
       
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
         $(".history").append(li)
         }
         var history = JSON.parse(window.localStorage.getItem("history")) || [];
         if (history.length > 0) {
           getWeather(history[history.length-1]);
         }
         for (var i = 0; i < history.length; i++) {
           makeRow(history[i]);
         }
       
    
    function getWeather(city) {
    let APIKey = "63dbd153e65dc57a0e639b1071efe861";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    //make css class margin left
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (data) {
    console.log(data)
    if (history.indexOf(city)) {
        history.push(city)
        window.localStorage.setItem("history", JSON.stringify(history))
        makeRow(city)
    }
    
    $("#today").empty();
    var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            // merge and add to page
            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
            getFiveDayForecast(city);
    })
    
    }
    })
    
            function getFiveDayForecast(city) {
                let APIKey = "63dbd153e65dc57a0e639b1071efe861";
                let queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
                $.ajax({
    
                method: "GET",
                url: queryUrl
    
                }).then( function(data){
         // overwrite any existing content with title and empty row
                    $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                    // loop over all forecasts (by 3-hour increments)
                    //getting error here
                    for (var i = 0; i < data.list.length; i++) {
                      if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        // create html elements for a bootstrap card
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                        var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                        // merge together and put on page
                        col.append(card.append(body.append(title, img, p1, p2)));
                        $("#forecast .row").append(col);
                      }
                    }
                  }
            
    
                
                 
    
    
            // $.ajax({
            //     type: "GET",
            //     url: queryUrl,
            //     dataType: "json",
            //     success: function(data) {
            //       // overwrite any existing content with title and empty row
            //       $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
            //       // loop over all forecasts (by 3-hour increments)
            //      var array = data.list
            //       for (var i = 0; i < array.length; i++) {
            //         // only look at forecasts around 3:00pm
            //         if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            //           // create html elements for a bootstrap card
            //           var col = $("<div>").addClass("col-md-2");
            //           var card = $("<div>").addClass("card bg-primary text-white");
            //           var body = $("<div>").addClass("card-body p-2");
            //           var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            //           var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            //           var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
            //           var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            //           // merge together and put on page
            //           col.append(card.append(body.append(title, img, p1, p2)));
            //           $("#forecast .row").append(col);
            //         }
            //       }
            //     }
            //   });
    
        //     for (let i = 0; i != fiveDayReponse.list.length; i+=8 ) {
        //         let cityObj = {
        //             date: fiveDayReponse.list[i].dt_txt,
        //             icon: fiveDayReponse.list[i].weather[0].icon,
        //             temp: fiveDayReponse.list[i].main.temp,
        //             humidity: fiveDayReponse.list[i].main.humidity
        //         }
        //         let dateStr = cityObj.date;
        //         let trimmedDate = dateStr.substring(0, 10); 
        //         let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
        //         createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
        //     }
    
        // function createForecastCard (date, icon, temp, humidity) {
        // // HTML elements we will create to later
        // let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
        // let cardDate = $("<h3>").attr("class", "card-text");
        // let cardIcon = $("<img>").attr("class", "weatherIcon");
        // let cardTemp = $("<p>").attr("class", "card-text");
        // let cardHumidity = $("<p>").attr("class", "card-text");
    
        // cardRow.append(fiveDayCardEl);
        // cardDate.text(date);
        // cardIcon.attr("src", icon);
        // cardTemp.text(`Temp: ${temp} °F`);
        // cardHumidity.text(`Humidity: ${humidity}%`);
        // fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
        // $("#forecast").append(fiveDayCardEl)
    
    
    
    
        // for(let i=0; i< response.list.length; i++){
    
        // }
        // success: function(data) {
        //     console.log('Received data:', data) // For testing
        //     var wf = "";
        //     wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
        //     $.each(data.list, function(index, val) {
        //       wf += "<p>" // Opening paragraph tag
        //       wf += "<b>Day " + index + "</b>: " // Day
        //       wf += val.main.temp + "&degC" // Temperature
        //       wf += "<span> | " + val.weather[0].description + "</span>"; // Description
        //       wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
        //       wf += "</p>" // Closing paragraph tag
        //     });
        //     $("#showWeatherForcast").html(wf);
        //   }
    
    
    //api url error 
    /*function getForecast(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&APPID=7e4c7478cc7ee1e11440bf55a8358ec3&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var newrow = $("<div>").attr("class", "forecast");
            $("#earthforecast").append(newrow);
        }) */
    
    
        
        //iterate through the 40 weather data sets
    
    
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    // 
        // )
                )}
    
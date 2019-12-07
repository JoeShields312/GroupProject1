const APIKey = "AIzaSyAgbqBDkDy9k9S7IOG-sCvw21-NXUiTok0";
let userLocation = "";
let userLon = "60093";
let userLat = "60025";


    // URL to google maps directions api
    var queryURL = "maps.googleapis.com/maps/api/geocode/json?" +
        "address=" + userLocation + "&key=" + APIKey;

    // Here we run our AJAX call to the google maps direction API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "googleMaps"
      .then(function(googleMaps) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(googleMaps);


        // Transfer content to HTML

        // $(".city").html("<h1>" + googleMaps.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + googleMaps.wind.speed);
        // $(".humidity").text("Humidity: " + googleMaps.main.humidity);
        // $(".temp").text("Temperature (F) " + googleMaps.main.temp);


        // // Converts the temp to Kelvin with the below formula

        // var tempF = (googleMaps.main.temp - 273.15) * 1.80 + 32;
        // $(".tempF").text("Temperature (Kelvin) " + tempF);


        // // Log the data in the console as well

        // console.log("Wind Speed: " + googleMaps.wind.speed);
        // console.log("Humidity: " + googleMaps.main.humidity);
        // console.log("Temperature (F): " + googleMaps.main.temp);

      });
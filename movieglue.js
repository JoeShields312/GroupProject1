$("#startBtn").on("click", function() {


  getLocation()
  // Check if browser allows geolocation
function getLocation() {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
      alert("Use a different browser")
  }
}

// Get coords from geolocation
function showPosition(position) {

  // User Location
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  // Check console
  console.log("Device Location Latitude: " + lat + " Longitude: " + lon);
  console.log(`Devicer location latitude: ${lat} Longitude: ${lon}`);
}


$(document).ready(function() {

  var momentTodayDate = moment().format("YYYY-MM-DD")

  var deviceDateTime = new Date().toISOString()
  
  // string interpolation for the device date time 
  // ${deviceDateTime}
  
  
  // Films Now Showing API Settings
  var filmsNowShowingSetting = {
      "crossDomain": true,
      "url": "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
      "method": "GET",
      "headers": {
        "api-version": "v200",
        "Authorization": "Basic U01JVF8wOkF4emkwWEppMDFlcg==",
        "client": "SMIT_0",
        "x-api-key": "ZRUjCrZ5r18epZovOj1A3aesuvedkfbZ7Dy06U7U",
        // "device-datetime": `${deviceDateTime}`,
        "device-datetime": deviceDateTime,
        "territory": "US",
  
      }
    }
  
  var filmsBody = $("#ten-card-deck");  

    // Call filmsNowShowing Ajax
  $.ajax(filmsNowShowingSetting).done(function (response) {
    console.log("filmsNowShowing");
    console.log(response);
    filmsBody.empty();
    filmsNowShowing(response);
  });

  function filmsNowShowing(response) {

    for (let i = 0; i < 10; i++) {

    let filmId = response.films[i].film_id;
    let filmName = response.films[i].film_name;
    let filmImage = response.films[i].images.poster["1"].medium.film_image;

    // let cityDate = moment().format('l');
    // let cityIcon = response.weather[0].icon;
    // let cityTemp = Math.round(response.main.temp);
    // let cityHumid = response.main.humidity;
    // let cityWind = Math.round(response.wind.speed);
    // let cityIconEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)

    let cardEl = $("<div>").attr("class", "card");
    let cardBodyEl = $("<div>").attr("class", "card-body ten-card");
    let cardImageEl = $("<img>").attr("src", `${filmImage}`);
    cardImageEl.attr("data-film", filmId);
    let cardNameEl = $("<h6>").attr("class", "card-title").text(filmName);

    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardImageEl).append(cardNameEl);
    $("#ten-card-deck").append(cardEl);
  };

//Put the filmshowtimes ajax call function within the image onclick event. This way it only runs after clicking specific image, grabbing that film id data attribute as part of the call. 
$("img").on("click", function() {
  
  // film Id info is pulled from the data attribute set above on cardImageEl
  var filmIdData = $(this).data("film");
  var cinemaBody = $("#cinemaOutput");

  console.log(filmIdData);

 // Cinema Show Times API Settings 
  var closestShowingSetting = {
  "crossDomain": true,
  "url": "https://api-gate2.movieglu.com/closestShowing/?film_id=" + filmIdData,
  "method": "GET",
  "headers": {
    "api-version": "v200",
    "Authorization": "Basic Qk9PVF8yOmdBSkVFWFhuTFlHVw===",
    "client": "BOOT_2",
    "x-api-key": "ZgTYUEfaLc3nwZHwGLzaD5kwBH0fGAgZ7eHIL724",
    "device-datetime": `${deviceDateTime}`,
    "territory": "US",
    "Geolocation": "42.0446208;-87.6675072",
    }
  }

// ajax call/function runs
  $.ajax(closestShowingSetting).done(function (response) {

    console.log("closestShowing");
    console.log(response);
    cinemaBody.empty();
    closestShowing(response);

  });

  function closestShowing(response) {

    for (let i = 0; i < 5; i ++) {

    let filmId = response.film_id;
    let cinemaId = response.cinemas[i].cinema_id;
    let cinemaName = response.cinemas[i].cinema_name;
    let cinemaAddress = response.cinemas[i].address;
    let cinemaCity = response.cinemas[i].city;
    let cinemaPostcode = response.cinemas[i].postcode;
    let cinemaDistance = response.cinemas[i].distance;
    let cinemaNextShow = response.cinemas[i].time;
    let cinemaLat = response.cinemas[i].lat;
    let cinemaLng = response.cinemas[i].lng;

    let cinemaCardEl = $("<div>").attr("class", "card cinemaCard");
    let cinemaCardBodyEl = $("<div>").attr("class", "card-body five-card");
    let cinemaNameEl = $("<h6>").attr("class", "card-title").text(cinemaName);
    cinemaCardEl.attr("data-cinema", cinemaId);
    cinemaCardEl.attr("data-film", filmId);
    let cinemaAddressEl = $("<p>").attr("class", "address").text(cinemaAddress);
    let cinemaCityEl = $("<p>").attr("class", "city").text(cinemaCity);
    let cinemaPostcodeEl = $("<p>").attr("class", "postcode").text(cinemaPostcode);
    let cinemaDistanceEl = $("<p>").attr("class", "distance").text(cinemaDistance);
    let cinemaNextShowEl = $("<p>").attr("class", "nextShow").text(cinemaNextShow);



    cinemaCardEl.append(cinemaCardBodyEl);
    cinemaCardBodyEl.append(cinemaNameEl, cinemaAddressEl, cinemaCityEl, cinemaPostcodeEl, cinemaDistanceEl, cinemaNextShowEl)
    $("#cinemaOutput").append(cinemaCardEl);
  };
  };


});

};

  // var cinemaDetailsSetting;
  // Cinema Details API Settings
  var cinemaDetailsSetting = {
    "crossDomain": true,
    "url": "https://api-gate2.movieglu.com/cinemaDetails/?cinema_id=7607",
    "method": "GET",
    "headers": {
      "api-version": "v200",
      "Authorization": "Basic U01JVF8wOkF4emkwWEppMDFlcg==",
      "client": "SMIT_0",
      "x-api-key": "ZRUjCrZ5r18epZovOj1A3aesuvedkfbZ7Dy06U7U",
      "device-datetime": `${deviceDateTime}`,
      "territory": "US",
  
    }
  }

$.ajax(cinemaDetailsSetting).done(function (response) {
  // cinemaDetails(response);
  console.log("cinemaDetails");
  console.log(response);

  });
  


});

});

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
  
  
  // Cinema Show Times API Settings
  var filmShowTimesSetting = {
      "crossDomain": true,
      "url": "https://api-gate2.movieglu.com/filmShowTimes/?film_id=240948&date=" + momentTodayDate,
      "method": "GET",
      "headers": {
        "api-version": "v200",
        "Authorization": "Basic Qk9PVF8yOmdBSkVFWFhuTFlHVw===",
        "client": "BOOT_2",
        "x-api-key": "	ZgTYUEfaLc3nwZHwGLzaD5kwBH0fGAgZ7eHIL724",
        "device-datetime": `${deviceDateTime}`,
        "territory": "US",
        "Geolocation": "42.0446208;-87.6675072",
  
      }
    }
  
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
  
  
    // Call filmsNowShowing Ajax
  $.ajax(filmsNowShowingSetting).done(function (response) {
    console.log("filmsNowShowing");
    console.log(response);
    filmsNowShowing(response);
  });
  
  $.ajax(filmShowTimesSetting).done(function (response) {
    // filmShowTimes(response);

    console.log("filmShowTimes");
    console.log(response);

  });

  $.ajax(cinemaDetailsSetting).done(function (response) {
    // cinemaDetails(response);
    console.log("cinemaDetails");
    console.log(response);

  });




  function filmsNowShowing(response) {


    for (let i = 0; i < 10; i ++) {

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
  }




    // let cardTitleEl = $("<h6>").attr("class", "card-title").text(date);
    
    // let cardTempEl = $("<p>").attr("class", "card-text").text(`Temp: ${cardTemp} °F`);
    // let cardHumidEl = $("<p>").attr("class", "card-text").text(`Humidity: ${cardHumid}%`);



  }
  
  // function filmShowTimes(response) {

  // }
  
  // function cinemaDetails(response) {

  // }
  
      // let cardEl = $("<button>").attr("class", "card");
      // let cardBodyEl = $("<div>").attr("class", "card-body five-card");
      // let cardTitleEl = $("<h6>").attr("class", "card-title").text(date);
      // let cardIcon = $("<img>").attr("src", ``);
      // let cardTempEl = $("<p>").attr("class", "card-text").text(`Temp: ${cardTemp} °F`);
      // let cardHumidEl = $("<p>").attr("class", "card-text").text(`Humidity: ${cardHumid}%`);
  
  
      // // Update Variables with value from API
      // $()
      // let userFilmId = response.film_id;
      // let userFilmName = response.film_name;
  
    }
  

  
  );
  
});

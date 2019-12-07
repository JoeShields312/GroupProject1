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
      "device-datetime": `${deviceDateTime}`,
      "territory": "US",

    }
  }


// Cinema Show Times API Settings
var filmShowTimesSetting = {
    "crossDomain": true,
    "url": "https://api-gate2.movieglu.com/filmShowTimes/?film_id=240948&date=2019-12-07",
    "method": "GET",
    "headers": {
      "api-version": "v200",
      "Authorization": "Basic U01JVF8wOkF4emkwWEppMDFlcg==",
      "client": "SMIT_0",
      "x-api-key": "ZRUjCrZ5r18epZovOj1A3aesuvedkfbZ7Dy06U7U",
      "device-datetime": `${deviceDateTime}`,
      "territory": "US",
      "Geolocation": "45;44",

    }
  }


// Cinema Details API Settings
var cinemaDetailsSetting = {
  "crossDomain": true,
  "url": "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
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
  // movieGlu Initiate
  movieGlu(response);
});


function movieGlu (response) {

  // Initiate filmsNowShowing
  filmsNowShowing(response);

  // Cinema Show Times
  $.ajax(filmShowTimesSetting).done(function (response) {
    filmShowTimes(response);
    // Cinema Details
    $.ajax(cinemaDetailsSetting).done(function (response) {
      cinemaDetails(response);

    });  
  });

function filmsNowShowing(response) {
  console.log("filmsNowShowing");
  console.log(response);
}

function filmShowTimes(response) {
  console.log("filmShowTimes");
  console.log(response);
}

function cinemaDetails(response) {
  console.log("conemaDetails");
  console.log(response);
}

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

// Cinema Show Times API

// var APIKey = "&appid=ZRUjCrZ5r18epZovOj1A3aesuvedkfbZ7Dy06U7U";

// // placeholder cinemaId and filmId for now until reponse show from sequential calls

// var queryMovieURL = "https://api-gate2.movieglu.com/filmsNowShowing/?n=10" + APIKey;

// "https://api-gate2.movieglu.com/filmsComingSoon/?n=1" -H "api-version: v200" -H "Authorization: Basic A1B2c3D4E5f6H7I8j911M12=" -H "x-api-key: IyrBUDT7CuTTc6LH85mI5aAoG8" -H "device-datetime: " + deviceDateTime -H "territory: [TERRITORY]" -H "client: [USERNAME]"


// "https://api-gate2.movieglu.com/filmsNowShowing/?n=1" -H "api-version: v200" -H "Authorization: Basic A1B2c3D4E5f6H7I8j911M12=" -H "x-api-key: IyrBUDT7CuTTc6LH85mI5aAoG8" -H "device-datetime: 2018-09-26T10:45:30.147Z" -H "territory: UK" -H "client: NGIS_UK"
// function filmsNowShowing() {

// $.ajax({
//     url: queryMovieURL,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {
//     console.log (queryMovieURL);
//     console.log (response);

//     });
// };
// filmsNowShowing();

// var queryShowtimesURL = "https://api-gate2.movieglu.com/filmShowTimes/?film_id=" + filmId + "&date=" + momentTodayDate + APIKey

// $.ajax({
//     url: queryShowtimesURL,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {


//     });

// var queryCinemaURL = "https://api-gate2.movieglu.com/cinemaDetails/?cinema_id=" + cinemaId + APIKey

// $.ajax({
//     url: queryCinemaURL,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {


//     });


});

// Click to Display button triggers the showing of coordinates and all the cascading API calls (also controlled by click events) below

// Set Default location and as global variables to be updated
let lat = 42.0446208;
let lon = -87.6675072;
let closetShowingCoords;

// `${closetShowingCoords}`

$("#startBtn").on("click", function() {


  getLocation();
  // Check if browser allows geolocation
function getLocation() {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
      alert("Use a different browser");
  }
}

// Get coords from geolocation
function showPosition(position) {

  // User Location
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  // Check console
  console.log("Device Location Latitude: " + lat + " Longitude: " + lon);
}

$(document).ready(function() {

  var deviceDateTime = new Date().toLocaleString();
  var convertedDeviceDateTime = moment(deviceDateTime).format("YYYY-MM-DD HH:mm:ss");
  console.log(deviceDateTime);
  console.log(convertedDeviceDateTime);
  
  // string interpolation for the device date time 
  // ${deviceDateTime}
  
  // filmsNowShowing API Settings
  var filmsNowShowingSetting = {
      "crossDomain": true,
      "url": "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
      "method": "GET",
      "headers": {
        "api-version": "v200",
        "Authorization": "Basic Q09ESV82OnUzZHgyUm1saUhNdQ==",
        "client": "CODI_6",
        "x-api-key": "SYZshJsNPj6rLlnHEhQ1t5EdD9azrTRT3567kq06",
        // "device-datetime": `${deviceDateTime}`,
        "device-datetime": `${convertedDeviceDateTime}`,
        "territory": "US",
  
      }
    }
  
  var filmsBody = $("#ten-card-deck");  

    // Call filmsNowShowing Ajax
  $.ajax(filmsNowShowingSetting).done(function (response) {
    console.log("filmsNowShowing");
    console.log(response);
    filmsBody.empty();
    // runs the for loop function immediately below (which will output top 10 films with showings)
    filmsNowShowing(response);
  });

  function filmsNowShowing(response) {

    for (let i = 0; i < 10; i++) {
    
    // defining the object data for display and use in next API calls
    let filmId = response.films[i].film_id;
    let filmName = response.films[i].film_name;
    let filmImage = response.films[i].images.poster["1"].medium.film_image;
    
    // create divs, header, and p tags for each object data
    let cardEl = $("<div>").attr("class", "card movieCard");
    let cardBodyEl = $("<div>").attr("class", "card-body ten-card");
    let cardImageEl = $("<img>").attr("src", `${filmImage}`);
    cardImageEl.attr("data-film", filmId);
    cardImageEl.attr("data-name", filmName);
    let cardNameEl = $("<h6>").attr("class", "card-title").text(filmName);

    // appended all the elements created
    cardEl.append(cardBodyEl);
    cardBodyEl.append(cardImageEl).append(cardNameEl);
    $("#ten-card-deck").append(cardEl);
  };

//Put the closestShowings ajax call function within function "filmsNowsShowing" and image onclick event. This way it only runs after clicking specific image, grabbing that film id data attribute as part of the call. 
$("img").on("click", function() {
  
  // film Id info is pulled from the data attribute set above on cardImageEl
  var filmIdData = $(this).data("film");
  var filmNameData = $(this).data("name");
  var cinemaBody = $("#cinemaOutput");
  var omdbBody = $("#movieInfo")

  console.log(filmIdData);
  console.log(filmNameData);

  // Movie info URL call
  var omdbQueryURL = "https://www.omdbapi.com/?t=" + filmNameData + "&apikey=trilogy";
  
  $.ajax({
    url: omdbQueryURL,
    method: "GET"
  }).then(function(response) {

    console.log ("movieDetails");
    console.log (response);
    // Empty container before populating new movie details when clicking a different film image
    omdbBody.empty();
    movieDetails(response);
  });
  
  function movieDetails(response) {

    // defining the object data for title, release date, rated, runtime, genre, cast, Director, Synopsis, ratings
    let title = response.Title;
    // format is 22 Nov 2019 (should convert to November 22, 2019)
    let released = moment(response.Released, "DD MMM YYYY").format("MMMM DD, YYYY");
    let rated = response.Rated;
    let runtime = response.Runtime;
    let genre = response.Genre;
    let cast = response.Actors;
    let director = response.Director;
    let plot = response.Plot
    let imdb = response.imdbRating;
    let metascore = response.Metascore;

    // create divs, header, and p tags for each object data
    let detailsCardEl = $("<div>").attr("class", "card detailsCard");
    let detailsCardBodyEl = $("<div>").attr("class", "card-body");
    let titleEl = $("<h6>").attr("class", "card-title").text(title);
    let releasedEl = $("<p>").attr("class", "released").text("Released: " + released);
    let ratedEl = $("<p>").attr("class", "rated").text("Rated: " + rated);
    let runtimeEl = $("<p>").attr("class", "runtime").text("Runtime: " + runtime);
    let genreEl = $("<p>").attr("class", "genre").text("Genre: " + genre);
    let castEl = $("<p>").attr("class", "cast").text("Cast: " + cast);
    let directorEl = $("<p>").attr("class", "director").text("Director: " + director) 
    let plotEl = $("<p>").attr("class", "plot").text("Plot: " + plot) 
    let ratingsEl = $("<p>").attr("class", "ratings").text("IMDB: " + imdb + "  " + "Metascore: " + metascore);

    // appended all the elements created
    detailsCardEl.append(detailsCardBodyEl);
    detailsCardBodyEl.append(titleEl, releasedEl, ratedEl, runtimeEl, genreEl, castEl, directorEl, plotEl, ratingsEl)
    $("#movieInfo").append(detailsCardEl);
  };

  // redefined value to input into geolocation header
  closetShowingCoords = lat + ";" + lon;
 // Cinema Show Times API Settings 
  var closestShowingSetting = {
  "crossDomain": true,
  "url": "https://api-gate2.movieglu.com/closestShowing/?film_id=" + filmIdData,
  "method": "GET",
  "headers": {
    "api-version": "v200",
    "Authorization": "Basic Q09ESV82OnUzZHgyUm1saUhNdQ==",
    "client": "CODI_6",
    "x-api-key": "SYZshJsNPj6rLlnHEhQ1t5EdD9azrTRT3567kq06",
    "device-datetime": `${convertedDeviceDateTime}`,
    "territory": "US",
    "Geolocation": `${closetShowingCoords}`,
    }
  }

// ajax call/function runs
  $.ajax(closestShowingSetting).done(function (response) {

    console.log("closestShowing");
    console.log(response);
    // Empty container before populating new cinema details when clicking a different film image
    cinemaBody.empty();
    // runs the for loop function immediately below (which will output nearest 5 cinema details)
    closestShowing(response);

  });

  function closestShowing(response) {

    for (let i = 0; i < 5; i ++) {

    // Use for loop to generate all (5) cinema information with the next available showing data. 
    let filmName = response.film_name;
    let cinemaName = response.cinemas[i].cinema_name;
    let cinemaAddress = response.cinemas[i].address;
    let cinemaCity = response.cinemas[i].city;
    let cinemaPostcode = response.cinemas[i].postcode;
    let cinemaDistance = parseFloat(response.cinemas[i].distance).toFixed(2);
    let showingDate = moment(response.cinemas[i].date, "YYYY-MM-DD").format("MMM D")
    let cinemaNextShow = moment(response.cinemas[i].time, "HH:mm").format("h:mm A");
    let cinemaLat = response.cinemas[i].lat;
    let cinemaLng = response.cinemas[i].lng;

    // create divs, header, and p tags for each object data
    let cinemaCardEl = $("<div>").attr("class", "card cinemaCard col-mt-3");
    let cinemaCardBodyEl = $("<div>").attr("class", "card-body five-card mb-3");
    let cinemaNameEl = $("<h6>").attr("class", "cinema-title").text(cinemaName);
    // created data attributes for cinemaLat and cinemaLng lets in order to pull the data with an onclick event to redener google map directions
    cinemaCardEl.attr("data-lat", cinemaLat);
    cinemaCardEl.attr("data-lng", cinemaLng);
    let cinemaAddressEl = $("<p>").attr("class", "address cinemaInfo").text(cinemaAddress);
    let cinemaCityEl = $("<p>").attr("class", "city cinemaInfo").text(cinemaCity);
    let cinemaPostcodeEl = $("<p>").attr("class", "postcode cinemaInfo").text(cinemaPostcode);
    let cinemaDistanceEl = $("<p>").attr("class", "distance cinemaInfo").text(cinemaDistance + " miles away");
    let filmNameEl = $("<p>").attr("class", "filmName cinemaInfo").text(filmName);
    // need to fix materialize badges defaulting to align right!
    let cinemaNextShowEl = $("<span>").attr("class", "new badge nextShow cinemaInfo").text(showingDate + " " + cinemaNextShow);
    cinemaNextShowEl.attr("data-badge-caption", "Showing")


    // append all the elements created 
    cinemaCardEl.append(cinemaCardBodyEl);
    cinemaCardBodyEl.append(cinemaNameEl, cinemaAddressEl, cinemaCityEl, cinemaPostcodeEl, cinemaDistanceEl, filmNameEl, cinemaNextShowEl)
    $("#cinemaOutput").append(cinemaCardEl);
  };

 //Put the Google Maps API function within function "closestShowing" and onclick event. This way it only runs after clicking specific cinema card body, grabbing that cinemaLat/cinemaLng data attribute as part of the call.
  $(".cinemaCard").on("click", function() {
    var cinemaLatData = $(this).data("lat");
    var cinemaLngData = $(this).data("lng");
    var mapBody = $("#map");
    
    // Empty container before populating new map on click of a different cinema
    mapBody.empty();
    initMap();

  // runs function and calls to render the map and route
  function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat:lat,lng:lon}
    });
    directionsRenderer.setMap(map);
  
    // var getCoords = function() {
    //   displayRoute(directionsService, directionsRenderer);
    // };
    displayRoute(directionsService, directionsRenderer);
    // document.getElementById('deviceLocation').addEventListener('change', getCoords);
    // document.getElementById('cinemaLocation').addEventListener('change', getCoords);
  };
  
  function displayRoute(directionsService, directionsRenderer) {
    directionsService.route({
      // origin: document.getElementById('deviceLocation').value,
      // destination: document.getElementById('cinemaLocation').value,
      origin:{lat:lat,lng:lon},
      // origin:chicago, destination:boston,
      // destination:{lat:42.1257216,lng:-87.7658112},
      // insert the cinema lat/long data attributes for destination:
      destination:{lat:cinemaLatData,lng:cinemaLngData},
      travelMode: 'DRIVING'
    },function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.log('directionsRenderer request failed: ' + status);
      }
    });
  };

  });

  
  };


});

};
  


});

});

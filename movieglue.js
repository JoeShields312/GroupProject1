// Click to Display button triggers the showing of coordinates and all the cascading API calls (also controlled by click events) below
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
  console.log(`Device location latitude: ${lat} Longitude: ${lon}`);
}


$(document).ready(function() {

  // may not need this current date var anymore, since we changed the API calls we're using
  var momentTodayDate = moment().format("YYYY-MM-DD")

  // still need to convert this ISO date to local deviceDateTime
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
        "Authorization": "Basic Q09ESV82OnUzZHgyUm1saUhNdQ==",
        "client": "CODI_6",
        "x-api-key": "SYZshJsNPj6rLlnHEhQ1t5EdD9azrTRT3567kq06",
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
    // runs the for loop function immediately below (which will output top 10 films with showings)
    filmsNowShowing(response);
  });

  function filmsNowShowing(response) {

    for (let i = 0; i < 10; i++) {

    let filmId = response.films[i].film_id;
    let filmName = response.films[i].film_name;
    let filmImage = response.films[i].images.poster["1"].medium.film_image;

    let cardEl = $("<div>").attr("class", "card movieCard");
    let cardBodyEl = $("<div>").attr("class", "card-body ten-card");
    let cardImageEl = $("<img>").attr("src", `${filmImage}`);
    cardImageEl.attr("data-film", filmId);
    cardImageEl.attr("data-name", filmName);
    let cardNameEl = $("<h6>").attr("class", "card-title").text(filmName);

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

    // Create divs, header, and p tags for each object data
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
    "device-datetime": `${deviceDateTime}`,
    "territory": "US",
    // We still need to replace this geolocation with a var from geolocation function at the top (Yong?)
    "Geolocation": "42.0446208;-87.6675072",
    }
  }

// ajax call/function runs
  $.ajax(closestShowingSetting).done(function (response) {

    console.log("closestShowing");
    console.log(response);
    cinemaBody.empty();
    // runs the for loop function immediately below (which will output nearest 5 cinema details)
    closestShowing(response);

  });

  function closestShowing(response) {

    for (let i = 0; i < 5; i ++) {

    // Use for loop to generate all (5) cinema information with the next available showing data. 
    let filmId = response.film_id;
    let filmName = response.film_name;
    let cinemaId = response.cinemas[i].cinema_id;
    let cinemaName = response.cinemas[i].cinema_name;
    let cinemaAddress = response.cinemas[i].address;
    let cinemaCity = response.cinemas[i].city;
    let cinemaPostcode = response.cinemas[i].postcode;
    let cinemaDistance = parseFloat(response.cinemas[i].distance).toFixed(2);
    let showingDate = moment(response.cinemas[i].date, "YYYY-MM-DD").format("MMM D")
    let cinemaNextShow = moment(response.cinemas[i].time, "HH:mm").format("h:mm A");
    let cinemaLat = response.cinemas[i].lat;
    let cinemaLng = response.cinemas[i].lng;

    // Create divs, header, and p tags for each object data
    let cinemaCardEl = $("<div>").attr("class", "card cinemaCard col-mt-3");
    let cinemaCardBodyEl = $("<div>").attr("class", "card-body five-card mb-3");
    let cinemaNameEl = $("<h6>").attr("class", "cinema-title").text(cinemaName);
    cinemaCardEl.attr("data-cinema", cinemaId);
    cinemaCardEl.attr("data-film", filmId);
    // Yong, you would need to create data attributes for your cinemaLat and cinemaLng lets like the lines immediately above, in order to pull that data with an onclick event
    // cinemaCardEl.attr("data-lat", cinemaLat);
    // cinemaCardEl.attr("data-lng", cinemaLng);
    let cinemaAddressEl = $("<p id=cinemaInfo>").attr("class", "address").text(cinemaAddress);
    let cinemaCityEl = $("<p id=cinemaInfo>").attr("class", "city").text(cinemaCity);
    let cinemaPostcodeEl = $("<p id=cinemaInfo>").attr("class", "postcode").text(cinemaPostcode);
    let cinemaDistanceEl = $("<p id=cinemaInfo>").attr("class", "distance").text(cinemaDistance + " miles away");
    let filmNameEl = $("<p id=cinemaInfo>").attr("class", "filmName").text(filmName);
    // materialize badges didn't work as is, even though correct format and classes added. Will look into or eventually remove
    let cinemaNextShowEl = $("<p id=cinemaInfo>").attr("class", "nextShow new badge").text(showingDate + " " + cinemaNextShow);
    cinemaNextShowEl.attr("data-badge-caption", "Showing")


    // append all the elements created 
    cinemaCardEl.append(cinemaCardBodyEl);
    cinemaCardBodyEl.append(cinemaNameEl, cinemaAddressEl, cinemaCityEl, cinemaPostcodeEl, cinemaDistanceEl, filmNameEl, cinemaNextShowEl)
    $("#cinemaOutput").append(cinemaCardEl);
  };

 // Yong, here's where I believe you would put the .cinemaCard onclick event function like I have above for the img tag function. Define the data attributes you'll be using/pulling from the data attributes you created above for cinemaLat and cinemaLng, like below
  //  var latData = $(this).data("lat");
  //  var lngData = $(this).data("lng");
  $(".cinemaCard").on("click", function() {
    initMap();
  });

  function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat:42.0446208,lng:-87.7658112}
    });
    directionsRenderer.setMap(map);
  
    // var getCoords = function() {
    //   displayRoute(directionsService, directionsRenderer);
    // };
    displayRoute(directionsService, directionsRenderer);
    // document.getElementById('deviceLocation').addEventListener('change', getCoords);
    // document.getElementById('cinemaLocation').addEventListener('change', getCoords);
  }
  
  function displayRoute(directionsService, directionsRenderer) {
    directionsService.route({
      // origin: document.getElementById('deviceLocation').value,
      // destination: document.getElementById('cinemaLocation').value,
      origin:{lat:42.0446208,lng:-87.7658112},
      destination:{lat:42.1257216,lng:-87.7658112},
      // origin:chicago,
      // destination:boston,
      travelMode: 'DRIVING'
    },function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.log('directionsRenderer request failed: ' + status);
      }
    }
    );
  }

  
  };


});

};
  


});

});

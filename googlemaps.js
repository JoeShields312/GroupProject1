

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
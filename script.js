// Get User device location on click of startBtn
$("#startBtn").on("click", function(start) {
    getLocation()
})

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
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log("Device Location Latitude: " + lat + " Longitude: " + lon);
    redirect(lat, lon);
}
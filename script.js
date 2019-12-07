// Get User device location on click of startBtn
$("#startBtn").on("click", function(start) {

    // Get Device Location
    getLocation()

    //Display Movie Images
    filmsNowShowing()
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

    // User Location
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    
    // Check console
    console.log("Device Location Latitude: " + lat + " Longitude: " + lon);
    console.log(`Devicer location latitude: ${lat} Longitude: ${lon}`);
}



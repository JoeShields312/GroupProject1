let filmName = "dark+knight";
let filmYear = "2008";

// OMDB Request URL
var omdbQueryURL = "https://www.omdbapi.com/?t=" + filmName + 
               "&y=" + filmYear +
               "&plot=short&apikey=trilogy";

// AJAX call OMDB API
$.ajax({
    url: omdbQueryURL,
    method: "GET"
}).then(function(omdbResponse) {
    console.log("OMDB RESPONSE: " + omdbResponse);

    omdbRatings();
});

// Get ratings from omdb
function omdbRatings() {
    
    // Scores from different sources
    let omdbImdSource = omdbResponse.Ratings[0].Source;
    let omdbImdScore = omdbResponse.Ratings[0].Value;

    let omdbRottenSource = omdbResponse.Ratings[1].Source;
    let omdbRottenScore = omdbResponse.Ratings[1].Value;

    let omdbMetaSource = omdbResponse.Ratings[2].Source;
    let omdbMetaScore = omdbResponse.Ratings[2].Value;

    // Update Sources and Scores
    $("#Imd-rating").text('Source: ' + omdbImbSource + ' Score: ' + omdbImdScore + '/10');
    $("#Rotten-rating").text('Source: ' + omdbRottenSource + ' Score: ' + omdbRottenScore + '%');
    $("#Meta-rating").text('Source: ' + omdbMetaSource + ' Score: ' + omdbMetaScore + '/100');

}
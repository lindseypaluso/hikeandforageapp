$(document).ready(function() {

// Map
mapboxgl.accessToken = 'pk.eyJ1IjoibGlzYW1jYW1wIiwiYSI6ImNrOHpleHlzYTAxcWkzZnBlcjdxM3BoZnIifQ.bNRIw_e-uCQLRGfy9-bHlQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lisamcamp/ck8zfacri00a81iqshqireqqe'
    });
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());




//Create global zipcode variable
var zipcode;
//validate user input and run a search for closest hikes
$("#run-search").on("click", function (event) {
  event.preventDefault();
  $("#results-display").empty();
  //store the user input from the form into variables
  zipcode = $("#zip").val().trim();
  console.log(zipcode);
  //run the search and print results to the screen
  runSearch();
})


//when a plant icon is clicked
$(".plant-selector").on("click", function (event) {
  
  //take the zipcode value of that plant
  zipcode = $(this).val();
  console.log(zipcode);
  //empty the results-display
  $("#results-display").empty();
  //prepend the results display with "Places to find" + thisPlant
  var resultsHeading = $("<h2>");
  $(resultsHeading).text("Places to find " + $(this).attr('name'));
  $("#results-display").prepend(resultsHeading);
  //run the search based off of the zipcode value of that plant and print the hikes to the screen
  runSearch();
})


function runSearch() {
  //zip code API
  var zipKey = "inzJjQSoSQjnLa5nUnlvSOlJkFxZvBO0dQl5FxIhunpvOeBPSEhkR5CXBM4n8rSG"
  //example query address Request URL https://www.zipcodeapi.com/rest/eiMJSnusnRhK27BSYzaXpC1mEKx9GNMXWrek6eg5APEehdlD7mf5CJNoOut5Kosc/info.json/84097/degrees
  //parse together the required arguments for the zipcode api
  var zipQueryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + zipKey + "/info.json/" + zipcode + "/degrees";
  //create ajax call
  console.log(zipQueryURL);
  $.ajax({
    url: zipQueryURL,
    method: "GET",
    crossDomain: true,
  }).then(function (zipResponse) {
    console.log(zipResponse);
    //make variable to store the query data
    result = zipResponse;
    console.log(zipResponse.lat);
    var lat = result.lat;
    console.log(lat);  
    var long = result.lng;
    console.log(long);
    
    //Use the latitude and longitude data for the allTrails API
    //Hiking Project Data API
    var trailsKey = "200727629-d773c339e8dcd5aa90cb10c2a18cde1f";
    var trailsQueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=20&maxResults=6&key=" + trailsKey;
    
    //create ajax call
    $.ajax({
      url: trailsQueryURL,
      method: "GET"
    }).then(function (trailsResponse) {
      console.log(trailsResponse);
      //make variable to store the query data
      //what is "result"? Can I use it twice in the same function since it's separated by an ajax call?
      result = trailsResponse.trails;
      //create a for loop that displays the hike name, difficulty, length, and plant
      for (var i = 0; i < result.length; i++) {
        var hikeDiv = $("<div>");
        $(hikeDiv).attr("class", "hikeDiv w-50 float-left");

        var hikeName = $("<h4>");
        $(hikeName).text(result[i].name);
        var hikeImg = $("<img>");
        $(hikeImg).attr("src", result[i].imgSqSmall);
        $(hikeImg).attr("class", "hike-image")

        var hikeDiff = $("<p>");
        $(hikeDiff).text("Difficulty: " + result[i].difficulty);
        var hikeLength = $("<p>");
        $(hikeLength).text(result[i].length + "miles");

        $(hikeDiv).append(hikeName, hikeImg, hikeDiff, hikeLength);
        $("#results-display").append(hikeDiv);
      }
      $("#results-display").attr("class", "pt-5 pb-5")
      $("#results-display").append("<div class='clearfix'></div>");
    })
  })
}

//API key: 200727629-d773c339e8dcd5aa90cb10c2a18cde1f
//Hiking Project Data API
//Different methods available
  // getTrails - returns trails for given query
    //required arguments: key - Your private key, lat - Latitude for a given area, lon - Longitude for a given area
    //optional arguments: maxDistance, maxResults, sort, minLength, minStars
    //example syntax: https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200727629-d773c339e8dcd5aa90cb10c2a18cde1f
  //getTrailsById
    //required arguments: key & ids
    //maybe we would want to use this if we're focusing on 10 specific hikes?
    //example: https://www.hikingproject.com/data/get-trails-by-id?ids=7001635,7002742,7006663,7000108,7002175&key=200727629-d773c339e8dcd5aa90cb10c2a18cde1f
  //getConditions
    //we could maybe use this for crowdedness or prettiness or dificulty? not sure what available conditions there are
    //required: ids
    //example: https://www.hikingproject.com/data/get-conditions?ids=7001635,7002742,7006663,7000108,7002175&key=200727629-d773c339e8dcd5aa90cb10c2a18cde1f

  


});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrolltop > 690 || document.documentElement.scrollTop > 690) {
    document.getElementById("navlinks").style.height = "50px";
    document.getElementById("logo").style.display = "none";
    document.getElementById("logo2").style.display = "block";
    document.getElementById("navlinks").style.backgroundColor = "gray";
  
  } else {
    document.getElementById("navlinks").style.backgroundColor = "transparent";
    document.getElementById("logo").style.display = "block";
    document.getElementById("logo2").style.display = "none";
  }
}

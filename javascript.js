$(document).ready(function() {
  $('#logo2').hide();


// Map
mapboxgl.accessToken = 'pk.eyJ1IjoibGlzYW1jYW1wIiwiYSI6ImNrOHpleHlzYTAxcWkzZnBlcjdxM3BoZnIifQ.bNRIw_e-uCQLRGfy9-bHlQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lisamcamp/ck8zfacri00a81iqshqireqqe',
        center: [-111.764113, 39.356964],
        zoom: 6
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

function searchStyling() {
 //empty the results-display
 $("#results-display").empty();
 //prepend the results display with "Places to find" + thisPlant
 var resultsHeading = $("<h2>");
 resultsHeading.addClass("text-center pb-5");
 $(resultsHeading).text("Where to Find " + $(this).attr('name'));
 $("#results-display").prepend(resultsHeading); 
}


//when a plant icon is clicked
//right now it's working for the li items, but not for the bottom-bar images
$(".plant-selector").on("click", function (event) {
  
  //take the zipcode value of that plant
  zipcode = $(this).val();
  console.log(zipcode);
  //empty the results-display
  $("#results-display").empty();
  //prepend the results display with "Places to find" + thisPlant
  var resultsHeading = $("<h2>");
  resultsHeading.addClass("text-center pb-5");
  $(resultsHeading).text("Where to Find " + $(this).attr('name'));
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

        var hikeName = $("<h4 class='pb-3'>");
        $(hikeName).text(result[i].name);
        var hikeImg = $("<img>");
        $(hikeImg).attr("src", result[i].imgSqSmall);
        $(hikeImg).addClass("hike-image shadow mb-3");

        var hikeDiff = $("<p>");
        $(hikeDiff).text("Difficulty: " + result[i].difficulty);
        var hikeLength = $("<p>");
        $(hikeLength).text(result[i].length + " miles");

        $(hikeDiv).append(hikeName, hikeImg, hikeDiff, hikeLength);
        $("#results-display").append(hikeDiv);
      }
      $("#results-display").addClass("p-5 container");
      $("#results-display").append("<div class='clearfix'></div>");
    })
  })
}


// Add plants as objects    

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'juneberries',
    geometry: {
      type: 'Point',
      coordinates: [-112.516166, 38.280930]
    },
    properties: {
      title: 'Juneberries',
      description: 'Beaver, UT'
    }
  },
  {
    type: 'inkycap',
    geometry: {
      type: 'Point',
      coordinates: [-111.812605, 40.521111]
    },
    properties: {
      title: 'Inky Cap Mushrooms',
      description: 'Draper, UT'
    }
    },
    {
      type: 'sage',
      geometry: {
        type: 'Point',
        coordinates: [-112.625621, 39.704337]
      },
      properties: {
        title: 'White Sage',
        description: 'Delta, UT'
    }
    },
    {
      type: 'elderberry',
      geometry: {
        type: 'Point',
        coordinates: [-111.406138, 40.066830]
      },
      properties: {
        title: 'Elderberry Flowers',
        description: 'Provo, UT'
      }
      },
      {
        type: 'spinach',
        geometry: {
          type: 'Point',
          coordinates: [-111.832968, 41.066532]
        },
        properties: {
          title: 'Wild Spinach',
          description: 'Layton, UT'
        }
        },
        {
        type: 'mulberry',
        geometry: {
          type: 'Point',
          coordinates: [-112.251402, 40.501375]
        },
        properties: {
          title: 'White Mulberry',
          description: 'Tooele, UT'
        }
        },
        {
          type: 'pinecone',
          geometry: {
            type: 'Point',
            coordinates: [-113.063708, 37.583641]
          },
          properties: {
            title: 'Pine Nuts',
            description: 'Cedar City, UT'
          }
          },
          {
          type: 'asparagus',
          geometry: {
            type: 'Point',
            coordinates: [-112.224091, 38.768214]
          },
          properties: {
            title: 'Wild Asparagus',
            description: 'Sugarville, UT'
          }
  }]
};

// Add markers to map
  geojson.features.forEach(function(marker) {
// Create HTML element
   var el = document.createElement('div'); 
// Add class for CSS
   el.className = marker.type;
   new mapboxgl.Marker(el)
   .setLngLat(marker.geometry.coordinates)
   .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
   .setHTML('<h4 class="pop-up-title">' + marker.properties.title + '</h4><p class="pop-up-text">Find near ' + marker.properties.description + '</p>'))
   .addTo(map);
  });

  // On click zoom and search function for each icon
  $(".juneberries").on("click", function() {
    map.flyTo({ center: geojson.features[0].geometry.coordinates, zoom: 8});
    name = "Juneberries";
    zipcode = 84713;
    searchStyling();
    runSearch();
  });

  $(".inkycap").on("click", function() {
    map.flyTo({ center: geojson.features[1].geometry.coordinates, zoom: 8});
    name = "Inky Cap Mushrooms";
    zipcode = 84020;
    searchStyling();
    runSearch();
  });

  $(".sage").on("click", function() {
    map.flyTo({ center: geojson.features[2].geometry.coordinates, zoom: 8});
    name = "White Sage";
    zipcode = 84049;
    searchStyling();
    runSearch();
  });

  $(".elderberry").on("click", function() {
    map.flyTo({ center: geojson.features[3].geometry.coordinates, zoom: 8});
    name = "Elderberry Flowers";
    zipcode = 84601;
    searchStyling();
    runSearch();
  });

  $(".spinach").on("click", function() {
    map.flyTo({ center: geojson.features[4].geometry.coordinates, zoom: 8});
    name = "Wild Spinach";
    zipcode = 84040;
    searchStyling();
    runSearch();
  });

  $(".mulberry").on("click", function() {
    map.flyTo({ center: geojson.features[5].geometry.coordinates, zoom: 8});
    name = "White Mulberry";
    zipcode = 84074;
    searchStyling();
    runSearch();
  });

  $(".pinecone").on("click", function() {
    map.flyTo({ center: geojson.features[6].geometry.coordinates, zoom: 8});
    name = "Pine Nuts";
    zipcode = 84720;
    searchStyling();
    runSearch();
  });

  $(".asparagus").on("click", function() {
    map.flyTo({ center: geojson.features[7].geometry.coordinates, zoom: 8});
    name = "Wild Asparagus";
    zipcode = 84627;
    searchStyling();
    runSearch();
  });

});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrolltop > 580 || document.documentElement.scrollTop > 580) {
    document.getElementById("navlinks").style.height = "50px";
    document.getElementById("logo").style.display = "none";
    document.getElementById("logo2").style.display = "block";
    document.getElementById("navlinks").style.backgroundColor = "lightgray";
  
  } else {
    document.getElementById("navlinks").style.backgroundColor = "transparent";
    document.getElementById("logo").style.display = "block";
    document.getElementById("logo2").style.display = "none";
  }
}

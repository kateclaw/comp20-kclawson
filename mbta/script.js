// var currLat = -9999;
// var currLng = -9999;

// function getLocation() {
//   console.log("in curr location function");

//   navigator.geolocation.getCurrentPosition(function(position) {
//     console.log("in geolocation navigator shindig");
//     currLat = position.coords.latitude;
//     currLng = position.coords.longitude;
//     // printLocation();
//   });

//   console.log("done w get location");
// }

// function printLocation() {
//   console.log("in print funcitono");
//   elem = document.getElementById("map");
//   elem.innerHTML = '<p class="fun">' + currLat + ", " + currLng + "</p>";
// }

// window.onload = function() {
//   getLocation();
// };

function initMap() {
  var marker_img = "train_icon.png";
  var curr_marker_img = "user_location.png";

  var SouthStation = { lat: 42.352271, lng: -71.05524200000001 };

  var stations = [
    ["Alewife", 42.395428, -71.142483],
    ["Davis", 42.39674, -71.121815],
    ["Porter Square", 42.3884, -71.11914899999999],
    ["Harvard Sqaure", 42.373362, -71.118956],
    ["Central Square", 42.365486, -71.103802],
    ["Kendall/MIT", 42.36249079, -71.08617653],
    ["Charles/MGH", 42.361166, -71.070628],
    ["Park Street", 42.35639457, -71.0624242],
    ["Downtown Crossing", 42.355518, -71.060225],
    ["South Station", 42.352271, -71.05524200000001],
    ["Broadway", 42.342622, -71.056967],
    ["Andrew", 42.330154, -71.057655],
    ["JFK/UMass", 42.320685, -71.052391],
    ["Savin Hill", 42.31129, -71.053331],
    ["Fields Corner", 42.300093, -71.061667],
    ["Shawmut", 42.29312583, -71.06573796000001],
    ["Ashmont", 42.284652, -71.06448899999999],
    ["North Quincy", 42.275275, -71.029583],
    ["Wollaston", 42.2665139, -71.0203369],
    ["Quincy Center", 42.251809, -71.005409],
    ["Quincy Adams", 42.233391, -71.007153],
    ["Braintree", 42.2078543, -71.0011385]
  ];

  var map = new google.maps.Map(document.getElementById("map"), {
    center: SouthStation,
    zoom: 13
  });

  infoWindow = new google.maps.InfoWindow();
  currMarker = new google.maps.Marker({
    map: map,

    icon: curr_marker_img
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        currMarker.setPosition(pos);
        infoWindow.setPosition(pos);
        // infoWindow.setContent("Location found!");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
    console.log("idk ur location sorry ur stuck at south station");
  }

  // if (!getLocation()) {
  //   var map = new google.maps.Map(document.getElementById("map"), {
  //     center: SouthStation,
  //     zoom: 13
  //   });
  // } else {
  //   var map = new google.maps.Map(document.getElementById("map"), {
  //     center: { currLat, currLng },
  //     zoom: 16
  //   });
  // }

  var infoWindow = new google.maps.InfoWindow({
    content: "Closest MBTA Red Line Subway station:"
  });

  var marker, i, line, j;

  for (i = 0; i < stations.length; i++) {
    // create markers
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(stations[i][1], stations[i][2]),
      map: map,
      title: stations[i][0],
      icon: marker_img
    });

    // create info windows
    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          infoWindow.setContent(stations[i][0] + " HELLO?");
          infoWindow.open(map, marker);
        };
      })(marker, i)
    );

    // coordinates for lines
    // MAKE THIS MORE EFFICIENT!!!!!!!
    var lineCoordinates = [
      { lat: stations[0][1], lng: stations[0][2] }, //ALEWIFE
      { lat: stations[1][1], lng: stations[1][2] },
      { lat: stations[2][1], lng: stations[2][2] },
      { lat: stations[3][1], lng: stations[3][2] },
      { lat: stations[4][1], lng: stations[4][2] },
      { lat: stations[5][1], lng: stations[5][2] },
      { lat: stations[6][1], lng: stations[6][2] },
      { lat: stations[7][1], lng: stations[7][2] },
      { lat: stations[8][1], lng: stations[8][2] },
      { lat: stations[9][1], lng: stations[9][2] },
      { lat: stations[10][1], lng: stations[10][2] },
      { lat: stations[11][1], lng: stations[11][2] },
      { lat: stations[12][1], lng: stations[12][2] } //JFK
      // { lat: stations[13][1], lng: stations[13][2] },
      // { lat: stations[14][1], lng: stations[14][2] }
      // { lat: stations[15][1], lng: stations[15][2] },
      // { lat: stations[16][1], lng: stations[16][2] },
      // { lat: stations[17][1], lng: stations[17][2] },
      // { lat: stations[18][1], lng: stations[18][2] }
    ];

    var leftLineCoords = [
      { lat: stations[12][1], lng: stations[12][2] },
      { lat: stations[13][1], lng: stations[13][2] },
      { lat: stations[14][1], lng: stations[14][2] },
      { lat: stations[15][1], lng: stations[15][2] },
      { lat: stations[16][1], lng: stations[16][2] }
    ];

    var rightLineCoords = [
      { lat: stations[12][1], lng: stations[12][2] },
      { lat: stations[17][1], lng: stations[17][2] },
      { lat: stations[18][1], lng: stations[18][2] },
      { lat: stations[19][1], lng: stations[19][2] },
      { lat: stations[20][1], lng: stations[20][2] },
      { lat: stations[21][1], lng: stations[21][2] }
    ];

    // main line
    line = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "#C72931",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    // left branch
    leftLine = new google.maps.Polyline({
      path: leftLineCoords,
      geodesic: true,
      strokeColor: "#C72931",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    // right branch
    rightLine = new google.maps.Polyline({
      path: rightLineCoords,
      geodesic: true,
      strokeColor: "#C72931",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
  }

  // "print" line segments
  line.setMap(map);
  leftLine.setMap(map);
  rightLine.setMap(map);

  // var lineCoordinates = [
  //   { lat: stations[0][1], lng: stations[0][2] },
  //   { lat: stations[1][1], lng: stations[1][2] }
  // ];

  // line = new google.maps.Polyline({
  //   path: lineCoordinates,
  //   geodesic: true,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2
  // });

  // line.setMap(map);

  //   var SouthStationMarker = new google.maps.Marker({
  //     position: SouthStation,
  //     map: map,
  //     title: "South Station",
  //     icon: marker_img
  //   });
  //   var SouthStationInfo = new google.maps.InfoWindow({
  //     content: "Closest MBTA Red Line Subway station:"
  //   });
  //   SouthStationMarker.addListener("click", function() {
  //     SouthStationInfo.open(map, SouthStationMarker);
  //   });

  //   //south station
  //   var SouthStationMarker = new google.maps.Marker({
  //     position: SouthStation,
  //     map: map,
  //     title: "South Station"
  //   });
  //   var SouthStationInfo = new google.maps.InfoWindow({
  //     content: "Closest MBTA Red Line Subway station:"
  //   });
  //   SouthStationMarker.addListener("click", function() {
  //     SouthStationInfo.open(map, SouthStationMarker);
  //   });
}

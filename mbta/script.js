// navigator.geolocation.getCurrentPosition(function position) {
//     something(position.coords.latitude, position.coords.longitude);
// }

function initMap() {
  var marker_img = "train_icon.png";
  var SouthStation = { lat: 42.352271, lng: -71.05524200000001 };
  //   var Andrew = { lat: 42.330154, lng: -71.057655 };

  var stations = [
    ["South Station", 42.352271, -71.05524200000001],
    ["Andrew", 42.330154, -71.057655],
    ["Porter Square", 42.3884, -71.11914899999999],
    ["Harvard Sqaure", 42.373362, -71.118956],
    ["JFK/UMass", 42.320685, -71.052391],
    ["Savin Hill", 42.31129, -71.053331],
    ["Park Street", 42.35639457, -71.0624242],
    ["Broadway", 42.342622, -71.056967],
    ["North Quincy", 42.275275, -71.029583],
    ["Shawmut", 42.29312583, -71.06573796000001],
    ["Davis", 42.39674, -71.121815],
    ["Alewife", 42.395428, -71.142483],
    ["Kendall/MIT", 42.36249079, -71.08617653],
    ["Charles/MGH", 42.361166, -71.070628],
    ["Downtown Crossing", 42.355518, -71.060225],
    ["Quincy Center", 42.251809, -71.005409],
    ["Quincy Adams", 42.233391, -71.007153],
    ["Ashmont", 42.284652, -71.06448899999999],
    ["Wollaston", 42.2665139, -71.0203369],
    ["Fields Corner", 42.300093, -71.061667],
    ["Central Square", 42.365486, -71.103802],
    ["Braintree", 42.2078543, -71.0011385]
  ];

  var map = new google.maps.Map(document.getElementById("map"), {
    center: SouthStation,
    zoom: 13
  });

  //south station
  var infoWindow = new google.maps.InfoWindow({
    content: "Closest MBTA Red Line Subway station:"
  });

  var marker, i;

  for (i = 0; i < stations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(stations[i][1], stations[i][2]),
      map: map,
      title: stations[i][0],
      icon: marker_img
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          infoWindow.setContent(stations[i][0] + "HELLO?");
          infoWindow.open(map, marker);
        };
      })(marker, i)
    );
  }

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

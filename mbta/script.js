function initMap() {
  var stations = [
    ["Alewife", 42.395428, -71.142483, "place-alfcl"],
    ["Davis", 42.39674, -71.121815, "place-davis"],
    ["Porter Square", 42.3884, -71.11914899999999, "place-portr"],
    ["Harvard Sqaure", 42.373362, -71.118956, "place-harsq"],
    ["Central Square", 42.365486, -71.103802, "place-cntsq"],
    ["Kendall/MIT", 42.36249079, -71.08617653, "place-knncl"],
    ["Charles/MGH", 42.361166, -71.070628, "place-chmnl"],
    ["Park Street", 42.35639457, -71.0624242, "place-pktrm"],
    ["Downtown Crossing", 42.355518, -71.060225, "place-dwnxg"],
    ["South Station", 42.352271, -71.05524200000001, "place-sstat"],
    ["Broadway", 42.342622, -71.056967, "place-brdwy"],
    ["Andrew", 42.330154, -71.057655, "place-andrw"],
    ["JFK/UMass", 42.320685, -71.052391, "place-jfk"],
    ["Savin Hill", 42.31129, -71.053331, "place-shmnl"],
    ["Fields Corner", 42.300093, -71.061667, "place-fldcr"],
    ["Shawmut", 42.29312583, -71.06573796000001, "place-smmnl"],
    ["Ashmont", 42.284652, -71.06448899999999, "place-asmnl"],
    ["North Quincy", 42.275275, -71.029583, "place-nqncy"],
    ["Wollaston", 42.2665139, -71.0203369, "place-wlsta"],
    ["Quincy Center", 42.251809, -71.005409, "place-qnctr"],
    ["Quincy Adams", 42.233391, -71.007153, "place-qamnl"],
    ["Braintree", 42.2078543, -71.0011385, "place-brntn"]
  ];

  var marker_img = "train_icon.png";
  var curr_marker_img = "user_location.png";

  var SouthStation = {
    lat: 42.352271,
    lng: -71.05524200000001
  };

  // center map at south station
  var map = new google.maps.Map(document.getElementById("map"), {
    center: SouthStation,
    zoom: 13
  });

  currInfoWindow = new google.maps.InfoWindow();
  currMarker = new google.maps.Marker({
    map: map,
    icon: curr_marker_img
  });

  // find location and recenter map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      // var pos = position.coords;
      var lat = pos.latitude;
      var lng = pos.longitude;

      currMarker.setPosition({
        lat,
        lng
      });
      currInfoWindow.setPosition({
        lat,
        lng
      });

      currMarker.addListener("click", function () {
        currInfoWindow.open(map);
        infoWindow.close(map, marker);
      });

      map.setCenter({
        lat,
        lng
      });
    });
  } else {
    // if browser doesn't support geolocation
    alert("idk ur location sorry ur stuck at south station");
  }

  var infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  var markers = [];

  for (var i = 0; i < stations.length; i++) {
    // create markers
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(stations[i][1], stations[i][2]),
      map: map,
      title: stations[i][0],
      icon: marker_img
    });

    markers.push(marker);

    // find closest station to current location
    google.maps.event.addListener(currMarker, "click", findClosest);

    var urlMBTA = "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + stations[i][3];

    requestMBTA(urlMBTA, i, marker, function (data, stationIndex, stationMarker) {
      var response = JSON.parse(data.responseText);
      var stationInfo = response.data;
      var stationName = stations[stationIndex][0];
      var returnHTML = "<strong>" + stationName + "</strong> <br> Upcoming train arrival times: <br>";
      var leng = stationInfo.length;

      // get station attributes
      for (var j = 0; j < leng; j++) {
        returnHTML += stationInfo[j].attributes.arrival_time + "<br>"
        // + "Direction: " +
        // stationInfo[j].attributes.direction_id;
      }
      bindInfoWindow(stationMarker, map, infoWindow, returnHTML)
    })

    // create info windows
    function bindInfoWindow(marker, map, infoWindow, returnHTML) {
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(returnHTML);
        infoWindow.open(map, marker);
        currInfoWindow.close(map, marker);
      });
    }

    // coordinates for lines
    var lineCoordinates = [{
        lat: stations[0][1],
        lng: stations[0][2]
      },
      {
        lat: stations[1][1],
        lng: stations[1][2]
      },
      {
        lat: stations[2][1],
        lng: stations[2][2]
      },
      {
        lat: stations[3][1],
        lng: stations[3][2]
      },
      {
        lat: stations[4][1],
        lng: stations[4][2]
      },
      {
        lat: stations[5][1],
        lng: stations[5][2]
      },
      {
        lat: stations[6][1],
        lng: stations[6][2]
      },
      {
        lat: stations[7][1],
        lng: stations[7][2]
      },
      {
        lat: stations[8][1],
        lng: stations[8][2]
      },
      {
        lat: stations[9][1],
        lng: stations[9][2]
      },
      {
        lat: stations[10][1],
        lng: stations[10][2]
      },
      {
        lat: stations[11][1],
        lng: stations[11][2]
      },
      {
        lat: stations[12][1],
        lng: stations[12][2]
      }
    ];

    var leftLineCoords = [{
        lat: stations[12][1],
        lng: stations[12][2]
      },
      {
        lat: stations[13][1],
        lng: stations[13][2]
      },
      {
        lat: stations[14][1],
        lng: stations[14][2]
      },
      {
        lat: stations[15][1],
        lng: stations[15][2]
      },
      {
        lat: stations[16][1],
        lng: stations[16][2]
      }
    ];

    var rightLineCoords = [{
        lat: stations[12][1],
        lng: stations[12][2]
      },
      {
        lat: stations[17][1],
        lng: stations[17][2]
      },
      {
        lat: stations[18][1],
        lng: stations[18][2]
      },
      {
        lat: stations[19][1],
        lng: stations[19][2]
      },
      {
        lat: stations[20][1],
        lng: stations[20][2]
      },
      {
        lat: stations[21][1],
        lng: stations[21][2]
      }
    ];

    // main line
    var line = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "#C72931",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    // left branch
    var leftLine = new google.maps.Polyline({
      path: leftLineCoords,
      geodesic: true,
      strokeColor: "#C72931",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    // right branch
    var rightLine = new google.maps.Polyline({
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

  // find closest station
  function findClosest(event) {
    var distances = [];
    var closest = -1;
    for (i = 0; i < stations.length; i++) {
      var d = google.maps.geometry.spherical.computeDistanceBetween(
        markers[i].position,
        event.latLng
      );
      distances[i] = d;
      if (closest == -1 || d < distances[closest]) {
        closest = i;
      }
    }

    var closestStation = markers[closest].getTitle();
    // console.log("Closest marker is: " + closestStation);

    currInfoWindow.setContent(
      "Closest MBTA Red Line Subway Station: " + "<strong>" + closestStation + "</strong>"
    );

    // retrieve coordinates
    var currLat = currMarker.getPosition().lat();
    var currLng = currMarker.getPosition().lng();

    var closestLat = markers[closest].getPosition().lat();
    var closestLng = markers[closest].getPosition().lng();

    // creates line btwn curr location and closest station
    var currLineCoords = [{
        lat: currLat,
        lng: currLng
      },
      {
        lat: closestLat,
        lng: closestLng
      }
    ];

    currLine = new google.maps.Polyline({
      path: currLineCoords,
      geodesic: true,
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    currLine.setMap(map);

  }

  //XML HTTP REQUEST
  function requestMBTA(url, index, marker, callback) {
    var request = new XMLHttpRequest;

    request.open("GET", url, true);


    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        callback(request, index, marker);
      }
    };

    request.send();
  }

}
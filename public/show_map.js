
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    var marker;
    var map;


(function () {
  if(typeof flutter_bridge !== 'undefined') {
    flutter_bridge.postMessage("send_location : OpenMap");
  }
  else {
    alert('please open on mobile phone');
  }
})()

function OpenMap(lt,lg) {
  
  uluru = {lat : lt, lng : lg};
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: uluru,
  });
  // The marker, positioned at Uluru
    marker = new google.maps.Marker({
    position: uluru,
    map: map,
    animation : google.maps.Animation.BOUNCE,
  });

  httpGetAsync(
    'https://us-central1-baii-c8a24.cloudfunctions.net/map_matching',
    function(resp) {
      console.log(resp);
  })
  //https://us-central1-<project-id>.cloudfunctions.net/widgets/<id>
  flutter_bridge.postMessage("start_position_stream:blank");
  
}

function UpdateMyLocation(lat,lng) {
  marker.setPosition(new google.maps.LatLng(lat,lng));
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
var map;
var uluru;
var service;
var directionRenderer;

function nav (c1,c2) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: c1,
      })    
    var service = new google.maps.DirectionsService
    var directionRenderer = new google.maps.DirectionsRenderer;
    directionRenderer.setMap(map)
    var start = c1;
    var dest = c2;
    var request = { origin : start,
                    destination : dest,
                    travelMode : google.maps.TravelMode.WALKING
                }
    
    service.route(request,((response,status) => { 
        if (status == "OK") { 
            directionRenderer.setDirections(response)
            var starter = new google.maps.Marker({ position : start, map : map, label : 'You are here'})
            var destMarker = new google.maps.Marker({position: dest, map : map, label : 'Your destination'})
        }
        }
    )
    )

}

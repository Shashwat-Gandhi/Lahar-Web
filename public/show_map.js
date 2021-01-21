
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    var marker;
function initMap() {
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: uluru,
    });
    // The marker, positioned at Uluru
      marker = new google.maps.Marker({
      position: uluru,
      map: map,
      animation : google.maps.Animation.BOUNCE,
    });

  }
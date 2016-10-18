var map;

function initMap() {
    var zoomAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('zoom-to-area-text'));
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 18.7576313, lng: -95.0092089},
        zoom: 4
    });
}

initMap();

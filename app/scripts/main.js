// Setup Mapbox basic map instance

// Attach specific accessToken to mapboxgl object
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RheXB1ZnRtYW4iLCJhIjoiY2ozeXptMzVhMDA3ZTMzbzR5ZXVweDQ5diJ9.uKibf-YeiUvRnrwbNvGrRQ';

// Build map object via mapboxgl constructor
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-77.0369, 38.9072], // starting position of DC
  zoom: 12, // starting zoom
  maxZoom: 16
});

/*
 * Use map object and attach .on method, use leverage param and then a callback function
 * Callback includes .addSource method that defines a onStreetBikeways GeoJSON Data Set:
 * Protected bike lane infrastructure of Washington DC (2017-07-06)
 * 15th St NW Bikeway, L/M St NW Bikeway, Penn Ave NW Bikeway and 1 St NE Bikeway
 * created via geojson.io
 */
map.on('load', function() {

  // ##################
  // On-street Bikeways
  // ##################
  map.addSource('On-street Bikeways', {
   type: 'geojson',
   data: './data/2017-07-06-onstreet-bikeways.json'
  });

  map.addLayer({
   'id': 'On-street Bikeways',
   'type': 'line',
   'source': 'On-street Bikeways',
   'layout': {
     'visibility': 'none'
   },
   'paint': {
     "line-color": "#a62dd2",
     "line-width": 4
   }
  });

  // #################
  // Off-street Trails
  // #################
  map.addSource('Off-street Trails', {
    type: 'geojson',
    data: './data/2017-07-13-offstreet-trails.json'
  });

  map.addLayer({
    'id': 'Off-street Trails',
    'type': 'line',
    'source': 'Off-street Trails',
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      "line-color": "#0271fb",
      "line-width": 4
    }
  });
});

var toggleableLayerIds = ['On-street Bikeways', 'Off-street Trails'];

// From mapbox https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
// General idea is to loop through an array of toggleable layers
// And then inject a menu toggle item into a nav the layers on top of the map
for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement('a');
  link.href = '#';
  link.className = 'active';
  link.textContent = id;

  link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);
}


// addControl method puts controls in upper left part of the page
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

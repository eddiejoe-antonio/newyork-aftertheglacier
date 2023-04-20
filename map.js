console.log('test')

var bounds = [
    [-74.402, 40.25], // Southwest coordinates (Staten Island center point)
    [-73.5824, 41.05]  // Northeast coordinates (New Rochelle center point)
];

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRkaWVqb2VhbnRvbmlvIiwiYSI6ImNsYTkxazJ6czA3ZXkzb3Bsd3NseWR2c2sifQ.4mQhLdsIGwxSy6FUhDaQLA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    zoom: 9.25,
    center: [-73.950, 40.733627]
});

map.on('load', function () {
    
    // This is the function that finds the first symbol layer
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    // Add the library locations as points
    map.addLayer({
        'id': 'hilly_locations',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'Data/topo_locations.geojson'
        },
        'paint': {
            'circle-color': '#ffffff',
            'circle-radius': 12,
            "circle-stroke-width": 2,
            "circle-stroke-color": '#fff',
            'circle-opacity': 0.25
        }
    }, firstSymbolId);
});

// Create the popup
map.on('click', 'hilly_locations', function (e) {
    //let entriesDiff = e.features[0].properties.ENTRIES_DIFF;
    let locationName = e.features[0].properties.Name;
    let descriptionPlace = e.features[0].properties.Description;
    let imageLink = e.features[0].properties.Image;


    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + locationName  + '</h4>' + '<img class="popup__img" src="' + imageLink + '">' + "<p>" + descriptionPlace + "</p>")
        // .HTML('<p>' + descriptionPlace +'</p>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'libraries_loudon', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'libraries_loudon', function () {
    map.getCanvas().style.cursor = '';
});


/*
// Add menu

var toggleableLayerIds = ['publicwifi', 'wifiCoverFill', 'pernta'];


for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function(e) {
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
};*/
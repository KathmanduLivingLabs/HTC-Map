console.log('layers.js');
var map = L.map('map').setView([28.425, 84.435], 7);

var north_east = new L.latLng(26.328231, 80.029907);
var south_west = new L.latLng(30.605155, 88.225708);
var bounds = new L.latLngBounds(north_east, south_west);
var nep_latlng_array = [];

//get coordinates from geojson
var testGeom = testGeom || [];

for (any in testGeom) {
    a = testGeom[any];
    for (bny in a) {
        b = L.latLng(a[bny])
        nep_latlng_array.push(b);
    }
}

osmUrl = 'https://a.tiles.mapbox.com/v3/poshan.i65ff4hn/{z}/{x}/{y}.png',
osmAttribution = 'Map data &copy; 2012 OpenStreetMap contributors';
var osm = L.TileLayer.boundaryCanvas(osmUrl, {
    boundary: nep_latlng_array,
    attribution: osmAttribution,
    doubleClickZoom: true
}).addTo(map);

//for the labels
var District_labels = new L.layerGroup();
District_labels.addTo(map);
var VDC_labels = new L.layerGroup();
//VDC_labels.addTo(map);

var district_boundary = new L.geoJson.ajax("data/district.geojson");
district_boundary.on('data:loaded', function(data) {
    district_boundary.setStyle(district_boundary_styles["Default"]["style"]);
    map.spin(false);
    labels(data, district_boundary);
});
district_boundary.addTo(map);

var vdc_boundary = new L.geoJson.ajax("data/vdc.geojson");
vdc_boundary.on('data:loaded', function(data) {
    vdc_boundary.setStyle(vdc_boundary_styles["Default"]["style"]);
    map.spin(false);
    labels(data, vdc_boundary);
});
// vdc_boundary.addTo(map);

var HTC_sites = new L.geoJson.ajax("data/htc_dummy.geojson");
HTC_sites.on('data:loaded', function(data) {
    HTC_sites.eachLayer(HTC_sites_styles["Default"]["style"]);
    map.spin(false);
});
HTC_sites.addTo(map);

baseLayers = {};



var overlays = {
    "layers": {
        "OpenStreetMap": osm,
        "District": district_boundary,
        "VDC": vdc_boundary,
        "HTC Sites": HTC_sites
    },
    "Labels": {
        "District Labels": District_labels
    }
};


//label variable key must [key]_labels where key is the key defined in overlays. this is used to accesss value using string notation
var LABELS = {
    "VDC Labels": VDC_labels,
    "District Labels": District_labels
}
// synchronize layer and label
map.on("overlayadd", function(layer) {
    // console.log('layer add', layer);
    //console.log('onoverlayadd');
    if (LABELS[layer.name + " Labels"]) {
        map.addLayer(LABELS[layer.name + " Labels"]);
        // overlays[layer.name + "_labels"] = LABELS[layer.name + "_labels"];
        layersControlSettings.addOverlay(LABELS[layer.name + " Labels"], layer.name + " Labels", "Labels");
    }
})
map.on("overlayremove", function(layer) {
    // console.log('layer remove', layer);
    // console.log('layer.name + " Labels" ', layer.name + " Labels");
    // debugger;
    if (map.hasLayer(LABELS[layer.name + " Labels"])) {
        map.removeLayer(LABELS[layer.name + " Labels"]);
        layersControlSettings.removeLayer(LABELS[layer.name + " Labels"], layer.name + " Labels", "Labels");
        // console.log(LABELS[layer.name + "_labels removed"]);
    }
})

// layers control
layersControlSettings = L.control.groupedLayers(baseLayers, overlays, {
    collapsed: false
});
layersControlSettings.addTo(map);
$('#layersControl').append(layersControlSettings.onAdd(map));
$('.leaflet-top.leaflet-right').hide(); // temporary solution for hiding layers control

//check the active layers first 
district_boundary.on('dblclick', function(e) {
    a = map.getZoom();
    if (a < 19) {
        map.setZoom(a + 1);
    }
})
vdc_boundary.on('dblclick', function(e) {
    a = map.getZoom();
    if (a < 19) {
        map.setZoom(a + 1);
    }
});

/*function findCenter(latlngs_sent) {
    x_s = 0;
    y_s = 0;
    for (var i = latlngs_sent.length - 1; i >= 0; i--) {
        x_s += latlngs_sent[i].lat;
        y_s += latlngs_sent[i].lng;
    };
    x = x_s / latlngs_sent.length;
    y = y_s / latlngs_sent.length;
    //point = L.point()
    return ([x, y]);

}*/


function labels() {
    //function createlabels(feature, layre) {
    console.log('labels');
    _test = district_boundary._layers;
    for (var aht in _test) {
        var b = _test[aht];
        //first find the coordinates that form the polygon
        //console.log(b._latlngs);
        var district = L.polygon(b._latlngs);
        //center = findCenter(b._latlngs);
        //debugger;
        //coords = L.latLng(center[0], center[1]);
        district_name = b.feature.properties.NAME_3; //label content
        var labelLocation = new L.LatLng(district.getBounds().getCenter().lat, district.getBounds().getCenter().lng);
        var labelTitle = new L.LabelOverlays(labelLocation, district_name);
        labels_layer.addLayer(labelTitle);


        /*
        label = new L.Label();
        label.setContent(district_name);
        //label.setLatLng(coords);
        label.setLatLng(district.getBounds().getCenter());
        labels_layer.addLayer(label);
        //map.showLabel(label);
        */



        /*
        L.marker(coords).bindPopup(district_name, {
            opacity: 0
        }).addTo(map);
        */

        //center.bindPopup(b.feature.properties.NAME_3);

        //then find the center of the polygon 
        //create leaflet points at the points 
        //style the points with transparent 
        //bindlabel the name_3

        //console.log(b.feature.properties.NAME_3);


    }
}

//!@#$%^&*()(*&^%$#@!#$%^&*()(*&^%$#@!))
//event on mapzoom
map.on('zoomend', function(e) {
    if (map._zoom > 7) {
        map.addLayer(labels_layer);
        console.log('greater than 8');
    } else {
        map.removeLayer(labels_layer);
    }
    //console.log('the zoom level is ', map._zoom);
});
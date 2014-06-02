function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
        d > 50 ? '#FD8D3C' :
        d > 20 ? '#FEB24C' :
        d > 10 ? '#FED976' :
        '#FFEDA0';
}

var legend = L.control({
    position: 'bottomleft'
});
legend.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info1"
    this._legends = {};
    for (layer in styles) {
        this._legends[layer] = styles[layer]['styles']['Default']['legend'];
    }
    this.update(this._legends);
    return this._div;
};

legend.update = function(legends) {
    todisplay = '';
    for (le in legends) {
        this._legends[le] = legends[le];
        // console.log('this._legends ', this._legends);
    }
    for (le in this._legends) {
        todisplay += this._legends[le];
        todisplay += "<br>";
    }
    this._div.innerHTML = todisplay
}

legend.addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    // console.log(layer);
    layer.bindPopup(feature.properties.Name);
    if (feature.properties.ia == 'FHI') {
        //HTC_sites.setStyle()
        console.log('FHI ia');
    }
}

function fullextent() {
    var nep_center = L.latLng(28.425, 84.435);
    var zoom_level = 7.4;
    map.setView(nep_center, zoom_level);

    /*
    //use the district or country layer instead of map
    var bounds = new L.LatLngBounds();
    bounds.extend(map.getBounds()._northEast);
    bounds.extend(map.getBounds()._southWest);
    map.fitBounds(bounds);
    */
}
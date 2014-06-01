/*Styles will be used to generate the UI, define styles separately
 */
/* associate layer with sytles: styles are defined in styles.js and layers in layers.js
 */
var STYLES = {
    "district_boundary_styles": {
        "geometry": "polygon",
        "styles": district_boundary_styles,
        "layer": district_boundary,
        "display": "District"
    },
    "vdc_boundary_styles": {
        "geometry": "polygon",
        "styles": vdc_boundary_styles,
        "layer": vdc_boundary,
        "display": "VDC"
    },
    "HTC_sites_styles": {
        "geometry": "point",
        "styles": HTC_sites_styles,
        "layer": HTC_sites,
        "display": "HTC Sites"
    }
}
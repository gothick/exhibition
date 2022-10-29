/*global
 L
*/

var mapMinZoom = 14;
var mapMaxZoom = 19;

var defaltViewBounds = new L.LatLngBounds(
    new L.LatLng(51.446305, -2.628280),
    new L.LatLng(51.442819, -2.622825)
);

var maxBounds = new L.LatLngBounds(
    new L.LatLng(51.4510, -2.635),
    new L.LatLng(51.4350, -2.615)
);

// These are the options we used for gdal2tiles
var tileBounds = new L.LatLngBounds(
    new L.LatLng(51.4490, -2.63012532448742),
    new L.LatLng(51.4400, -2.61820)
);

var map = L.map('map')
    .fitBounds(defaltViewBounds)
    .setMaxBounds(maxBounds);

// L.rectangle(maxBounds).addTo(map);

var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==", {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom
}).addTo(map);

var modernLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom
}).addTo(map);

var attribution = 'Mashup by <a href="https://gothick.org.uk">gothick</a>.';
attribution += '<br />Historical site plan (digitised and adjusted for north-facing friendliness): Bristol Archives, <a href="https://archives.bristol.gov.uk/records/37165/7/3">39864/1/1: Printed plan of Bristol International Exhibition Site adjoining Ashton Avenue and River Avon, 1914</a>.';
attribution += '<br />Tiled by <a href="https://gdal.org/programs/gdal2tiles.html">GDAL2Tiles</a> from <a href="https://gdal.org">GDAL</a> &amp; <a href="http://www.osgeo.org/">OSGeo</a> <a href="http://code.google.com/soc/">GSoC</a>.';
attribution += '<br />Modern map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>.';
attribution += '<br />Buy Clive Burlton\'s book <em><a href="https://www.bristolbooks.org/shop/bristols-lost-city">Bristol\'s Lost City</a></em>.';

var options = {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    opacity: 1.0,
    attribution: attribution,
    tms: false,
    bounds: tileBounds // Try to avoid too many requests for tiles outside the range of our custom tiles.
};
var layer = L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);

map.zoomControl.setPosition('bottomright');

function mapOpacity(sliderVal) {
    'use strict';
    var hOpac = Math.min(sliderVal, 1.0);
    var mOpac = Math.min(2.0 - sliderVal, 1.0);
    layer.setOpacity(hOpac);
    modernLayer.setOpacity(mOpac);
}

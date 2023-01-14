/*global
 L
*/

var assetsBase = "https://exhibition-cdn.gothick.org.uk/";

function addPostcards(map, postcards) {
    'use strict';
    postcards.forEach(function (postcard) {
        var marker = new L.Marker([postcard.lat, postcard.lng]);
        marker.bindPopup(
            "<a href='" + assetsBase + postcard.full + "'><img width='320' src='" + assetsBase + postcard.small + "'/></a><p>" + postcard.description + "</p>",
            {
                maxWidth: "auto"
            }
        ).openPopup();

        marker.addTo(map);

    });
}

// Hardcoded for now as we're just trying this out with a few postcards.
var postcards = [
    {
        "title": "Bristol Castle",
        "description": "Replica of Bristol Castle. WH Smith postcard.",
        "full": encodeURI("images/full/Postcard Bristol Castle.jpg"),
        "small": encodeURI("images/small/Postcard Bristol Castle.jpg"),
        "lat": 51.446483,
        "lng": -2.625353
    },
    {
        "title": "Clifton Bridge Station",
        "description": "Later postcard of Clifton Bridge Station. The Portishead Branch Line still travels along this route, and bridges that marked each platform end are still in use today.",
        "full": encodeURI("images/full/Postcard Clifton Bridge Station.jpg"),
        "small": encodeURI("images/small/Postcard Clifton Bridge Station.jpg"),
        "lat": 51.447155,
        "lng": -2.625766
    },
    {
        "title": "Figure Eight Coaster",
        "description": "The Figure 8 Coaster, or Scenic Railway, an early roller coaster. WH Smith postcard.",
        "full": encodeURI("images/full/Postcard Figure Eight Coaster.jpg"),
        "small": encodeURI("images/small/Postcard Figure Eight Coaster.jpg"),
        "lat": 51.442551,
        "lng": -2.624538
    },
    {
        "title": "Riverside Promenade",
        "description": "Bandstand with Austrailian Pavilion behind. WH Smith postcard.",
        "full": encodeURI("images/full/Postcard Riverside Promenade.jpg"),
        "small": encodeURI("images/small/Postcard Riverside Promenade.jpg"),
        "lat": 51.446014,
        "lng": -2.623449
    },
    {
        "title": "Bandstand and Australia Pavilion",
        "description": "Bandstand and Australia Pavilion. Burgess & co postcard.",
        "full": encodeURI("images/full/Bandstand and Australia Pavilion.jpg"),
        "small": encodeURI("images/small/Bandstand and Australia Pavilion.jpg"),
        "lat": 51.44559,
        "lng": -2.62329
    }
];

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

var attribution = 'Mashup by <a href="https://gothick.org.uk/2022/11/01/digitising-an-exhibition/">Matt Gibson</a> (<a href="https://twitter.com/gothick">@gothick</a>).';
attribution += '<br />Historical site plan (digitised &amp; adjusted for north-facing friendliness): Bristol Archives, <a href="https://archives.bristol.gov.uk/records/37165/7/3">37165/7/3: Printed plan of Bristol International Exhibition Site adjoining Ashton Avenue and River Avon, 1914</a>.';
attribution += '<br />Tiled by <a href="https://gdal.org/programs/gdal2tiles.html">GDAL2Tiles</a> from <a href="https://gdal.org">GDAL</a> &amp; <a href="http://www.osgeo.org/">OSGeo</a> <a href="http://code.google.com/soc/">GSoC</a>.';
attribution += '<br />Modern map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>.';
attribution += '<br />Buy Clive Burlton\'s book <em><a href="https://www.bristolbooks.org/shop/bristols-lost-city">Bristol\'s Lost City</a></em>! It`s amazing :)';

var options = {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    opacity: 1.0,
    attribution: attribution,
    tms: false,
    bounds: tileBounds // Try to avoid too many requests for tiles outside the range of our custom tiles.
};
var planLayer = L.tileLayer(assetsBase + 'images/tiles/plan/{z}/{x}/{y}.png', options).addTo(map);

map.zoomControl.setPosition('bottomright');

addPostcards(map, postcards);

function mapOpacity(sliderVal) {
    'use strict';
    var hOpac = Math.min(sliderVal, 1.0);
    var mOpac = Math.min(2.0 - sliderVal, 1.0);
    planLayer.setOpacity(hOpac);
    modernLayer.setOpacity(mOpac);
}

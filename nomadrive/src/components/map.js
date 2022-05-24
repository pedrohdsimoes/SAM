import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import geojson from '../custom.geo.json'
export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(-4.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(1.5);
    const [API_KEY] = useState('y7sAqCy7d1bhPP6yU5ZP');

    function rad2degr(rad) { return rad * 180 / Math.PI; }
    function degr2rad(degr) { return degr * Math.PI / 180; }

    /**
     * @param latLngInDeg array of arrays with latitude and longtitude
     *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
     *   [longtitude2] ...]
     *
     * @return array with the center latitude longtitude pairs in 
     *   degrees.
     */
    function getLatLngCenter(latLngInDegr) {
        var LATIDX = 0;
        var LNGIDX = 1;
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;

        for (var i = 0; i < latLngInDegr.length; i++) {
            var lat = degr2rad(latLngInDegr[i][LATIDX]);
            var lng = degr2rad(latLngInDegr[i][LNGIDX]);
            // sum of cartesian coordinates
            sumX += Math.cos(lat) * Math.cos(lng);
            sumY += Math.cos(lat) * Math.sin(lng);
            sumZ += Math.sin(lat);
        }

        var avgX = sumX / latLngInDegr.length;
        var avgY = sumY / latLngInDegr.length;
        var avgZ = sumZ / latLngInDegr.length;

        // convert average x, y, z coordinate to latitude and longtitude
        var lng = Math.atan2(avgY, avgX);
        var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
        var lat = Math.atan2(avgZ, hyp);

        return ([rad2degr(lat), rad2degr(lng)]);
    }


    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        var hoveredStateId = null;

        map.current.on('load', function () {
            // Add a source for the state polygons.
            map.current.addSource('world', {
                type: 'geojson',
                data: geojson,
                'generateId': true
            });

            // The feature-state dependent fill-opacity expression will render the hover effect
            // when a feature's hover state is set to true.
            // if (e.features[0].properties.continent === "South America") var color = '#14663D'
            var color = '#000000'
            map.current.addLayer({
                'id': 'world-fills',
                'type': 'fill',
                'source': 'world',
                'layout': {},
                'paint': {
                    'fill-color': color,
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.5,
                        0
                    ]
                }
            });

            // Add a layer showing the state polygons.
            map.current.addLayer({
                'id': 'world-layer',
                'type': 'line',
                'source': 'world',
                'layout': {},
                'paint': {
                    'line-color': color,
                    'line-width': 1

                }
            });
            // When a click event occurs on a feature in the world layer, open a popup at the
            // location of the click, with description HTML from its properties.
            map.current.on('click', 'world-fills', function (e) {
                console.log("Centro " + multiPolygonCenterLatitude + "," + multiPolygoncenterLongitude)
                var centerLatitude = getLatLngCenter(e.features[0].geometry.coordinates[0])[0];
                var centerLongitude = getLatLngCenter(e.features[0].geometry.coordinates[0])[1];
                var multiPolygonCenterLatitude = getLatLngCenter(e.features[0].geometry.coordinates[0])[0][0];
                var multiPolygoncenterLongitude = getLatLngCenter(e.features[0].geometry.coordinates[0])[0][1];
                //Fly animation to the country clicked
                map.current.flyTo({
                    center: [
                        e.features[0].geometry.type == 'Polygon' ? centerLatitude : multiPolygonCenterLatitude,
                        e.features[0].geometry.type == 'Polygon' ? centerLongitude : multiPolygoncenterLongitude
                    ],
                    zoom: 9,
                    bearing: 7,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });

                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.name)
                    .addTo(map.current);

            });

            // Change the cursor to a pointer when the mouse is over the world layer.
            map.current.on('mouseenter', 'world-fills', function () {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.current.on('mouseleave', 'world-layer', function () {
                map.current.getCanvas().style.cursor = '';
            });

            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            map.current.on('mousemove', 'world-fills', function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.current.setFeatureState(
                            { id: hoveredStateId, source: 'world' },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    // console.log("ID: " + hoveredStateId)
                    // console.log("CONTINENT: " + e.features[0].properties.continent)
                    map.current.setFeatureState(
                        { id: hoveredStateId, source: 'world' },
                        { hover: true }
                    );
                }
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.current.on('mouseleave', 'world-fills', function () {
                if (hoveredStateId) {
                    map.current.setFeatureState(
                        { id: hoveredStateId, source: 'world' },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });


        });

    });

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}


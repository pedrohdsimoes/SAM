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
            map.current.addLayer({
                'id': 'world-fills',
                'type': 'fill',
                'source': 'world',
                'layout': {},
                'paint': {
                    'fill-color': '#000000',
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
                    'line-color': '#000000',
                    'line-width': 1

                }
            });
            // When a click event occurs on a feature in the world layer, open a popup at the
            // location of the click, with description HTML from its properties.
            map.current.on('click', 'world-fills', function (e) {
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
                    console.log("ID: " + hoveredStateId)
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


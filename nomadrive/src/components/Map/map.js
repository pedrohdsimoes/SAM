import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import geojson from '../Map/custom.geo.json'
import { useNavigate, useLocation } from "react-router-dom";
import app from "../../firebase/firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { async } from '@firebase/util';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Map() {

    const sizeMedia = async (userID, countryName) => {
        let storage = getStorage(app);
        let result = await listAll(ref(storage, `${userID}/${countryName.toUpperCase()}/`));
        let total = result.items.length;
        // console.log(result);
        // console.log(result.items);
        // console.log(result.items.length);
        return total;
    }




    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(-4.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(1.5);
    const [API_KEY] = useState('y7sAqCy7d1bhPP6yU5ZP');
    const [nPhotos, setnPhotos] = useState(0);
    const [countryName, setCountryName] = useState("");
    const [userId, setUserId] = useState("");
    let navigate = useNavigate();
    let location = useLocation();

    function handleClick(countryName, code) {


        navigate('/CountryMedia', { state: { countryName: countryName, code: code } }, { replace: true });
    }

    useEffect(() => {
        let authentication = getAuth();
        onAuthStateChanged(authentication, (user) => {
            if (!user) {
                navigate('/signin')
            }
        });

        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/signin')
        }
        else {
            navigate('/map')
        }

    }, [])



    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/voyager/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });
        // Navigation UI
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
                    'fill-color': '#eec023',
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
                    'line-color': '#11222c',
                    'line-width': 1.5

                }
            });
            // -------------------- CLICK -----------------------//

            // When a click event occurs on a feature in the world layer, open a popup at the
            // location of the click, with description HTML from its properties.
            map.current.on('click', 'world-fills', function (e) {
                let countryName = e.features[0].properties.name;
                let code = e.features[0].properties.iso_n3;
                var clickedLatitude = e.lngLat.wrap().lng;
                var clickedLongitude = e.lngLat.wrap().lat;
                //Fly animation to the country clicked
                map.current.flyTo({
                    center: [
                        clickedLatitude,
                        clickedLongitude
                    ],
                    zoom: 5,
                    bearing: 7,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });


                let userID = sessionStorage.getItem('userID');
                setCountryName(countryName);
                setUserId(userID);



                let n_photos = nPhotos;
                let n_audio = 0;

                var popup = document.createElement("popup");
                var photos = document.createTextNode("Photos: " + n_photos);
                var br = document.createElement("br");
                var br2 = document.createElement("br");
                var audio = document.createTextNode("Audio: " + n_audio);
                var button = document.createElement('BUTTON');
                var text = document.createTextNode("Travel to " + countryName);


                button.appendChild(text);
                popup.appendChild(photos);
                popup.appendChild(br);
                popup.appendChild(audio);
                popup.appendChild(br2);
                popup.appendChild(button);
                button.classList.add("country_btn");
                button.onclick = function () {
                    handleClick(countryName, code)
                };
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setDOMContent(popup)
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

            // -------------------- HOVER -----------------------//

            // When the user moves their mouse over the world-fill layer, we'll update the
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
                    let code = e.features[0].properties.iso_n3;
                    navigate('/map', { state: { code: code } })
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

    useEffect(() => {
        sizeMedia(userId, countryName).then((r) => {
            //console.log(r);
            setnPhotos(r)
        });
        // console.log("t " + nPhotos)
    })
    return (
        <div className="map-wrap">

            <div ref={mapContainer} className="map" />
        </div>
    );
}

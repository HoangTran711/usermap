import React, { useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MyContext from '../../context/MyContext';

mapboxgl.accessToken =
  'pk.eyJ1IjoidHJhbmhvYW5nMDcxMTIwIiwiYSI6ImNrZjFocDZzYzEzc2gycW9jZXkwMGlmZmcifQ.MPYuezjAocZaq6v4nvOEwA';
function Mapbox() {
  const data = useContext(MyContext);

  var mapWrapper = useRef(null);
  let tempStyle = localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9';
  const [mapStyle, setMapStyle] = useState(tempStyle);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapWrapper,
      style: mapStyle,
      center: [106.77, 10.851],
      zoom: 17,
    });

    data.geoLoc.features.map((a, index) => {
      console.log(a.properties.preview2DImage);
      var html =
        "<div class='popup__container'>" +
        `<img src=${
          a.properties.preview2DImage
            ? a.properties.preview2DImage
            : 'https://picsum.photos/200/300'
        } class='popup__image' />` +
        `<h2 className='popup__heading'>${a.properties.name} </h2>` +
        `<p class='popup__text'>${a.properties.description}</p>` +
        '</div>';
      var customPopUp = new mapboxgl.Popup({
        anchor: 'bottom', // To show popup on top
        offset: { bottom: [0, -10] }, // To prevent popup from over shadowing the marker.
        closeOnClick: false, // To prevent close on mapClick.
      }).setHTML(html); // You can set any valid HTML.
      var el = document.createElement('div');
      let t = document.createElement('p');
      let b = document.createElement('i');
      b.className = 'fas fa-map-marker';
      b.id = a.properties.id;
      t.innerHTML = a.properties.name;
      t.className = 'text__marker';
      el.className = 'marker';
      el.id = a.properties.name;
      el.appendChild(b);
      el.appendChild(t);
      const marker = new mapboxgl.Marker(el)
        .setLngLat(a.geometry.coordinates)
        .setPopup(customPopUp) // sets a popup on this marker
        .addTo(map);
      const markerDiv = marker.getElement();
      markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => customPopUp.remove());
    });
    if (
      mapStyle !== 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9'
    ) {
      let node = document.querySelectorAll('.text__marker');
      for (let i = 0; i < node.length; i++) {
        if (
          mapStyle !==
          'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9'
        ) {
          node[i].style.color = 'white';
        }
      }
    }
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      })
    );
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        data.setUserLocation({
          geometry: {
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        });
      });
    } else {
    }
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
    });
    data.setDirection(directions);
    // directions.actions.setOriginFromCoordinates([106.771973, 10.851025]);
    // directions.actions.setDestinationFromCoordinates([106.770524, 10.851386]);

    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }
    map.on('load', () => {
      let t = localStorage.getItem('rotate');
      if (t === 'true') {
        rotateCamera(0);
      }
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });
    map.addControl(directions, 'top-right');
  }, [data.geoLoc]);
  return (
    <React.Fragment>
      <div ref={(el) => (mapWrapper = el)} className="mapWrapper" />
    </React.Fragment>
  );
}

export default Mapbox;

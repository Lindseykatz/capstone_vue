<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js"></script>
    <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css" rel="stylesheet" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      #map {
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGthdHo5MiIsImEiOiJjanVkYXJ4MWMweDZzNDNwYm9hMWJoMTIwIn0.yDMZYqEuy8w4xIEWIGYzvw";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v10",
        center: [-122.662323, 45.523751], // starting position
        zoom: 12
      });
      // set the bounds of the map
      var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
      map.setMaxBounds(bounds);

      // initialize the map canvas to interact with later
      var canvas = map.getCanvasContainer();

      // an arbitrary start will always be the same
      // only the end or destination will change
      var start = [-122.662323, 45.523751];

      // create a function to make a directions request
      mounted: {
        function getRoute(end) {
          // make a directions request using cycling profile
          // an arbitrary start will always be the same
          // only the end or destination will change
          var start = [-122.662323, 45.523751];
          var url =
            "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
            start[0] +
            "," +
            start[1] +
            ";" +
            end[0] +
            "," +
            end[1] +
            "?steps=true&geometries=geojson&access_token=" +
            mapboxgl.accessToken;

          // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
          var req = new XMLHttpRequest();
          req.responseType = "json";
          req.open("GET", url, true);
          req.onload = function() {
            var data = req.response.routes[0];
            var route = data.geometry.coordinates;
            var geojson = {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: route
              }
            };
            // if the route already exists on the map, reset it using setData
            if (map.getSource("route")) {
              map.getSource("route").setData(geojson);
            } else {
              // otherwise, make a new request
              map.addLayer({
                id: "route",
                type: "line",
                source: {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "LineString",
                      coordinates: geojson
                    }
                  }
                },
                layout: {
                  "line-join": "round",
                  "line-cap": "round"
                },
                paint: {
                  "line-color": "#3887be",
                  "line-width": 5,
                  "line-opacity": 0.75
                }
              });
            }
            // add turn instructions here at the end
          };
          req.send();
        }

        map.on("load", function() {
          // make an initial directions request that
          // starts and ends at the same location
          getRoute(start);

          // Add starting point to the map
          map.addLayer({
            id: "point",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: start
                    }
                  }
                ]
              }
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#3887be"
            }
          });
          // this is where the code from the next step will go
        });
      }
    </script>
  </body>
</html>

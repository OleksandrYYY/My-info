import { API_KEY_MAPBOX } from "../generalData/constants.js";
import * as UI from "../UI/index.js";

export function initializeMap(initialData, center = [0, 0], zoom = 2) {
    const {
        tableInformationOfCountries,
        mapContainer,
        containerLayerInfo
    } = initialData;

    mapContainer.id = "mapContainer";
    mapContainer.append(containerLayerInfo);
    tableInformationOfCountries.after(mapContainer);
    
    mapboxgl.accessToken = API_KEY_MAPBOX;

    const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: zoom,
        pitch: 0,
        bearing: 0,
        antialias: true
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }));
    map.addControl(new mapboxgl.FullscreenControl());
    map.dragRotate.enable();
    map.touchZoomRotate.enable({ around: "center" });

    map.on("load", () => {

        map.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
                "fill-extrusion-color": "#aaa",
                "fill-extrusion-height": [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                "fill-extrusion-base": [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                "fill-extrusion-opacity": 0.6
            }
        });

        map.addLayer({
            id: "emerald",
            type: "fill",
            source: "composite",
            "source-layer": "landuse",
            filter: ["==", "class", "park"],
            paint: {
                "fill-color": "#50C878",
                "fill-opacity": 0.5
            }
        });

        map.addLayer({
            id: "hospitals-layer",
            type: "symbol",
            source: "composite",
            "source-layer": "poi_label",
            filter: ["==", ["get", "maki"], "hospital"],
            layout: {
                "icon-image": "hospital-15",
                "icon-size": 1,
                "text-field": ["get", "name"],
                "text-size": 12,
                "text-anchor": "top"
            },
            paint: {
                "icon-color": "#DC143C",
                "text-color": "#DC143C"
            }
        });

        map.addLayer({
            id: "schools-layer",
            type: "symbol",
            source: "composite",
            "source-layer": "poi_label",
            filter: ["==", ["get", "maki"], "school"],
            layout: {
                "icon-image": "school-15",
                "icon-size": 1,
                "text-field": ["get", "name"],
                "text-size": 12,
                "text-anchor": "top"
            },
            paint: {
                "icon-color": "#6600FF",
                "text-color": "#6600FF"
            }
        });

        map.addLayer({
            id: "school-building-fill",
            type: "fill",
            source: "composite",
            "source-layer": "building",
            filter: ["==", ["get", "amenity"], "school"], 
            paint: {
                "fill-color": "#6600FF",
                "fill-opacity": 0.5
            }
        });

        map.addLayer({
            id: "hospital-building-fill",
            type: "fill",
            source: "composite",
            "source-layer": "building",
            filter: ["==", ["get", "amenity"], "hospital"], 
            paint: {
                "fill-color": "#DC143C",
                "fill-opacity": 0.5
            }
        });

        UI.getLayersInfo(containerLayerInfo);
    });

    return map;
};

import { API_KEY_MAPBOX } from "../generalData/constants.js";

export function initializeMap(initialData, center = [0, 0], zoom = 2) {
    const {
        tableInformationOfCountries,
        mapContainer
    } = initialData;

    mapContainer.id = "mapContainer";
    mapContainer.style.width = "700px";
    mapContainer.style.height = "500px";
    // blockInfoAboutPlacesCity.after(mapContainer);
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
    map.dragRotate.enable();
    map.touchZoomRotate.enable({ around: 'center' });

    map.on("load", () => {
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': 0.6
            }
        });
    });

    return map;
};

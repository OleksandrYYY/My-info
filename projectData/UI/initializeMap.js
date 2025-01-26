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
    });

    map.addControl(new mapboxgl.NavigationControl());

    return map;
};

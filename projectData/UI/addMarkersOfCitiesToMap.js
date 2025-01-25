import * as UI from "../UI/index.js";

export function addMarkersOfCitiesToMap(map, markersArray, citiesCoords, startMarker) {
    markersArray.forEach((marker) => marker.remove());
    markersArray.length = 0;

    const bounds = new mapboxgl.LngLatBounds();

    for (const cityData of citiesCoords) {
        const { lat, lng, city } = cityData;

        // Якщо null
        if (!lat || !lng) {
            continue;
        }

        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Місто: ${city}`))
            .addTo(map);

        markersArray.push(marker);

        bounds.extend([lng, lat]);

        marker.getElement().addEventListener("click", () => {
            // const { startMarker } = initialData;
            const coordsStartMarker = [lng, lat];
                    
            if (!startMarker) {
                startMarker = coordsStartMarker;
                marker.getElement().classList.add("marker-selected-start");
            } else {
                const startCoordsMarker = startMarker;
                const endCoordsMarker = coordsStartMarker;
        
                UI.showRouteOnMap(map, startCoordsMarker, endCoordsMarker);
        
                startMarker = null;
        
                markersArray.forEach((marker) => {
                    marker.getElement().classList.remove("marker-selected-start");
                });
            };
        });
    };
    
    if (citiesCoords.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    };
};

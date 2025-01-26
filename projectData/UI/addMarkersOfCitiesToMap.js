import * as UI from "../UI/index.js";

export function addMarkersOfCitiesToMap(initialData, allCoords) {
    const {
        map,
        markers
    } = initialData;

    markers.forEach((marker) => marker.remove());
    markers.length = 0;

    const bounds = new mapboxgl.LngLatBounds();

    for (const cityData of allCoords) {
        const { lat, lng, city } = cityData;

        if (!lat || !lng) {
            continue;
        };

        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Місто: ${city}`))
            .addTo(map);

        markers.push(marker);

        bounds.extend([lng, lat]);

        marker.getElement().addEventListener("click", () => {
            const coordsStartMarker = [lng, lat];
                    
            if (!initialData.startMarker) {
                initialData.startMarker = coordsStartMarker;
                marker.getElement().classList.add("marker-selected-start");
            } else {
                const startCoordsMarker = initialData.startMarker;
                const endCoordsMarker = coordsStartMarker;
        
                UI.showRouteOnMap(map, startCoordsMarker, endCoordsMarker);
        
                initialData.startMarker = null;
        
                markers.forEach((marker) => {
                    marker.getElement().classList.remove("marker-selected-start");
                });
            };
        });
    };
    
    if (allCoords.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    };
};

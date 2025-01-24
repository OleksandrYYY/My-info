export function addMarkersOfCitiesToMap(map, markersArray, citiesCoords) {
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
    };
    
    if (citiesCoords.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    };
};

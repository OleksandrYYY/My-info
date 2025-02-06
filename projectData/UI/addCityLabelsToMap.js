import * as UI from "../UI/index.js";

export function addCityLabelsToMap(initialData, allCoords) {
    const {
        map
    } = initialData;

    initialData.markers.forEach((marker) => marker.remove());
    initialData.markers.length = 0;

    const bounds = new mapboxgl.LngLatBounds();

    allCoords.forEach((cityData) => {
        const { lat, lng, city } = cityData;

        if (!lat || !lng) return;

        const cityLabel = document.createElement("div");
        cityLabel.className = "city-label";
        cityLabel.textContent = city;

        cityLabel.addEventListener("click", () => {
            const coordsStartMarker = [lng, lat];

            if (!initialData.startMarker) {
                initialData.startMarker = coordsStartMarker;
                cityLabel.classList.add("city-label-selected");
            } else {
                const startCoordsMarker = initialData.startMarker;
                const endCoordsMarker = coordsStartMarker;
                    
                UI.showRouteOnMap(map, startCoordsMarker, endCoordsMarker);
                    
                initialData.startMarker = null;
            };
        });

        new mapboxgl.Marker({
            element: cityLabel,
            anchor: "center",
        })
            .setLngLat([lng, lat])
            .addTo(map);

        bounds.extend([lng, lat]);
    });

    if (allCoords.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    };
};

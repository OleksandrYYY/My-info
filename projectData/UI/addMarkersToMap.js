import * as UI from "../UI/index.js";

export function addMarkersToMap(places, initialData) {

    const {
        map,
        markers
    } = initialData;

    if (!map) {
        console.error("Немає екземпляра map!");
        return;
    };

    markers.forEach((marker) => marker.remove());
    markers.length = 0;

    const bounds = new mapboxgl.LngLatBounds();

    places.forEach((place) => {
        const lat = place.geocodes?.main?.latitude;
        const lng = place.geocodes?.main?.longitude;
        if (lat == null || lng == null) {
            console.warn("Пропускаємо place без координат:", place.name);
            return;
        };

        const popupHTML = `
            <h3>${place.name}</h3>
            <p>${place.location.address || 'Немає адреси'}</p>
            <img src="${place.categories[0].icon.prefix}bg_64${place.categories[0].icon.suffix}" alt="${place.categories[0].name} Icon" />
        `;

        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
            .addTo(map);

        markers.push(marker);
        bounds.extend([lng, lat]);

        marker.getElement().addEventListener("click", () => {
            // const { startMarker } = initialData;
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
    });

    if (markers.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    };
};
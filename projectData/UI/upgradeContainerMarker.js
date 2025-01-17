export function upgradeContainerMarker(place, markers, value) {
    const lat = place.geocodes.main.latitude;
    const lng = place.geocodes.main.longitude;

    markers.forEach(marker => {
        const markerLngLat = marker.getLngLat();
        const markerEl = marker.getElement();
        if (markerLngLat.lat === lat && markerLngLat.lng === lng) {
            if (value) {
                markerEl.classList.add("marker-hover");
            } else {
                markerEl.classList.remove("marker-hover");
            };
        };
    });
};

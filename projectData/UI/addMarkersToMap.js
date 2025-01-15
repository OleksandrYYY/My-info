export function addMarkersToMap(map, markers, places) {
    if (!map) {
        console.error("Немає екземпляра map!");
        return;
    };

    markers.forEach((marker) => marker.remove());
    markers.length = 0;

    // if (!Array.isArray(places) || places.length === 0) {
    //     console.warn("Немає місць для відображення маркерів.");
    //     return;
    // }

    // Створимо bounds для підгонки
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
    });

    // Якщо принаймні один маркер було додано
    if (markers.length > 0) {
        map.fitBounds(bounds, { padding: 50 });
    }
}
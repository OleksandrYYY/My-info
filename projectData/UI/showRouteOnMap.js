import { API_KEY_MAPBOX } from "../generalData/constants.js";

export async function showRouteOnMap(map ,start, end) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&overview=full&language=uk&access_token=${API_KEY_MAPBOX}`;

    try {

        if (!start || !end) {
            console.error("Нема двох точок для маршруту.");
            return;
        };
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.routes || data.routes.length === 0) {
            console.error("Маршрут не знайдено або API повернуло помилку.");
            return;
        };
        
        const route = data.routes[0].geometry;
        
        if (map.getSource("route")) {
            map.removeLayer("route");
            map.removeSource("route");
        };
        
        map.addSource("route", {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: route,
            },
        });
        
        map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#ff3333",
                "line-width": 4,
            },
        });
        
        const bounds = new mapboxgl.LngLatBounds();
        
        route.coordinates.forEach(([lng, lat]) => {
            bounds.extend([lng, lat]);
        });
        map.fitBounds(bounds, { padding: 50 });
        
    } catch (error) {
        console.error("Помилка прокладання маршруту:", error);
    };
};

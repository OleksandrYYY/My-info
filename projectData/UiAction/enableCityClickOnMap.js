import * as UI from "../UI/index.js";

export function enableCityClickOnMap(initialData) {
    const { map } = initialData;

    if (!map) {
        console.error("Карта не ініціалізована!");
        return;
    };

    map.on("load", () => {
        console.log("Список шарів карти:", map.getStyle().layers);
    });

    map.on("click", (event) => {
        
        const features = map.queryRenderedFeatures(event.point, {
            layers: ["settlement-label"]
        });
        console.log(features);

        if (features.length === 0) {
            console.log("Клікнули в порожнє місце, об'єктів немає.");
            return;
        }

        const cityFeature = features.find((feature) => feature.properties && feature.properties.name);

        if (cityFeature) {
            const cityName = cityFeature.properties.name;
            const lngLat = cityFeature.geometry.coordinates;

            console.log(`Ви клікнули по місту: ${cityName}`, lngLat);

            if (!initialData.startMarker) {
                initialData.startMarker = lngLat;
                console.log(`Початкова точка маршруту: ${cityName}`);
            } else {
                const startCoords = initialData.startMarker;
                const endCoords = lngLat;

                console.log(`Прокладаємо маршрут від ${startCoords} до ${endCoords}`);
                UI.showRouteOnMap(map, startCoords, endCoords);
                initialData.startMarker = null;
            }
        } else {
            console.log("Немає назви міста для вибраного місця.");
        }
    });
}
import * as UiAction from "../UiAction/index.js";

export function enableClickOnMap(initialData) {
    const { map } = initialData;

    if (!map) {
        console.error("Карта не ініціалізована!");
        return;
    };

    map.on("click", (event) => {
        const infoAboutPoint = map.queryRenderedFeatures(event.point, {
            layers: ["poi-label", "settlement-label", "building", "building-outline", "building-number-label"]
        });

        if (!infoAboutPoint.length) {
            console.log("Клікнули в порожнє місце, об'єктів немає.");
            return;
        };

        const dataAboutPoint = infoAboutPoint[0];
        const layerId = dataAboutPoint.layer.id;
        const [lng, lat] = dataAboutPoint.geometry.coordinates;
        const placeName = dataAboutPoint.properties.name || "Без назви";

        switch (layerId) {
            case "settlement-label":
            case "poi-label":
            case "building":
            case "building-outline":
            case "building-number-label":
                UiAction.getLocationCoordinates(initialData, placeName, [lng, lat]);
                break;
            default:
                console.log("Ще щось інше");
        };
    });
};

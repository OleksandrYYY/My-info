import * as UiAction from "../UiAction/index.js";

export function showStylesOfMap(initialData) {
    const {
        mapContainer,
        stylesMap,
        createSelectStylesMap,
        defOptionStyleMap
    } = initialData;

    defOptionStyleMap.textContent = "Оберіть стиль карти";
    createSelectStylesMap.append(defOptionStyleMap);
    mapContainer.before(createSelectStylesMap);

    if (stylesMap.length > 0) {
        stylesMap.forEach((style) => {
            const optionStyleMap = document.createElement("option");
            optionStyleMap.value = style.url;
            optionStyleMap.textContent = style.name; 
            createSelectStylesMap.append(optionStyleMap);
        });
    };

    UiAction.handlerEvents(createSelectStylesMap, "change", (event) => {
        const getStyleMap = event.target.value;
        if (getStyleMap) {
            initialData.map.setStyle(getStyleMap);
        };
    });
};

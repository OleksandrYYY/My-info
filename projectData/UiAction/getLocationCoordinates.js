import * as UI from "../UI/index.js";

export function getLocationCoordinates(initialData, placeName, coordinates) {
    const { map } = initialData;

    if (!initialData.startMarker) {
        initialData.startMarker = coordinates;
    } else {
        const startCoords = initialData.startMarker;
        const endCoords = coordinates;
        UI.showRouteOnMap(map, startCoords, endCoords);
        initialData.startMarker = null;
    };
};

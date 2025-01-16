import * as UiAction from "../UiAction/index.js";
import * as UI from "./index.js";

export function showListOfPlacesSelectedCity(places, blockInfoAboutPlacesCity, tableInformationOfCountries, initialData) {
    blockInfoAboutPlacesCity.innerHTML = "";
    const ul = document.createElement("ul");
    console.log(places);

    places.forEach((place) => {
        console.log(place);
        const li = document.createElement("li");
        li.textContent = place.name;
        ul.append(li);

        UiAction.handlerEvents(li, "click", () => {
            blockInfoAboutPlacesCity.style.display = "none";
            const descriptionOfPlace = document.createElement("div");
            const prefix = place.categories[0].icon.prefix;
            const suffix = place.categories[0].icon.suffix;
            const size = "64";
            const iconUrl = `${prefix}bg_${size}${suffix}`;

            descriptionOfPlace.innerHTML = `
            <img src="${iconUrl}" alt="#">
            <p>
               Адреса: ${place.location.address}
            </p>
            `;
            tableInformationOfCountries.after(descriptionOfPlace);

            const btnBack = document.createElement("button");
            btnBack.textContent = "Назад";
            descriptionOfPlace.append(btnBack);

            UiAction.handlerEvents(btnBack, "click", () => {
                descriptionOfPlace.remove();
                blockInfoAboutPlacesCity.style.display = "block";
                UI.showListOfPlacesSelectedCity(places, blockInfoAboutPlacesCity, tableInformationOfCountries, initialData);
            });
        });
        // if (!initialData.map) {
        //     let center = [0, 0];
        //     if (places.length > 0) {
        //         const lat = places[0].geocodes.main.latitude;
        //         const lng = places[0].geocodes.main.longitude;
        //         center = [lng, lat];
        //     };

        //     initialData.map = UI.initializeMap(mapContainer, blockInfoAboutPlacesCity, center, 10);
        // };
        UI.addMarkersToMap(initialData.map, initialData.markers, places);
    });
    blockInfoAboutPlacesCity.append(ul);
};
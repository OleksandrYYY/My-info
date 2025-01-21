import * as UiAction from "../UiAction/index.js";
// import * as UI from "./index.js";
import * as UI from "../UI/index.js";

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
        
        UI.addMarkersToMap(initialData.map, initialData.markers, places, initialData);

        UiAction.handlerEvents(li, "mouseover", () => {
            UI.upgradeContainerMarker(place, initialData.markers, true);
        });

        UiAction.handlerEvents(li, "mouseout", () => {
            UI.upgradeContainerMarker(place, initialData.markers, false);
        });
    });
    blockInfoAboutPlacesCity.append(ul);
};
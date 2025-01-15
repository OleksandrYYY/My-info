import * as UiAction from "../UiAction/index.js";
import * as UI from "./index.js";

export function showListOfPlacesSelectedCity(places, blockInfoAboutPlacesCity, tableInformationOfCountries) {
    blockInfoAboutPlacesCity.innerHTML = "";
    const ul = document.createElement("ul");

    places.forEach((place) => {
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
                UI.showListOfPlacesSelectedCity(places, blockInfoAboutPlacesCity, tableInformationOfCountries);
            });
        });
    });
    blockInfoAboutPlacesCity.append(ul);
};
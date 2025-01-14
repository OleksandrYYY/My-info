import * as UiAction from "../UiAction/index.js";
import * as UI from "./index.js";
import { API_KEY_PLACES } from "../generalData/constants.js";

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




            // async function getPlaceDetails(fsq_id) {
            //     const url = `https://api.foursquare.com/v3/places/${fsq_id}`;
            //     const options = {
            //         method: 'GET',
            //         headers: {
            //             Accept: 'application/json',
            //             Authorization: API_KEY_PLACES
            //         }
            //     };
                
            //     try {
            //         const response = await fetch(url, options);
            //         if (!response.ok) {
            //             throw new Error(`HTTP error! status: ${response.status}`);
            //         }
            //         const data = await response.json();
            //         return data;
            //     } catch (error) {
            //         console.error("Помилка при отриманні деталей місця:", error);
            //         return null;
            //     }
            // }
        });
    });
    blockInfoAboutPlacesCity.append(ul);
};
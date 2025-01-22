"use strict";

import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";
import * as generalData from "../generalData/index.js";

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const initialData = generalData.getInitialData();
    const {elemInputCountryName, elemInputCityName, selectCountry, selectCity, tableInformationOfCountries, blockInfoAboutPlacesCity, btnShowPlaces, mapContainer} = initialData;

    btnShowPlaces.textContent = "Показати популярні місця";
    btnShowPlaces.style.display = "none";

    try {
        initialData.allCountries = await API.fetchApiGetCountries(initialData);
    } catch (error) {
        console.error("Помилка при завантаженні країн:", error);
    };
    
    elemInputCityName.disabled = true;

    UiAction.handlerEvents(elemInputCountryName, "input", (event) => {
        UiAction.handlerInputCountry(initialData, event);
    });

    UiAction.handlerEvents(selectCountry, "change", async(event) => {
        try {
            initialData.citiesSelectedCountry = await UiAction.handlerSelectCountry(initialData, event);
        } catch (error) {
            console.error("Помилка при завантаженні міст", error);
        };
    });

    UiAction.handlerEvents(elemInputCityName, "input", (event) => {
        UiAction.handlerInputCity(initialData, event);
    });

    UI.showBlockDataOfCountries(initialData);

    API.fetchApiWeatherCityByDays(initialData);

    UiAction.handlerEvents(btnShowPlaces, "click", async() => {
        try {
            const selectCityName = selectCity.value.trim();
            await UiAction.getListPlacesSelectedCity(selectCityName, initialData);
        } catch (error) {
            console.error("Помилка при завантаженні списка місць", error);
        };
    });
});

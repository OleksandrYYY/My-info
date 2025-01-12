"use strict";

import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";
import * as generalData from "../generalData/index.js";

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const initialData = generalData.getInitialData();
    const {formWeather, elemInputCountryName, elemInputCityName, selectCountry, tableInformationOfCountries, blockInfoVisitedCountries, showBtnHideData, selectCity, blockInfoAboutPlacesCity, btnShowPlaces} = initialData;

    btnShowPlaces.textContent = "Показати популярні місця";
    btnShowPlaces.style.display = "none";

    initialData.allCountries = await API.fetchApiGetCountries(initialData);
    
    elemInputCityName.disabled = true;

    UiAction.handlerEvents(elemInputCountryName, "input", (event) => {
        UiAction.handlerInputCountry(initialData, event);
    });

    UiAction.handlerEvents(selectCountry, "change", async(event) => {
        initialData.citiesSelectedCountry = await UiAction.handlerSelectCountry(initialData, event);
    });

    UiAction.handlerEvents(elemInputCityName, "input", (event) => {
        UiAction.handlerInputCity(initialData, event);
    });

    UI.showBlockDataOfCountries(tableInformationOfCountries, formWeather, blockInfoVisitedCountries, showBtnHideData, blockInfoAboutPlacesCity, btnShowPlaces);

    API.fetchApiWeatherCityByDays(initialData);

    UiAction.handlerEvents(btnShowPlaces, "click", async() => {
        const selectCityName = selectCity.value.trim();
        // const selectCityName = initialData.selectCity.value.trim();
        await UiAction.getListPlaces(selectCityName, blockInfoAboutPlacesCity);
    });

});

"use strict";

import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";
import * as generalData from "../generalData/index.js";

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const initialData = generalData.getInitialData();
    const {formWeather, elemInputCountryName, elemInputCityName, conditionWeatherCity, selectCountry, selectCity, defaultOptionCountry, defaultOptionCity, tableInformationOfCountries, tableInformationOfWeatherByDays} = initialData;

    initialData.allCountries = await API.fetchApiGetCountries(initialData, initialData.allCountries);
    
    elemInputCityName.disabled = true;

    UI.showTableResults(tableInformationOfCountries);

    UiAction.handlerEvents(elemInputCountryName, "input", (event) => {
        UiAction.handlerInputCountry(initialData, event);
    });

    UiAction.handlerEvents(selectCountry, "change", async(event) => {
        initialData.citiesSelectedCountry = await UiAction.handlerSelectCountry(initialData, event);
    });

    UiAction.handlerEvents(elemInputCityName, "input", (event) => {
        UiAction.handlerInputCity(initialData, event);
    });

    // API.fetchApiWeatherCity(selectCity, conditionWeatherCity, formWeather);
    API.fetchApiWeatherCityByDays(selectCity, conditionWeatherCity, formWeather, tableInformationOfWeatherByDays);
});

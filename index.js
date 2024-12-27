"use strict";

import { showTableResults } from "./showTableResults.js";
import { fetchApiGetCountries } from "./fetchApiGetCountries.js";
import { handlerEvents } from "./handlerEvents.js";
import { fetchApiWeatherCity } from "./fetchApiWeatherCity.js";
import { handlerInputCountry } from "./handlerInputCountry.js";
import { handlerSelectCountry } from "./handlerSelectCountry.js";
import { handlerInputCity } from "./handlerInputCity.js";
import { getInitialData } from "./getInitialData.js";

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const initialData = getInitialData();
    const {formWeather, elemInputCountryName, elemInputCityName, conditionWeatherCity, selectCountry, selectCity, defaultOptionCountry, defaultOptionCity, tableInformationOfCountries} = initialData;

    initialData.allCountries = await fetchApiGetCountries(initialData, initialData.allCountries);
    
    elemInputCityName.disabled = true;

    showTableResults(tableInformationOfCountries);

    handlerEvents(elemInputCountryName, "input", (event) => {
        handlerInputCountry(initialData, event);
    });

    handlerEvents(selectCountry, "change", async(event) => {
        initialData.citiesSelectedCountry = await handlerSelectCountry(initialData, event);
    });

    handlerEvents(elemInputCityName, "input", (event) => {
        handlerInputCity(initialData, event);
    });

    fetchApiWeatherCity(selectCity, conditionWeatherCity, formWeather);
});

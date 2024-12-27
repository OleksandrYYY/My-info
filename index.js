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
    let allCountries = [];
    let selectCountryName = "";
    let citiesSelectedCountry;

    const initialData = getInitialData();
    const {formWeather, elemInputCountryName, elemInputCityName, conditionWeatherCity, selectCountry, selectCity, defaultOptionCountry, defaultOptionCity, tableInformationOfCountries} = initialData

    allCountries = await fetchApiGetCountries(initialData, allCountries);
    elemInputCityName.disabled = true;

    showTableResults(tableInformationOfCountries);

    handlerEvents(elemInputCountryName, "input", (event) => {
        handlerInputCountry(initialData, event, allCountries);
    });

    handlerEvents(selectCountry, "change", async(event) => {
        citiesSelectedCountry = await handlerSelectCountry(initialData, event, allCountries, citiesSelectedCountry, selectCountryName);
    });

    handlerEvents(elemInputCityName, "input", (event) => {
        handlerInputCity(initialData, event, allCountries, citiesSelectedCountry);
    });

    fetchApiWeatherCity(selectCity, selectCountryName, conditionWeatherCity, formWeather);
});
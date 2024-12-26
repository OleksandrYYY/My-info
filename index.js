"use strict";

import { showTableResults } from "./showTableResults.js";
import { fetchApiGetCountries } from "./fetchApiGetCountries.js";
import { handlerEvents } from "./handlerEvents.js";
import { fetchApiWeatherCity } from "./fetchApiWeatherCity.js";
import { handlerInputCountry } from "./handlerInputCountry.js";
import { handlerSelectCountry } from "./handlerSelectCountry.js";
import { handlerInputCity } from "./handlerInputCity.js";

let allCountries = [];
let selectCountryName = "";
let citiesSelectedCountry;

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const formWeather = document.querySelector("#form-weather");
    const elemInputCountryName = document.querySelector("#name-country");
    const elemInputCityName = document.querySelector("#name-city");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const selectCity = document.querySelector("#select-city");
    const defaultOptionCountry = document.querySelector("#default-option-country");
    const defaultOptionCity = document.querySelector("#default-option-city");
    const tableInformationOfCountries = document.querySelector("#all-info-countries");

    
    allCountries = await fetchApiGetCountries(allCountries, selectCountry, selectCity);
    elemInputCityName.disabled = true;

    showTableResults(tableInformationOfCountries);

    handlerEvents(elemInputCountryName, "input", (event) => {
        handlerInputCountry(event, selectCountry, defaultOptionCountry, conditionWeatherCity, allCountries, selectCity, defaultOptionCity, elemInputCityName, formWeather);
    });

    handlerEvents(selectCountry, "change", async(event) => {
        citiesSelectedCountry = await handlerSelectCountry(event, selectCountryName, elemInputCityName, conditionWeatherCity, allCountries, tableInformationOfCountries, citiesSelectedCountry, selectCity, defaultOptionCity);
    });

    handlerEvents(elemInputCityName, "input", (event) => {
        handlerInputCity(event, selectCity, defaultOptionCity, elemInputCountryName, selectCountry, defaultOptionCountry, allCountries,elemInputCityName, conditionWeatherCity, citiesSelectedCountry, formWeather);
    });

    fetchApiWeatherCity(selectCity, selectCountryName, conditionWeatherCity, formWeather);
});
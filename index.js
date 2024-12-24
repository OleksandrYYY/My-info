"use strict";

import { showListCountries } from "./showListCountries.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";
import { saveVisitedCountries } from "./saveVisitedCountries.js";
import { showTableResults } from "./showTableResults.js";
import { fetchApiGetCountries } from "./fetchApiGetCountries.js";
import { handlerEvents } from "./handlerEvents.js";
import { fetchApiWeatherCity } from "./fetchApiWeatherCity.js";
import { getFilterResult } from "./getFilterResult.js";

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
        const inputCountryName = event.target.value.trim().toLowerCase();
        selectCountry.innerHTML = "";
        selectCountry.append(defaultOptionCountry);
        conditionWeatherCity.innerHTML = "";

        if (inputCountryName === "") {
            showListCountries(allCountries, selectCountry);
            selectCity.innerHTML = "";
            selectCity.append(defaultOptionCity);
            selectCity.disabled = true;
            elemInputCityName.disabled = true;
        } else {
            getFilterResult(allCountries, inputCountryName, selectCountry, formWeather, conditionWeatherCity, true);

            elemInputCityName.value = "";

            selectCity.innerHTML = "";
            selectCity.append(defaultOptionCity);
            selectCity.disabled = true;
            elemInputCityName.disabled = true;
        };
    });

    handlerEvents(selectCountry, "change", async(event) => {
        selectCountryName = event.target.value;
        elemInputCityName.disabled = false;
        conditionWeatherCity.innerHTML = "";

        const foundCountry = allCountries.find(country => country.name.common === selectCountryName );
        saveVisitedCountries(foundCountry);
        showTableResults(tableInformationOfCountries);

        if (selectCountryName) {
            try {
                citiesSelectedCountry = await fetchApiCitiesByCountry(selectCountryName);

                const foundCountry = allCountries.find(country => country.name.common === selectCountryName);
                let countryCode = "en";

                if (foundCountry && foundCountry.languages) {
                    const languagesKeys = Object.keys(foundCountry.languages);
                    
                    if (languagesKeys.length > 0) {
                        const firstLanguageCode = languagesKeys[0];
                        countryCode = firstLanguageCode.slice(0,2);
                    };
                };

                showListCities(citiesSelectedCountry, selectCity, defaultOptionCity, countryCode);
                selectCity.disabled = false;
            } catch (error) {
                console.error("Помилка при завантаженні міст:", error);
            };
        };
    });

    handlerEvents(elemInputCityName, "input", (event) => {
        const inputCityName = event.target.value.trim().toLowerCase();
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);

        if (inputCityName === "") {
            elemInputCountryName.value = "";
            selectCountry.innerHTML = "";
            selectCountry.append(defaultOptionCountry);
            showListCountries(allCountries, selectCountry);
            elemInputCityName.disabled = true;
            selectCity.disabled = true;
            conditionWeatherCity.innerHTML = "";
        } else {
            getFilterResult(citiesSelectedCountry, inputCityName, selectCity, formWeather, conditionWeatherCity, false);
        };
    });

    fetchApiWeatherCity(selectCity, selectCountryName, conditionWeatherCity, formWeather);
});
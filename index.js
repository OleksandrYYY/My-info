"use strict";
import { API_KEY } from "./constants.js";
import { API_BASE_URL } from "./constants.js";
import { getDataWeatherCity } from "./getDataWeatherCity.js";
import { showListCountries } from "./showListCountries.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";
import { saveVisitedCountries } from "./saveVisitedCountries.js";
import { showTableResults } from "./showTableResults.js";

import { fetchApiGetCountries } from "./fetchApiGetCountries.js";
import { handlerEvents } from "./handlerEvents.js";
import { fetchApiWeatherCity } from "./fetchApiWeatherCity.js";
// import { getFilterResult } from "./getFilterResult.js";

let allCountries = [];
let selectCountryName = "";
let visitedCountries;
let citiesSelectedCountry;

document.addEventListener("DOMContentLoaded", async() => {
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
            selectCountry.disabled = false;
        } else {
            const filterCountries = allCountries.filter((country) => 
                country.name.common.toLowerCase().startsWith(inputCountryName)
            );
            
            if (filterCountries.length > 0) {
                filterCountries.forEach((country) => {
                    const option = document.createElement("option");
                    option.value = country.name.common;
                    option.textContent = country.name.common;
                    selectCountry.append(option);
                });
            } else {
                formWeather.append(conditionWeatherCity)
                selectCountry.disabled = true;
                conditionWeatherCity.innerHTML = "<p>Такої назви країни не існує.</p>"
            }
            // getFilterResult(allCountries, inputCountryName, selectCountry, formWeather, conditionWeatherCity, true);
            // selectCountry.disabled = true;
            
            selectCity.innerHTML = "";
            selectCity.append(defaultOptionCity);
            selectCity.disabled = true;
        };
    });

    handlerEvents(selectCountry, "change", async(event) => {
        selectCountryName = event.target.value;
        elemInputCityName.disabled = false;
        conditionWeatherCity.innerHTML = "";

        const foundCountry = allCountries.find(country => country.name.common === selectCountryName );
        saveVisitedCountries(foundCountry, visitedCountries);
        showTableResults(tableInformationOfCountries, foundCountry);

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
        console.log(inputCityName);
        
        console.log(citiesSelectedCountry);

        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);


        // getFilterResult(citiesSelectedCountry, inputCityName, selectCity, formWeather, conditionWeatherCity, false);
        const filterCities = citiesSelectedCountry.filter((city) => {
            return city.toLowerCase().startsWith(inputCityName);
        });
        console.log(filterCities);

        if (filterCities.length > 0) {
            filterCities.forEach((city) => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                selectCity.append(option);
            });
        } else {
            formWeather.append(conditionWeatherCity)
            conditionWeatherCity.innerHTML = "<p>Такої назви країни не існує.</p>"
        }
    });

    fetchApiWeatherCity(selectCity, selectCountryName, conditionWeatherCity, formWeather);
});
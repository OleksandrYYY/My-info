"use strict";
import { API_KEY } from "./constants.js";
import { API_BASE_URL } from "./constants.js";
import { getDataWeatherCity } from "./getDataWeatherCity.js";
import { showListCountries } from "./showListCountries.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";
import { saveVisitedCountries } from "./saveVisitedCountries.js";
import { showTableResults } from "./showTableResults.js";

let allCountries = [];
let visitedCountries;

document.addEventListener("DOMContentLoaded", async() => {
    const formWeather = document.querySelector("#form-weather");
    const elemInputCountryName = document.querySelector("#name-country");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const selectCity = document.querySelector("#select-city");

    const defaultOptionCountry = document.querySelector("#default-option-country");
    const defaultOptionCity = document.querySelector("#default-option-city");

    const tableInformationOfCountries = document.querySelector("#all-info-countries");

    let selectCountryName = "";
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        allCountries = await response.json();

        showListCountries(allCountries, selectCountry);        
        
        elemInputCountryName.addEventListener("input", (event) => {
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
                
                selectCity.innerHTML = "";
                selectCity.append(defaultOptionCity);
                selectCity.disabled = true;
            };
        });

        selectCity.disabled = true;
    } catch (error) {
        console.error("Pomulka:", error);
    };


    selectCountry.addEventListener("change", async (event) => {
        selectCountryName = event.target.value;
        conditionWeatherCity.innerHTML = "";
        console.log("Вибрана країна назва:", selectCountryName);


        const foundCountry = allCountries.find(country => country.name.common === selectCountryName );
        console.log(foundCountry);
        saveVisitedCountries(foundCountry, visitedCountries);
        showTableResults(tableInformationOfCountries, foundCountry);

        if (selectCountryName) {
            try {
                const citiesSelectedCountry = await fetchApiCitiesByCountry(selectCountryName);
                console.log("Отримані міста:", citiesSelectedCountry);

                const foundCountry = allCountries.find(country => country.name.common === selectCountryName);
                console.log(foundCountry);
                let countryCode = "en";
                if (foundCountry && foundCountry.languages) {
                    const languagesKeys = Object.keys(foundCountry.languages);
                    console.log(languagesKeys);
                    if (languagesKeys.length > 0) {
                        const firstLanguageCode = languagesKeys[0];
                        console.log(firstLanguageCode);
                        countryCode = firstLanguageCode.slice(0,2);
                        console.log(countryCode);
                    };
                };


                showListCities(citiesSelectedCountry, selectCity, defaultOptionCity, countryCode);
                selectCity.disabled = false;
            } catch (error) {
                console.error("Помилка при завантаженні міст:", error);
            }
        }
    });

    selectCity.addEventListener("change", async(event) => {
        const selectCityName = event.target.value;
        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${selectCityName}&q=${selectCountryName}`);
                const dataWeatherCity = await response.json();
                console.log(dataWeatherCity);
                getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather);
            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
});

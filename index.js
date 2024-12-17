"use strict";
import { API_KEY } from "./constants.js";
import { API_BASE_URL } from "./constants.js";
import { getDataWeatherCity } from "./getDataWeatherCity.js";
import { showListCountries } from "./showListCountries.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";

document.addEventListener("DOMContentLoaded", async() => {
    const formWeather = document.querySelector("#form-weather");
    const elemInputCountryName = document.querySelector("#name-country");
    // const elemBtnWeatherCity = document.querySelector("#btn-weather-city");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const selectCity = document.querySelector("#select-city");

    const defaultOptionCountry = document.querySelector("#default-option-country");
    const defaultOptionCity = document.querySelector("#default-option-city");

    let selectCountryName = "";
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const allCountries = await response.json();

        showListCountries(allCountries, selectCountry, defaultOptionCountry);        
        
        elemInputCountryName.addEventListener("input", (event) => {
            const inputCountryName = event.target.value.trim().toLowerCase();
            selectCountry.innerHTML = "";
            selectCountry.append(defaultOptionCountry);
            conditionWeatherCity.innerHTML = "";

            if (inputCountryName === "") {
                showListCountries(allCountries, selectCountry, defaultOptionCountry);
                selectCity.innerHTML = "";
                selectCity.append(defaultOptionCity);
                selectCity.disabled = true;
                selectCountry.disabled = false;   
                // 59
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
                    // 75
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

        if (selectCountryName) {
            try {
                const citiesSelectedCountry = await fetchApiCitiesByCountry(selectCountryName);
                console.log("Отримані міста:", citiesSelectedCountry);
                showListCities(citiesSelectedCountry, selectCity, defaultOptionCity);
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

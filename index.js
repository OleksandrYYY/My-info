"use strict";
import { API_KEY } from "./constants.js";
import { API_BASE_URL } from "./constants.js";
import { getDataWeatherCity } from "./getDataWeatherCity.js";
import { showListCountries } from "./showListCountries.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";

document.addEventListener("DOMContentLoaded", async() => {
    const formWeather = document.querySelector("#form-weather");
    const elemInputCityName = document.querySelector("#name-city");
    const elemBtnWeatherCity = document.querySelector("#btn-weather-city");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const selectCity = document.querySelector("#select-city");

    let selectCountryName = "";
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const allCountries = await response.json();
        
        elemInputCityName.addEventListener("input", (event) => {
            const inputCityName = event.target.value;

            const filterCountries = allCountries.filter((country) => {
                country.name.common.toLowerCase().startsWith(inputCityName.toLowerCase());
            });

            const sortCountries = filterCountries.sort((a, b) => {
                // return a.name.common.localeCompare(b.name.common, 'uk');
                if (a.name.common < b.name.common) return -1;
                if (a.name.common > b.name.common) return 1;
                return 0;
            });

            sortCountries.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.textContent = country.name.common;
                selectCountry.append(option);
            });
        });




        showListCountries(allCountries, selectCountry);
        // showListCountries(filterCountries, selectCountry);
        selectCity.disabled = true;
    } catch (error) {
        console.error("Pomulka:", error);
    };

    // let selectCountryName = "";
    selectCountry.addEventListener("change", async (event) => {
        selectCountryName = event.target.value;
        console.log("Вибрана країна назва:", selectCountryName);

        if (selectCountryName) {
            try {
                const citiesSelectedCountry = await fetchApiCitiesByCountry(selectCountryName);
                console.log("Отримані міста:", citiesSelectedCountry);
                showListCities(citiesSelectedCountry, selectCity);
                selectCity.disabled = false;
            } catch (error) {
                console.error("Помилка при завантаженні міст:", error);
            }
        } else {
            // citySelect.disabled = true;
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
        }
    })
});



// elemBtnWeatherCity.addEventListener("click", async(event) => {
    //     event.preventDefault();
    //     conditionWeatherCity.innerHTML = "";
    //     const getValueCityName = elemInputCityName.value.trim();
    //     console.log(getValueCityName);
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${getValueCityName}`);
    //         const dataWeatherCity = await response.json();
    //         console.log(dataWeatherCity);
    //         getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather);
    //     } catch (error) {
    //         console.error("Сталася помилка:", error);
    //     };
    // });
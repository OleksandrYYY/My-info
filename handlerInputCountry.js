import { showListCountries } from "./showListCountries.js";
import { getFilterResult } from "./getFilterResult.js";

export function handlerInputCountry(event, selectCountry, defaultOptionCountry, conditionWeatherCity, allCountries, selectCity, defaultOptionCity, elemInputCityName, formWeather) {
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
};

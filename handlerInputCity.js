import { showListCountries } from "./showListCountries.js";
import { getFilterResult } from "./getFilterResult.js";

export function handlerInputCity(event, selectCity, defaultOptionCity, elemInputCountryName, selectCountry, defaultOptionCountry, allCountries,elemInputCityName, conditionWeatherCity, citiesSelectedCountry, formWeather) {
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
}
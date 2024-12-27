import { showListCountries } from "./showListCountries.js";
import { getFilterResult } from "./getFilterResult.js";

export function handlerInputCountry(initialData, event, allCountries) {
    
    const {
        selectCountry,
        defaultOptionCountry,
        conditionWeatherCity,
        selectCity,
        defaultOptionCity,
        elemInputCityName,
        formWeather
    } = initialData;
    
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
        getFilterResult(allCountries, inputCountryName, {
            selectElem: selectCountry,
            conditionWeatherCity,
            formWeather,
            isCountry: true
        });
        elemInputCityName.value = "";
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);
        selectCity.disabled = true;
        elemInputCityName.disabled = true;
    };
};

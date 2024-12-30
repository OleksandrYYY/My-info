import * as UI from "../UI/index.js";

export function handlerInputCity(initialData, event) {
    const {
        selectCity,
        defaultOptionCity,
        elemInputCountryName,
        selectCountry,
        defaultOptionCountry,
        elemInputCityName,
        conditionWeatherCity,
        formWeather,
        allCountries,
        citiesSelectedCountry
    } = initialData;

    const inputCityName = event.target.value.trim().toLowerCase();
    selectCity.innerHTML = "";
    selectCity.append(defaultOptionCity);

    if (inputCityName === "") {
        elemInputCountryName.value = "";
        selectCountry.innerHTML = "";
        selectCountry.append(defaultOptionCountry);
        UI.showListCountries(allCountries, selectCountry);
        elemInputCityName.disabled = true;
        selectCity.disabled = true;
        conditionWeatherCity.innerHTML = "";
    } else {
        UI.getFilterResult(citiesSelectedCountry, inputCityName, {
            selectElem: selectCity,
            conditionWeatherCity,
            formWeather,
            isCountry: false
        });
    };
};

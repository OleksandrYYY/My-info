import * as UI from "../UI/index.js";

export function handlerInputCountry(initialData, event) {
    
    const {
        selectCountry,
        defaultOptionCountry,
        conditionWeatherCity,
        selectCity,
        defaultOptionCity,
        elemInputCityName,
        formWeather,
        allCountries,
        tableInformationOfWeatherByDays
    } = initialData;
    
    const inputCountryName = event.target.value.trim().toLowerCase();
    selectCountry.innerHTML = "";
    selectCountry.append(defaultOptionCountry);
    conditionWeatherCity.innerHTML = "";
    
    if (inputCountryName === "") {
        UI.showListCountries(allCountries, selectCountry);
        tableInformationOfWeatherByDays.style.display = "none";
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);
        selectCity.disabled = true;
        elemInputCityName.disabled = true;
    } else {
        UI.getFilterResult(allCountries, inputCountryName, {
            selectElem: selectCountry,
            conditionWeatherCity,
            formWeather,
            isCountry: true
        });
        tableInformationOfWeatherByDays.style.display = "none";
        elemInputCityName.value = "";
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);
        selectCity.disabled = true;
        elemInputCityName.disabled = true;
    };
};

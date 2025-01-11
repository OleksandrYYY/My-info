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
        citiesSelectedCountry,
        tableInformationOfCountries,
        showBtnHideData
    } = initialData;

    const inputCityName = event.target.value.trim().toLowerCase();
    selectCity.innerHTML = "";
    selectCity.append(defaultOptionCity);

    if (inputCityName === "") {
        elemInputCountryName.value = "";
        tableInformationOfCountries.style.display = "none";
        showBtnHideData.style.display = "none";
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
        tableInformationOfCountries.style.display = "none";
        showBtnHideData.style.display = "none";
    };
};

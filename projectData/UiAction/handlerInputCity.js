import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function handlerInputCity(initialData, event) {
    const {
        formWeather,
        elemInputCountryName,
        elemInputCityName,
        conditionWeatherCity,
        selectCountry,
        defaultOptionCountry,
        selectCity,
        defaultOptionCity,
        tableInformationOfCountries,
        tableInformationOfWeatherByDays,
        blockInfoAboutPlacesCity,
        btnShowPlaces,
        showBtnHideData,
        btnHideData,
        allCountries,
        citiesSelectedCountry,
    } = initialData;

    const inputCityName = event.target.value.trim().toLowerCase();
    selectCity.innerHTML = "";
    selectCity.append(defaultOptionCity);

    if (inputCityName === "") {
        elemInputCountryName.value = "";

        UiAction.clearElements([selectCountry, conditionWeatherCity, blockInfoAboutPlacesCity]);
        selectCountry.append(defaultOptionCountry);

        UI.showListCountries(allCountries, selectCountry);

        UiAction.hideElements([tableInformationOfCountries, btnShowPlaces, showBtnHideData, tableInformationOfWeatherByDays, btnHideData]);

        UiAction.disableFields([elemInputCityName, selectCity], true);
    } else {
        UI.getFilterResult(citiesSelectedCountry, inputCityName, {
            selectElem: selectCity,
            conditionWeatherCity,
            formWeather,
            isCountry: false
        });

        UiAction.hideElements([tableInformationOfCountries, btnShowPlaces, showBtnHideData, tableInformationOfWeatherByDays, btnHideData]);
        blockInfoAboutPlacesCity.innerHTML = "";
    };
};

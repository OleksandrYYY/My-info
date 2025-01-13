import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function handlerInputCountry(initialData, event) {
    
    const {
        formWeather,
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
        allCountries
    } = initialData;
    
    const inputCountryName = event.target.value.trim().toLowerCase();
    UiAction.clearElements([selectCountry, conditionWeatherCity]);
    selectCountry.append(defaultOptionCountry);
    
    if (inputCountryName === "") {
        UiAction.clearElements([selectCity, blockInfoAboutPlacesCity]);
        selectCity.append(defaultOptionCity);

        UI.showListCountries(allCountries, selectCountry);

        UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, btnShowPlaces, showBtnHideData]);

        UiAction.disableFields([elemInputCityName, selectCity], true);
    } else {
        UI.getFilterResult(allCountries, inputCountryName, {
            selectElem: selectCountry,
            conditionWeatherCity,
            formWeather,
            isCountry: true
        });

        elemInputCityName.value = "";
        UiAction.clearElements([selectCity, blockInfoAboutPlacesCity]);
        selectCity.append(defaultOptionCity);

        UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, btnShowPlaces, showBtnHideData]);

        UiAction.disableFields([elemInputCityName, selectCity], true);
    };
};

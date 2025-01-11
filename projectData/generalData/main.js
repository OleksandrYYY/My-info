"use strict";

import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";
import * as generalData from "../generalData/index.js";

document.addEventListener("DOMContentLoaded", async() => {
    // localStorage.clear();
    const initialData = generalData.getInitialData();
    const {formWeather, elemInputCountryName, elemInputCityName, selectCountry, tableInformationOfCountries, blockInfoVisitedCountries, selectCity, blockInfoAboutPlacesCity, showBtnHideData, btnShowPlaces} = initialData;

    initialData.allCountries = await API.fetchApiGetCountries(initialData);
    
    elemInputCityName.disabled = true;

    UiAction.handlerEvents(elemInputCountryName, "input", (event) => {
        UiAction.handlerInputCountry(initialData, event);
    });

    UiAction.handlerEvents(selectCountry, "change", async(event) => {
        initialData.citiesSelectedCountry = await UiAction.handlerSelectCountry(initialData, event);
    });

    UiAction.handlerEvents(elemInputCityName, "input", (event) => {
        UiAction.handlerInputCity(initialData, event);
    });

    UI.showBlockDataOfCountries(tableInformationOfCountries, formWeather, blockInfoVisitedCountries, showBtnHideData, blockInfoAboutPlacesCity);

    API.fetchApiWeatherCityByDays(initialData);

    // UiAction.handlerEvents(selectCountry, "click", async () => {
    //     const cityName = selectCity.value;
    //     const places = await API.fetchApiPlaces(cityName);
    //     console.log(places);
    // });
});

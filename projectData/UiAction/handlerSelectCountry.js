import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";

export async function handlerSelectCountry(initialData, event) {
    const {
        elemInputCityName,
        conditionWeatherCity,
        selectCity,
        tableInformationOfCountries,
        tableInformationOfWeatherByDays,
        blockInfoAboutPlacesCity,
        btnShowPlaces,
        showBtnHideData,
        btnHideData,
        mapContainer,
        createSelectStylesMap,
        map,
        allCountries,
        container,
        bar,
        text
    } = initialData;
    
    const selectCountryName = event.target.value;

    UiAction.clearElements([conditionWeatherCity, blockInfoAboutPlacesCity]);

    UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, btnShowPlaces, showBtnHideData, btnHideData, mapContainer, createSelectStylesMap]);
    elemInputCityName.disabled = false;


    const foundCountry = allCountries.find(country => country.name.common === selectCountryName );

    initialData.selectedCCA2 = foundCountry?.cca2 || null;

    if (!selectCountryName) {
      return;
    };

    UiAction.saveVisitedCountries(foundCountry);

    UI.showProgressBar(container, bar, text);

    if (selectCountryName) {
        try {
            initialData.citiesSelectedCountry = await API.fetchApiCitiesByCountry(selectCountryName);

            let countryCode = "en";

            if (foundCountry && foundCountry.languages) {
                const languagesKeys = Object.keys(foundCountry.languages);
                    
                if (languagesKeys.length > 0) {
                    const firstLanguageCode = languagesKeys[0];
                    countryCode = firstLanguageCode.slice(0,2);
                };
            };

            UI.showListCities(initialData.citiesSelectedCountry, initialData, countryCode);
            selectCity.disabled = false;

            const allCoords = await API.fetchApiAllCoordsCities(
                initialData.citiesSelectedCountry, 
                initialData.selectedCCA2,
                (percent) => {
                    UI.updateProgressBar(bar, text, percent);
                }
            );

            UI.finishProgressBar(container, bar, text);
            
            initialData.citiesCoords = allCoords;

            let center = [0, 0];
            if (allCoords.length > 0) {
                const first = allCoords[0];
                if (first.lng && first.lat) {
                    center = [first.lng, first.lat];
                };
            };

            if(!map) {
                initialData.map = UI.initializeMap(initialData, center, 10);
            } else {
                initialData.map.setCenter(center);
                initialData.map.setZoom(10);
            };

            mapContainer.style.display = "block";
            createSelectStylesMap.style.display = "inline-block";

            if (initialData.map) {
                initialData.map.resize();
            };

            UiAction.enableClickOnMap(initialData);

            return initialData.citiesSelectedCountry;
        } catch (error) {
            console.error("Помилка при завантаженні міст:", error);
            UI.finishProgressBar(container, bar, text);
        };
    };
};

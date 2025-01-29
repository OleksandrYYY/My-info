import * as UI from "../UI/index.js";
// import * as UiAction from "./index.js";
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
        startMarker,
        allCountries
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

            const allCoords = await API.fetchApiAllCoordsCities(initialData.citiesSelectedCountry, initialData.selectedCCA2);
            console.log("Координати всіх міст:", allCoords);
            initialData.citiesCoords = allCoords;
            console.log(allCoords);

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

            // UI.addMarkersOfCitiesToMap(initialData, allCoords);
            // UI.addCityLabelsToMap(initialData, allCoords);
            UiAction.enableClickOnMap(initialData);

            return initialData.citiesSelectedCountry;
        } catch (error) {
            console.error("Помилка при завантаженні міст:", error);
        };
    };
};
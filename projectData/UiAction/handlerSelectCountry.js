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
        allCountries
    } = initialData;
    
    const selectCountryName = event.target.value;

    UiAction.clearElements([conditionWeatherCity, blockInfoAboutPlacesCity]);

    UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, btnShowPlaces, showBtnHideData, btnHideData]);

    elemInputCityName.disabled = false;


    const foundCountry = allCountries.find(country => country.name.common === selectCountryName );
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
            return initialData.citiesSelectedCountry;
        } catch (error) {
            console.error("Помилка при завантаженні міст:", error);
        };
    };
};
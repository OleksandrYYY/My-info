import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";

export async function handlerSelectCountry(initialData, event) {
    
    const {
        elemInputCityName,
        conditionWeatherCity,
        tableInformationOfCountries,
        selectCity,
        allCountries,
        tableInformationOfWeatherByDays
    } = initialData;
    
    initialData.selectCountryName = event.target.value;
    elemInputCityName.disabled = false;
    conditionWeatherCity.innerHTML = "";
    tableInformationOfWeatherByDays.style.display = "none";
    tableInformationOfCountries.style.display = "none";

    const foundCountry = allCountries.find(country => country.name.common === initialData.selectCountryName );
    UiAction.saveVisitedCountries(foundCountry);
    // UI.showTableVisitedDataCountries(tableInformationOfCountries);

    if (initialData.selectCountryName) {
        try {
            initialData.citiesSelectedCountry = await API.fetchApiCitiesByCountry(initialData.selectCountryName);

            const foundCountry = allCountries.find(country => country.name.common === initialData.selectCountryName);
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
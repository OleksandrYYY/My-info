import { saveVisitedCountries } from "./saveVisitedCountries.js";
import { showTableResults } from "./showTableResults.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";

export async function handlerSelectCountry(initialData, event) {
    
    const {
        elemInputCityName,
        conditionWeatherCity,
        tableInformationOfCountries,
        selectCity,
        defaultOptionCity,
        allCountries
    } = initialData;
    
    initialData.selectCountryName = event.target.value;
    elemInputCityName.disabled = false;
    conditionWeatherCity.innerHTML = "";

    const foundCountry = allCountries.find(country => country.name.common === initialData.selectCountryName );
    saveVisitedCountries(foundCountry);
    showTableResults(tableInformationOfCountries);

    if (initialData.selectCountryName) {
        try {
            initialData.citiesSelectedCountry = await fetchApiCitiesByCountry(initialData.selectCountryName);

            const foundCountry = allCountries.find(country => country.name.common === initialData.selectCountryName);
            let countryCode = "en";

            if (foundCountry && foundCountry.languages) {
                const languagesKeys = Object.keys(foundCountry.languages);
                    
                if (languagesKeys.length > 0) {
                    const firstLanguageCode = languagesKeys[0];
                    countryCode = firstLanguageCode.slice(0,2);
                };
            };

            showListCities(initialData.citiesSelectedCountry, initialData, countryCode);
            selectCity.disabled = false;
            return initialData.citiesSelectedCountry;
        } catch (error) {
            console.error("Помилка при завантаженні міст:", error);
        };
    };
};
import { saveVisitedCountries } from "./saveVisitedCountries.js";
import { showTableResults } from "./showTableResults.js";
import { fetchApiCitiesByCountry } from "./fetchApiCitiesByCountry.js";
import { showListCities } from "./showListCities.js";

export async function handlerSelectCountry(event, selectCountryName, elemInputCityName, conditionWeatherCity, allCountries, tableInformationOfCountries, citiesSelectedCountry, selectCity, defaultOptionCity) {
    selectCountryName = event.target.value;
    elemInputCityName.disabled = false;
    conditionWeatherCity.innerHTML = "";

    const foundCountry = allCountries.find(country => country.name.common === selectCountryName );
    saveVisitedCountries(foundCountry);
    showTableResults(tableInformationOfCountries);

    if (selectCountryName) {
        try {
            citiesSelectedCountry = await fetchApiCitiesByCountry(selectCountryName);

            const foundCountry = allCountries.find(country => country.name.common === selectCountryName);
            let countryCode = "en";

            if (foundCountry && foundCountry.languages) {
                const languagesKeys = Object.keys(foundCountry.languages);
                    
                if (languagesKeys.length > 0) {
                    const firstLanguageCode = languagesKeys[0];
                    countryCode = firstLanguageCode.slice(0,2);
                };
            };

            showListCities(citiesSelectedCountry, selectCity, defaultOptionCity, countryCode);
            selectCity.disabled = false;
            return citiesSelectedCountry;
        } catch (error) {
            console.error("Помилка при завантаженні міст:", error);
        };
    };
};

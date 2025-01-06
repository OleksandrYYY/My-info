import * as UI from "../UI/index.js";

export async function fetchApiGetCountries(initialData, allCountries) {
    const { selectCountry, selectCity } = initialData;
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        allCountries = await response.json();
    
        UI.showListCountries(allCountries, selectCountry);      
        selectCity.disabled = true;

        return allCountries;
    } catch (error) {
        console.error("Список країн не знайдений:", error);
    };
};

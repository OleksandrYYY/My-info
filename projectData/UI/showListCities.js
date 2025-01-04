import * as UiAction from "../UiAction/index.js";

export function showListCities(citiesSelectedCountry, initialData, countryCode = "en") {
    const { selectCity, defaultOptionCity } = initialData;
    selectCity.innerHTML = "";
    selectCity.append(defaultOptionCity);
    console.log(citiesSelectedCountry);

    const cleanCitiesDiacritics = citiesSelectedCountry.map((city) => {
        return UiAction.removeDiacritics(city);
    });

    const sortCities = cleanCitiesDiacritics.sort((a, b) => {
        return a.localeCompare(b, countryCode);
    });

    sortCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        selectCity.append(option);
    });
};

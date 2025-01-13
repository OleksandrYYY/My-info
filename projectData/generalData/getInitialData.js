export function getInitialData() {
    const formWeather = document.querySelector("#form-weather");
    const elemInputCountryName = document.querySelector("#name-country");
    const elemInputCityName = document.querySelector("#name-city");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const defaultOptionCountry = document.querySelector("#default-option-country");
    const selectCity = document.querySelector("#select-city");
    const defaultOptionCity = document.querySelector("#default-option-city");
    const tableInformationOfCountries = document.querySelector("#all-info-countries");
    const blockInfoVisitedCountries = document.createElement("div");
    const tableInformationOfWeatherByDays = document.querySelector("#info-weather-days");
    const blockInfoAboutPlacesCity = document.createElement("div");
    const btnShowPlaces = document.createElement("button");
    const showBtnHideData = document.createElement("button");
    let allCountries = null;
    let citiesSelectedCountry = null;

    return {
        formWeather,
        elemInputCountryName,
        elemInputCityName,
        conditionWeatherCity,
        selectCountry,
        defaultOptionCountry,
        selectCity,
        defaultOptionCity,
        tableInformationOfCountries,
        blockInfoVisitedCountries,
        tableInformationOfWeatherByDays,
        blockInfoAboutPlacesCity,
        btnShowPlaces,
        showBtnHideData,
        allCountries,
        citiesSelectedCountry
    };
};

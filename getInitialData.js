export function getInitialData() {
    const formWeather = document.querySelector("#form-weather");
    const elemInputCountryName = document.querySelector("#name-country");
    const elemInputCityName = document.querySelector("#name-city");
    const conditionWeatherCity = document.createElement("div");
    const selectCountry = document.querySelector("#select-country");
    const selectCity = document.querySelector("#select-city");
    const defaultOptionCountry = document.querySelector("#default-option-country");
    const defaultOptionCity = document.querySelector("#default-option-city");
    const tableInformationOfCountries = document.querySelector("#all-info-countries");

    return {
        formWeather,
        elemInputCountryName,
        elemInputCityName,
        conditionWeatherCity,
        selectCountry,
        selectCity,
        defaultOptionCountry,
        defaultOptionCity,
        tableInformationOfCountries
    };
};

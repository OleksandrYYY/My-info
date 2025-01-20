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
    const btnHideData = document.createElement("button");
    const mapContainer = document.createElement("div");
    const stylesMap = [
        { id: "streets-v11", name: "Streets", url: "mapbox://styles/mapbox/streets-v11" },
        { id: "light-v10", name: "Light", url: "mapbox://styles/mapbox/light-v10" },
        { id: "dark-v10", name: "Dark", url: "mapbox://styles/mapbox/dark-v10" },
        { id: "satellite-v9", name: "Satellite", url: "mapbox://styles/mapbox/satellite-v9" },
        { id: "satellite-streets-v11", name: "Satellite Streets", url: "mapbox://styles/mapbox/satellite-streets-v11" },
        { id: "outdoors-v11", name: "Outdoors", url: "mapbox://styles/mapbox/outdoors-v11" }
    ];
    const createSelectStylesMap = document.createElement("select");
    const defOptionStyleMap = document.createElement("option");
    let map = null;
    let markers = [];
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
        btnHideData,
        mapContainer,
        stylesMap,
        createSelectStylesMap,
        defOptionStyleMap,
        map,
        markers,
        allCountries,
        citiesSelectedCountry
    };
};

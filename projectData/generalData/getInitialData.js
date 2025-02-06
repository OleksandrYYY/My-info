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
    const showBtnWeatherByDays = document.createElement("button");
    const showBtnHideData = document.createElement("button");
    const btnHideData = document.createElement("button");
    const mapContainer = document.createElement("div");
    const stylesMap = [
        { id: "streets-v11", name: "Streets-v11", url: "mapbox://styles/mapbox/streets-v11" },
        { id: "streets-v12", name: "Streets-v12", url: "mapbox://styles/mapbox/streets-v12" },
        { id: "light-v10", name: "Light", url: "mapbox://styles/mapbox/light-v10" },
        { id: "dark-v10", name: "Dark", url: "mapbox://styles/mapbox/dark-v10" },
        { id: "satellite-v9", name: "Satellite", url: "mapbox://styles/mapbox/satellite-v9" },
        { id: "satellite-streets-v11", name: "Satellite Streets", url: "mapbox://styles/mapbox/satellite-streets-v11" },
        { id: "outdoors-v11", name: "Outdoors", url: "mapbox://styles/mapbox/outdoors-v11" },
        { id: "navigation-day-v1", name: "Navigation Day", url: "mapbox://styles/mapbox/navigation-day-v1" },
        { id: "navigation-night-v1", name: "Navigation Night", url: "mapbox://styles/mapbox/navigation-night-v1" }
    ];
    const createSelectStylesMap = document.createElement("select");
    const defOptionStyleMap = document.createElement("option");
    const containerLayerInfo = document.createElement("div");
    let map = null;
    let markers = [];
    let startMarker = null;
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
        showBtnWeatherByDays,
        showBtnHideData,
        btnHideData,
        mapContainer,
        stylesMap,
        createSelectStylesMap,
        defOptionStyleMap,
        containerLayerInfo,
        map,
        markers,
        startMarker,
        allCountries,
        citiesSelectedCountry
    };
};

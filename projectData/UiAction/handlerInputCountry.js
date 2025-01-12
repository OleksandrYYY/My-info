import * as UI from "../UI/index.js";

export function handlerInputCountry(initialData, event) {
    
    const {
        selectCountry,
        defaultOptionCountry,
        conditionWeatherCity,
        selectCity,
        defaultOptionCity,
        elemInputCityName,
        formWeather,
        allCountries,
        tableInformationOfCountries,
        tableInformationOfWeatherByDays,
        showBtnHideData,
        btnShowPlaces,
        blockInfoAboutPlacesCity
    } = initialData;
    
    const inputCountryName = event.target.value.trim().toLowerCase();
    selectCountry.innerHTML = "";
    selectCountry.append(defaultOptionCountry);
    conditionWeatherCity.innerHTML = "";
    
    if (inputCountryName === "") {
        UI.showListCountries(allCountries, selectCountry);
        tableInformationOfWeatherByDays.style.display = "none";
        tableInformationOfCountries.style.display = "none";
        showBtnHideData.style.display = "none";
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);
        selectCity.disabled = true;
        elemInputCityName.disabled = true;
        btnShowPlaces.style.display = "none";
        blockInfoAboutPlacesCity.innerHTML = "";
    } else {
        UI.getFilterResult(allCountries, inputCountryName, {
            selectElem: selectCountry,
            conditionWeatherCity,
            formWeather,
            isCountry: true
        });
        tableInformationOfWeatherByDays.style.display = "none";
        tableInformationOfCountries.style.display = "none";
        showBtnHideData.style.display = "none";
        elemInputCityName.value = "";
        selectCity.innerHTML = "";
        selectCity.append(defaultOptionCity);
        selectCity.disabled = true;
        elemInputCityName.disabled = true;
        btnShowPlaces.style.display = "none";
        blockInfoAboutPlacesCity.innerHTML = "";
    };
};

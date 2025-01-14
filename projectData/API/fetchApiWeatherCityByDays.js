import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import { API_BASE_URL } from "../generalData/constants.js";
import { API_KEY } from "../generalData/constants.js";

export function fetchApiWeatherCityByDays(initialData) {

    const {
        formWeather,
        conditionWeatherCity,
        selectCity,
        tableInformationOfCountries,
        tableInformationOfWeatherByDays,
        blockInfoAboutPlacesCity,
        btnShowPlaces,
        showBtnHideData,
        btnHideData
    } = initialData;

    UiAction.handlerEvents(selectCity, "change", async(event) => {
        const showBtnWeatherByDays = document.createElement("button");
        showBtnWeatherByDays.textContent = "Показати погоду на 3 дні";
        showBtnHideData.textContent = "Сховати дані";
        const selectCityName = event.target.value;
        UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, showBtnHideData, btnHideData]);
        blockInfoAboutPlacesCity.innerHTML = "";

        tableInformationOfCountries.after(btnShowPlaces);
        btnShowPlaces.after(blockInfoAboutPlacesCity);

        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${selectCityName}&days=3`);
                const dataResponse = await response.json();

                UiAction.displayElements([blockInfoAboutPlacesCity, btnShowPlaces]);
                // tableInformationOfCountries.after(btnShowPlaces);
                // btnShowPlaces.after(blockInfoAboutPlacesCity);
                UI.getDataWeatherCity(dataResponse, conditionWeatherCity, formWeather);
                conditionWeatherCity.append(showBtnWeatherByDays);

                UiAction.handlerEvents(showBtnWeatherByDays, "click", () => {
                    showBtnHideData.style.display = "inline-block";
                    conditionWeatherCity.after(tableInformationOfWeatherByDays);
                    UI.showTableWeatherByDays(tableInformationOfWeatherByDays, dataResponse);
                    showBtnWeatherByDays.after(showBtnHideData);

                    UiAction.handlerEvents(showBtnHideData, "click", () => {
                        tableInformationOfWeatherByDays.style.display = "none";
                        showBtnHideData.remove();
                    })
                });
            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
};

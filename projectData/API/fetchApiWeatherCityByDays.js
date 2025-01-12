import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import { API_BASE_URL } from "../generalData/constants.js";
import { API_KEY } from "../generalData/constants.js";

export function fetchApiWeatherCityByDays(initialData) {

    const {
        selectCity,
        conditionWeatherCity,
        formWeather,
        tableInformationOfWeatherByDays,
        tableInformationOfCountries,
        showBtnHideData,
        blockInfoAboutPlacesCity,
        btnShowPlaces
    } = initialData;

    UiAction.handlerEvents(selectCity, "change", async(event) => {
        tableInformationOfWeatherByDays.style.display = "none";
        tableInformationOfCountries.style.display = "none";
        showBtnHideData.style.display = "none";
        // тут
        blockInfoAboutPlacesCity.innerHTML = "";
        // тут
        const showBtnWeatherByDays = document.createElement("button");
        showBtnWeatherByDays.textContent = "Показати погоду на 3 дні";

        showBtnHideData.textContent = "Сховати дані";

        const selectCityName = event.target.value;

        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${selectCityName}&days=3`);
                const dataResponse = await response.json();
                blockInfoAboutPlacesCity.style.display = "block";

                tableInformationOfCountries.after(btnShowPlaces);
                btnShowPlaces.style.display = "block";
                btnShowPlaces.after(blockInfoAboutPlacesCity);

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
                // UiAction.handlerEvents(btnShowPlaces, "click", async() => {
                //     try {
                //         await UiAction.getListPlaces(selectCityName, blockInfoAboutPlacesCity);
                //     } catch (error) {
                //         console.error("Не отримано списка місць!", error);
                //     };
                // });

            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
};

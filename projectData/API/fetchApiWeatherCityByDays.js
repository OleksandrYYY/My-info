import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import { API_BASE_URL } from "../generalData/constants.js";
import { API_KEY } from "../generalData/constants.js";

export function fetchApiWeatherCityByDays(selectCity, conditionWeatherCity, formWeather, tableInformationOfWeatherByDays) {

    UiAction.handlerEvents(selectCity, "change", async(event) => {
        tableInformationOfWeatherByDays.style.display = "none";
        const showBtnWeatherByDays = document.createElement("button");
        showBtnWeatherByDays.textContent = "Показати погоду на 3 дні";

        const a = document.createElement("button");
        a.textContent = "Сховати дані";

        const selectCityName = event.target.value;

        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${selectCityName}&days=3`);
                const dataResponse = await response.json();

                UI.getDataWeatherCity(dataResponse, conditionWeatherCity, formWeather);
                conditionWeatherCity.append(showBtnWeatherByDays);

                UiAction.handlerEvents(showBtnWeatherByDays, "click", (event) => {
                    event.preventDefault();
                    UI.showTableWeatherByDays(tableInformationOfWeatherByDays, dataResponse);
                    showBtnWeatherByDays.after(a);

                    UiAction.handlerEvents(a, "click", (event) => {
                        event.preventDefault();
                        tableInformationOfWeatherByDays.style.display = "none";
                        a.remove();
                    })
                });

            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
};

import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import { API_BASE_URL } from "../generalData/constants.js";
import { API_KEY } from "../generalData/constants.js";

export function fetchApiWeatherCity(selectCity, conditionWeatherCity, formWeather) {

    UiAction.handlerEvents(selectCity, "change", async(event) => {
        const selectCityName = event.target.value;
        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${selectCityName}`);
                const dataWeatherCity = await response.json();

                if (dataWeatherCity.error) {
                    console.error("API Error:", dataWeatherCity.error.message);
                    return;
                };

                UI.getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather);
            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
};

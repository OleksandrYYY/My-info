import { handlerEvents } from "./handlerEvents.js";
import { getDataWeatherCity } from "./getDataWeatherCity.js";
import { API_BASE_URL } from "./constants.js";
import { API_KEY } from "./constants.js";

export function fetchApiWeatherCity(selectCity, selectCountryName, conditionWeatherCity, formWeather) {

    handlerEvents(selectCity, "change", async(event) => {
        const selectCityName = event.target.value;
        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${selectCityName}&q=${selectCountryName}`);
                const dataWeatherCity = await response.json();
                console.log(dataWeatherCity);
                getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather);
            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
}
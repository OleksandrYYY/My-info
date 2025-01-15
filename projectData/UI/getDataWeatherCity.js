import { API_KEY_MAPBOX } from "../generalData/constants.js";

export function getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather) {
    const {current, location} = dataWeatherCity;
    
    conditionWeatherCity.innerHTML = `
        <h2>Дані про погоду в реальному часі:</h2>
        <h3>Погода в <b>${location.name}</b>, <b>${location.country}</b></h3>
        <p><strong>Температура:</strong> ${current.temp_c}°C</p>
        <p><strong>Стан погоди:</strong> ${current.condition.text}</p>
        <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
        <p><strong>Відчувається як:</strong> ${current.feelslike_c}°C</p>
        <p><strong>Вологість:</strong> ${current.humidity}%</p>
        <p><strong>Швидкість вітру:</strong> ${current.wind_kph} км/год</p>
    `;
    formWeather.after(conditionWeatherCity);

    const mapContainer = document.createElement("div");
    mapContainer.id = "mapContainer";
    mapContainer.style.width = "700px";
    mapContainer.style.height = "500px";
    conditionWeatherCity.append(mapContainer);

    mapboxgl.accessToken = API_KEY_MAPBOX;

    const map = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [location.lon, location.lat],
        zoom: 8,
    });

    new mapboxgl.Marker()
        .setLngLat([location.lon, location.lat])
        .addTo(map);
};

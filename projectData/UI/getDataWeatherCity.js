import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function getDataWeatherCity(dataWeatherCity, initialData) {
    const {current, location} = dataWeatherCity;
    const {
        formWeather,
        conditionWeatherCity,
        blockInfoAboutPlacesCity,
        mapContainer,
        map
    } = initialData;
    
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

    let center = [0, 0];
    const lat = location.lat;
    const lng = location.lon;
    center = [lng, lat];

    if(!map) {
        initialData.map = UI.initializeMap(mapContainer, blockInfoAboutPlacesCity, center, 10);
        const marker = new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(initialData.map);

        initialData.markers.push(marker);
    } else {
        initialData.markers.forEach(marker => marker.remove());
        initialData.markers.length = 0;

        map.setCenter(center);
        map.setZoom(10);

        const marker = new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(map);

        initialData.markers.push(marker);
    };

    UI.showStylesOfMap(initialData);
};
export function getDataWeatherCity(dataWeatherCity, conditionWeatherCity, formWeather) {
    const {current, location} = dataWeatherCity;
    
    conditionWeatherCity.innerHTML = `
        <h2>Погода в ${location.name}, ${location.country}</h2>
        <p><strong>Температура:</strong> ${current.temp_c}°C</p>
        <p><strong>Стан погоди:</strong> ${current.condition.text}</p>
        <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
        <p><strong>Відчувається як:</strong> ${current.feelslike_c}°C</p>
        <p><strong>Вологість:</strong> ${current.humidity}%</p>
        <p><strong>Швидкість вітру:</strong> ${current.wind_kph} км/год</p>
    `;
    formWeather.append(conditionWeatherCity);
};

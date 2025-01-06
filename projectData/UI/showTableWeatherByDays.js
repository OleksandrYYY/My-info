export function showTableWeatherByDays(tableInformationOfWeatherByDays, dataResponse) {
    tableInformationOfWeatherByDays.style.display = "table";
    const thead = tableInformationOfWeatherByDays.querySelector("thead");
    const tbody = tableInformationOfWeatherByDays.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";

    const trDate = document.createElement("tr");
    const trDataDate = document.createElement("tr");

    const forecastday = dataResponse.forecast.forecastday;
    
    forecastday.forEach((day) => {
        const thDay = document.createElement("th");
        thDay.textContent = day.date;

        const thDataDay = document.createElement("th");
        thDataDay.innerHTML = 
        `
            Максимальна температура: ${day.day.maxtemp_c} °C <br>
            Мінімальна температура: ${day.day.mintemp_c} °C <br>
            Середня температура: ${day.day.avgtemp_c} °C <br>
            Швидкість вітру: ${day.day.maxwind_kph} км/год <br>
            Вологість: ${day.day.avghumidity}% <br>
            Схід сонця: ${day.astro.sunrise} <br>
            Захід сонця: ${day.astro.sunset} <br>
            УФ-індекс: ${day.day.uv} <br>
        `
        trDate.append(thDay);
        trDataDate.append(thDataDay);
    });
    thead.append(trDate);
    tbody.append(trDataDate);
};

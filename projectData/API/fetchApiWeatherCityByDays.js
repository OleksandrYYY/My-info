import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import { API_BASE_URL } from "../generalData/constants.js";
import { API_KEY } from "../generalData/constants.js";

export function fetchApiWeatherCityByDays(initialData) {

    const {
        conditionWeatherCity,
        selectCity,
        tableInformationOfCountries,
        tableInformationOfWeatherByDays,
        blockInfoAboutPlacesCity,
        btnShowPlaces,
        showBtnWeatherByDays,
        showBtnHideData,
        btnHideData,
        mapContainer,
        createSelectStylesMap
    } = initialData;

    UiAction.handlerEvents(selectCity, "change", async(event) => {
        showBtnWeatherByDays.textContent = "Показати погоду на 3 дні";
        showBtnHideData.textContent = "Сховати дані";
        
        const selectCityName = event.target.value;
        UiAction.hideElements([tableInformationOfCountries, tableInformationOfWeatherByDays, showBtnHideData, btnHideData]);
        UiAction.clearElements([blockInfoAboutPlacesCity, createSelectStylesMap]);

        tableInformationOfCountries.after(btnShowPlaces);
        btnShowPlaces.after(blockInfoAboutPlacesCity);

        if (initialData.map) {
            if (initialData.map.getLayer("route")) {
                initialData.map.removeLayer("route");
            };
            if (initialData.map.getSource("route")) {
                initialData.map.removeSource("route");
            };
        };

        if (selectCityName) {
            try {
                const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${selectCityName}&days=3`);
                const dataResponse = await response.json();

                UiAction.displayElements([blockInfoAboutPlacesCity, btnShowPlaces]);

                mapContainer.style.display = "block";
                createSelectStylesMap.style.display = "inline-block";
                
                UI.getDataWeatherCity(dataResponse, initialData);
                conditionWeatherCity.append(showBtnWeatherByDays);

                UiAction.handlerEvents(showBtnWeatherByDays, "click", () => {
                    showBtnHideData.style.display = "inline-block";
                    conditionWeatherCity.after(tableInformationOfWeatherByDays);
                    UI.showTableWeatherByDays(tableInformationOfWeatherByDays, dataResponse);
                    showBtnWeatherByDays.after(showBtnHideData);

                    UiAction.handlerEvents(showBtnHideData, "click", () => {
                        tableInformationOfWeatherByDays.style.display = "none";
                        showBtnHideData.remove();
                    });
                });
            } catch (error) {
                console.error("Сталася помилка:", error);
            };
        };
    });
};

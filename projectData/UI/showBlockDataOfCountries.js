import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function showBlockDataOfCountries(tableInformationOfCountries, formWeather, blockInfoVisitedCountries, showBtnHideData, blockInfoAboutPlacesCity, btnShowPlaces) {
    const showBtnHere = document.createElement("button");
    showBtnHere.textContent = "Тут";

    const showContent = document.createElement("p");
    showContent.textContent = `Якщо ви хочете отримати дані про відвідувані країни, натисніть `;

    showBtnHideData.textContent = "Сховати дані";

    tableInformationOfCountries.style.display = "none";
    showContent.append(showBtnHere);
    formWeather.after(blockInfoVisitedCountries);
    blockInfoVisitedCountries.append(showContent);
    
    UiAction.handlerEvents(showBtnHere, "click", () => {
        const visitedCountries = JSON.parse(localStorage.getItem("countries")) || [];
        showBtnHideData.style.display = "block";
        if (visitedCountries.length === 0) {
            console.log("Ви не обрали ще ні одну країну");
            return;
        } else {
            showContent.after(showBtnHideData);
            UI.showTableVisitedDataCountries(tableInformationOfCountries);

            UiAction.handlerEvents(showBtnHideData, "click", () => {
                tableInformationOfCountries.style.display = "none";
                showBtnHideData.remove();
            });
        };
    });
};

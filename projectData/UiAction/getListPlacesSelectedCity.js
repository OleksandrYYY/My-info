import * as API from "../API/index.js";
import * as UI from "../UI/index.js";

export async function getListPlacesSelectedCity(selectCityName, blockInfoAboutPlacesCity, tableInformationOfCountries, initialData) {
    try {
        const dataPlaces = await API.fetchApiPlacesCity(selectCityName);
        UI.showListOfPlacesSelectedCity(dataPlaces, blockInfoAboutPlacesCity, tableInformationOfCountries, initialData);
    } catch (error) {
        console.error("При отриманні даних з сервера, сталася помилка", error);
    };
};

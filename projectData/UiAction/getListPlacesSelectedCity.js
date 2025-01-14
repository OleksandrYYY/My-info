import * as API from "../API/index.js";
import * as UI from "../UI/index.js";

export async function getListPlacesSelectedCity(selectCityName, blockInfoAboutPlacesCity, tableInformationOfCountries) {
    try {
        const dataPlaces = await API.fetchApiPlacesCity(selectCityName);
        console.log(dataPlaces);
        UI.showListOfPlacesSelectedCity(dataPlaces, blockInfoAboutPlacesCity, tableInformationOfCountries);
    } catch (error) {
        console.error("При отриманні даних з сервера, сталася помилка", error);
    };
};

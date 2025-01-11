import * as API from "../API/index.js";
import * as UI from "../UI/index.js";

export async function getListPlaces(selectCityName, blockInfoAboutPlacesCity) {
    try {
        const places = await API.fetchApiPlaces(selectCityName);
        console.log(places);
        UI.showCategoriesOfPlaces(places, blockInfoAboutPlacesCity);
    } catch (error) {
        console.error("При отриманні даних з сервера, сталася помилка", error);
    };
};

import { API_KEY_PLACES } from "../generalData/constants.js";
import { API_URL_PLACES } from "../generalData/constants.js";

export async function fetchApiPlacesCity(cityName) {
    const url = `${API_URL_PLACES}?near=${cityName}&limit=30`;
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API_KEY_PLACES
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.results || [];
    } catch (error) {
        console.error("Помилка при отриманні місць із Foursquare:", error);
        return [];
    }
};

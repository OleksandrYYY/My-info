import { API_KEY_PLACES } from "../generalData/constants.js";
import { API_URL_PLACES } from "../generalData/constants.js";

export async function fetchApiPlaces(cityName) {
    // const url = new URL("https://api.foursquare.com/v3/places/search");
    // url.searchParams.append("near", cityName);
    // url.searchParams.append("limit", "20");
    const url = `${API_URL_PLACES}?near=${cityName}&limit=20`;
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
        console.log("Foursquare data:", data);
        return data.results || [];
    } catch (error) {
        console.error("Помилка при отриманні місць із Foursquare:", error);
        return [];
    }
};

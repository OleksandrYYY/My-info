import { API_GEONAMES_USERNAME } from "../generalData/constants.js";

export async function fetchApiGetCityCoords(cityName, countryCode) {
    const username = API_GEONAMES_USERNAME;
    const url = `http://api.geonames.org/searchJSON
    ?name=${encodeURIComponent(cityName)}
    &country=${countryCode}
    &maxRows=1
    &username=${username}`.replace(/\s/g, '');
    // ?name_equals=${encodeURIComponent(cityName)}

    try {
        const response = await fetch(url);
        const data = await response.json();
        const infoCity = data.geonames[0];

        return {
            city: cityName,
            lat: parseFloat(infoCity.lat),
            lng: parseFloat(infoCity.lng)
        };
    } catch (error) {
        console.error(error);
    };
};

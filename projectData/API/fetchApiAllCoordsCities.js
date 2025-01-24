import * as API from "../API/index.js";

export async function fetchApiAllCoordsCities(cities, countryCCA2) {
    const results = [];
    for (const cityName of cities) {
        try {
            const cityInfo = await API.fetchApiGetCityCoords(cityName, countryCCA2);
            console.log(cityInfo);

            if (cityInfo) {
                results.push(cityInfo);
            };
        } catch (error) {
            console.error("Помилка координат міста:", cityName, error);
        };
    };
    return results;
};

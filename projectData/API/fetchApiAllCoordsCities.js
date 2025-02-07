import * as API from "../API/index.js";

export async function fetchApiAllCoordsCities(cities, countryCCA2, onProgress) {
    const results = [];
    let total = cities.length;
    let current = 0;

    for (const cityName of cities) {
        try {
            const cityInfo = await API.fetchApiGetCityCoords(cityName, countryCCA2);

            if (cityInfo) {
                results.push(cityInfo);
            };
        } catch (error) {
            console.error("Помилка координат міста:", cityName, error);
        };

        current++;
        if (onProgress) {
            let percent = Math.floor((current / total) * 100);
            onProgress(percent);
        };
    };

    return results;
};

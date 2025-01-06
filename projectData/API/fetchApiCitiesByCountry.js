export async function fetchApiCitiesByCountry(countryName) {
    const url = 'https://countriesnow.space/api/v0.1/countries/cities';
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ country: countryName })
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! статус: ${response.status}`);
        };

        const dataCities = await response.json();
        return dataCities.data;
    } catch (error) {
        console.error("Помилка:", error);
    };
};

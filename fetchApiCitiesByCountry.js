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
        console.log(dataCities);

        return dataCities.data;
    } catch (error) {
        console.error("Помилка:", error);
    };
};




//     const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/cities`;
//     const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'a0998dcf88mshea1f13a87337751p1e17f9jsna8526f3ba791',
// 		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
//     return result.data;
// } catch (error) {
// 	console.error(error);
// }
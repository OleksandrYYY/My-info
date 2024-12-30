export function saveVisitedCountries(foundCountry) {
    let visitedCountries = JSON.parse(localStorage.getItem("countries")) || [];

    const thisCountryVisited = visitedCountries.find(country => country.locale === foundCountry.cca2);

    if (!thisCountryVisited) {
        visitedCountries.push({
            nameCountry: foundCountry.name.common,
            capital: foundCountry.capital,
            locale: foundCountry.cca2,
            population: foundCountry.population,
            borders: foundCountry.borders
        });
        localStorage.setItem("countries", JSON.stringify(visitedCountries));
    } else {
        console.log("Країна вже збережена:", foundCountry.name.common);
    };
};

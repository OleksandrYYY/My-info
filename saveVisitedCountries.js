export function saveVisitedCountries(foundCountry, visitedCountries) {
    visitedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    console.log(visitedCountries);

    const thisCountryVisited = visitedCountries.find(country => country.locale === foundCountry.cca2);

    if (!thisCountryVisited) {
        visitedCountries.push({
            capital: foundCountry.capital,
            locale: foundCountry.cca2
        });
        localStorage.setItem("countries", JSON.stringify(visitedCountries));
    };
};


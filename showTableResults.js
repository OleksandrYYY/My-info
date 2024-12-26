export function showTableResults(tableInformationOfCountries) {
    let visitedCountries = JSON.parse(localStorage.getItem("countries")) || [];

    const tbody = tableInformationOfCountries.querySelector("tbody");
    tbody.innerHTML = "";

    if (visitedCountries.length === 0) {
        console.log("Переглянутих країн немає.");
        return;
    }

    visitedCountries.forEach(country => {
        const tableRowElem = document.createElement("tr");

        const infoAboutNameCountry = document.createElement("td");
        infoAboutNameCountry.textContent = country.nameCountry;
        tableRowElem.append(infoAboutNameCountry);

        const infoAboutCapital = document.createElement("td");
        infoAboutCapital.textContent = country.capital;
        tableRowElem.append(infoAboutCapital);

        const infoAboutCodeCountry = document.createElement("td");
        infoAboutCodeCountry.textContent = country.locale;
        tableRowElem.append(infoAboutCodeCountry);

        const infoAboutPopulationCountry = document.createElement("td");
        infoAboutPopulationCountry.textContent = country.population;
        tableRowElem.append(infoAboutPopulationCountry);

        const infoAboutNeighboursCountry = document.createElement("td");
        infoAboutNeighboursCountry.textContent = country.borders || "Немає";
        tableRowElem.append(infoAboutNeighboursCountry);

        tbody.append(tableRowElem);
    });
};

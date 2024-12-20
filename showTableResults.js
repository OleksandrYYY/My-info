export function showTableResults(tableInformationOfCountries, foundCountry) {
    const tableRowElem = document.createElement("tr");

    const infoAboutNameCountry = document.createElement("th");
    infoAboutNameCountry.textContent = foundCountry.name.common;
    tableRowElem.append(infoAboutNameCountry);

    const infoAboutCapital = document.createElement("th");
    infoAboutCapital.textContent = foundCountry.capital;
    tableRowElem.append(infoAboutCapital);

    const infoAboutCodeCountry = document.createElement("th");
    infoAboutCodeCountry.textContent = foundCountry.cca2;
    tableRowElem.append(infoAboutCodeCountry);

    const infoAboutPopulationCoutry = document.createElement("th");
    infoAboutPopulationCoutry.textContent = foundCountry.population;
    tableRowElem.append(infoAboutPopulationCoutry);

    const infoAboutNeighboursCountry = document.createElement("th");
    infoAboutNeighboursCountry.textContent = foundCountry.borders;
    tableRowElem.append(infoAboutNeighboursCountry);

    tableInformationOfCountries.append(tableRowElem);
};

export function showTableVisitedDataCountries(tableInformationOfCountries) {
    let visitedCountries = JSON.parse(localStorage.getItem("countries")) || [];

    const tbody = tableInformationOfCountries.querySelector("tbody");
    tbody.innerHTML = "";

    if (visitedCountries.length === 0) {
        tableInformationOfCountries.style.display = "none";
        return;
    } else {
        tableInformationOfCountries.style.display = "table-caption";
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

        // visitedCountries.forEach(({ nameCountry, capital, locale, population, borders }) => {
        //     const tableRowElem = document.createElement("tr");
        
        //     // Формуємо масив зі значеннями, які потрібно вивести
        //     const fields = [nameCountry, capital, locale, population, borders || "Немає"];
        
        //     // Для кожного елемента масиву створюємо <td> і додаємо до рядка
        //     fields.forEach((field) => {
        //         const cell = document.createElement("td");
        //         cell.textContent = field;
        //         tableRowElem.append(cell);
        //     });
        
        //     // Додаємо сформований рядок до <tbody>
        //     tbody.append(tableRowElem);
        // });
    };
};

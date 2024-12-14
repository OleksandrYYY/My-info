export function showListCountries(allCountries, selectCountry) {
    
    const sortCountries = allCountries.sort((a, b) => {
        // return a.name.common.localeCompare(b.name.common, 'uk');
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
    });

    sortCountries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        selectCountry.append(option);
    });
};

export function showListCountries(allCountries, selectCountry) {
    // selectCountry.innerHTML = "";
    // selectCountry.append(defaultOptionCountry);

    // const sortCountries = allCountries.sort((a, b) => {
    //     if (a.name.common < b.name.common) return -1;
    //     if (a.name.common > b.name.common) return 1;
    //     return 0;
    // });
    const sortCountries = allCountries.sort((a, b) => {
        return a.name.common.localeCompare(b.name.common, 'en');
    });

    sortCountries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        selectCountry.append(option);
    });
    console.log(sortCountries);
};

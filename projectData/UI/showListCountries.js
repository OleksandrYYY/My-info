export function showListCountries(allCountries, selectCountry) {
    const sortCountries = allCountries.sort((a, b) => {
        return a.name.common.localeCompare(b.name.common, 'en');
    });
    
    sortCountries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        // тут скоріш за все велью змінити на сса2
        option.textContent = country.name.common;
        selectCountry.append(option);
    });
};

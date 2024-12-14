export function showListCities(citiesSelectedCountry, selectCity) {
    const defaultOption = document.querySelector("#default-option-city");
    selectCity.innerHTML = "";
    selectCity.append(defaultOption);
    console.log(citiesSelectedCountry);
    
    const sortCities = citiesSelectedCountry.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
        // return a.localeCompare(b, "af");
    });

    sortCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        selectCity.append(option);
    });
};

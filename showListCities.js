export function showListCities(citiesSelectedCountry, initialData, countryCode = "en") {
    const { selectCity, defaultOptionCity } = initialData;
    selectCity.innerHTML = "";
    selectCity.append(defaultOptionCity);
    console.log(citiesSelectedCountry);
    
    const sortCities = citiesSelectedCountry.sort((a, b) => {
        // if (a < b) return -1;
        // if (a > b) return 1;
        // return 0;
        return a.localeCompare(b, countryCode);
    });

    sortCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        selectCity.append(option);
    });
};

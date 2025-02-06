export function getFilterResult(arrayOfElements, inputValue, options) {
    const {
        selectElem,
        conditionWeatherCity = null,
        formWeather = null,
        isCountry = false
    } = options;

    const filterElements = arrayOfElements.filter((elem) => {
        if (isCountry) {
            return elem.name.common.toLowerCase().startsWith(inputValue.toLowerCase());
        } else {
            return elem.toLowerCase().startsWith(inputValue.toLowerCase());
        };
    });

    if (filterElements.length > 0) {
        conditionWeatherCity.innerHTML = "";
        filterElements.forEach((element) => {
            const option = document.createElement("option");
            if (isCountry) {
                option.value = element.name.common;
                option.textContent = element.name.common;
            } else {
                option.value = element;
                option.textContent = element;
            };
            selectElem.append(option);
        });
    } else {
        formWeather.append(conditionWeatherCity);
        conditionWeatherCity.innerHTML = `<p>Такої назви ${inputValue} не існує в списку.</p>`;
    };
};
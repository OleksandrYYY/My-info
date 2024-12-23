// export function getFilterResult(arrayOfElements, inputValue, selectElem, formWeather, conditionWeatherCity, isCountry = false) {
//     const filterCities = arrayOfElements.filter((elem) => {
//         if (isCountry) {
//             return elem.name.common.toLowerCase().startsWith(inputValue.toLowerCase());
//         } else {
//             return elem.toLowerCase().startsWith(inputValue.toLowerCase());
//         };
//     });


//     console.log(filterCities);

//     if (filterCities.length > 0) {
//         filterCities.forEach((element) => {
//             const option = document.createElement("option");
//             if (isCountry) {
//                 option.value = element.name.common;
//                 option.textContent = element.name.common;
//             } else {
//                 option.value = element;
//                 option.textContent = element;
//             };
//             selectElem.append(option);
//         });
//     } else {
//         formWeather.append(conditionWeatherCity)
//         conditionWeatherCity.innerHTML = `<p>Такої назви ${inputValue} не існує в списку.</p>`;
//     }
// };

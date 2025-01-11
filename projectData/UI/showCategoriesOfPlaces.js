export function showCategoriesOfPlaces(places, blockInfoAboutPlacesCity) {
    // blockInfoAboutPlacesCity.innerHTML = "";
    const ul = document.createElement("ul")
    places.forEach((place) => {
        const li = document.createElement("li");
        li.textContent = place.categories[0].name;
        ul.append(li);
    });
    blockInfoAboutPlacesCity.append(ul);
};

export function disableFields(elements, value) {
    elements.forEach((element) => {
        element.disabled = value;
    });
};

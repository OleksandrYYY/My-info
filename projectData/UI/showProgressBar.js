export function showProgressBar(container, bar, text) {
    container.style.display = "block";
    bar.style.width = "0%";
    text.textContent = "Завантаження 0%";
};

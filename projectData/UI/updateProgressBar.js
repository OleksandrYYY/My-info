export function updateProgressBar(bar, text, percent) {
    bar.style.width = percent + "%";
    text.textContent = percent + "%";
};

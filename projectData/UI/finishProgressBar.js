export function finishProgressBar(container, bar, text) {
    bar.style.width = "100%";
    text.textContent = "100%";
    setTimeout(() => {
      container.style.display = "none";
    }, 500);
};

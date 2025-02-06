export function getLayersInfo(containerLayerInfo) {
    containerLayerInfo.id = "containerLayerInfo";
    containerLayerInfo.innerHTML = "";

    const layersInfo = [
        { color: "#50C878", label: "Парки" },
        { color: "#6600FF", label: "Школи" },
        { color: "#DC143C", label: "Лікарні" },
        { color: "#A9A9A9", label: "Будівлі" }
    ];

    layersInfo.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "legend-item";

        const colorBox = document.createElement("span");
        colorBox.className = "legend-color";
        colorBox.style.backgroundColor = item.color;

        const label = document.createElement("span");
        label.textContent = item.label;

        itemDiv.append(colorBox, label);
        containerLayerInfo.append(itemDiv);
    });
};

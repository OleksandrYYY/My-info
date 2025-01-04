export function removeDiacritics(str) {
    // NFD розбиває символ із діакритикою на базову літеру + спецсимвол(и)
    // Потім видаляємо з рядка всі символи з діапазону U+0300–U+036F
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

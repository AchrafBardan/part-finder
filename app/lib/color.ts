const map = new Map<string, string>([
    ['Black', '#000000'],
    ['Blue', '#1E5AA8'],
    ['Chrome', '#D9D9D9'],
    ['Clear', '#F5FBFF'],
    ['Grey', '#808080'],
    ['Matte Black', '#1F1F1F'],
    ['Red', '#C62828'],
    ['Silver', '#C0C0C0'],
    ['Smoked', '#6B7280'],
    ['White', '#FFFFFF'],
]);

const getHexFromColorName = (colorName: string): string | null => {
    return map.get(colorName) ?? null;
}

export { getHexFromColorName };
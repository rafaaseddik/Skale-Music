export function ifClass(condition: boolean, className: string) {
    return condition ? className : "";
}
export function round(value: number, decimalPlaces: number = 0) {
    return Number(value.toFixed(decimalPlaces));
}
export function percentageString(value: number, decimalPlaces: number = 0) {
    return (value * 100).toFixed(decimalPlaces) + "%";
}

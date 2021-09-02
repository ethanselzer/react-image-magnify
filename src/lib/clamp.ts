/* eslint-disable no-nested-ternary */
export function clamp(value: number, min: number, max: number): number {
    return min < max
        ? (value < min ? min : value > max ? max : value)
        : (value < max ? max : value > min ? min : value);
}

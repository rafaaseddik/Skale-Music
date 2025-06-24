export enum DiatonicMode {
    IONIAN = 0,
    DORIAN = 1,
    PHRYGIAN = 2,
    LYDIAN = 3,
    MIXOLYDIAN = 4,
    AEOLIAN = 5,
}

export const ALL_DIATONIC_MODES = [
    DiatonicMode.IONIAN,
    DiatonicMode.DORIAN,
    DiatonicMode.PHRYGIAN,
    DiatonicMode.LYDIAN,
    DiatonicMode.MIXOLYDIAN,
    DiatonicMode.AEOLIAN
];

export const DIATONIC_MODE_NAMES = {
    [DiatonicMode.IONIAN]: "Ionian",
    [DiatonicMode.DORIAN]: "Dorian",
    [DiatonicMode.PHRYGIAN]: "Phrygian",
    [DiatonicMode.LYDIAN]: "Lydian",
    [DiatonicMode.MIXOLYDIAN]: "Mixolydian",
    [DiatonicMode.AEOLIAN]: "Aeolian",
}
export const IONIAN_MODE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
export const DORIAN_MODE_INTERVALS = [2, 1, 2, 2, 2, 1, 2];
export const PHRYGIAN_MODE_INTERVALS = [1, 2, 2, 2, 1, 2, 2];
export const LYDIAN_MODE_INTERVALS = [2, 2, 2, 1, 2, 2, 1];
export const MIXOLYDIAN_MODE_INTERVALS = [2, 2, 1, 2, 2, 1, 2];
export const AEOLIAN_MODE_INTERVALS = [2, 1, 2, 2, 1, 2, 2];
export const LOCRIAN_MODE_INTERVALS = [1, 2, 2, 1, 2, 2, 2];

export function getDiatonicModeIntervals(mode: DiatonicMode): number[] {
    const shift = mode;
    const rotated = IONIAN_MODE_INTERVALS
      .slice(shift)
      .concat(IONIAN_MODE_INTERVALS.slice(0, shift));
    return rotated;
}

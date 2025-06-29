export enum Chord{
    MAJOR=0,
    MINOR=1,
    DIMINISHED=2,
    AUGMENTED=3,
    SUSPENDED_SECOND=4,
    SUSPENDED_FOURTH=5,
    DOMINANT_SEVENTH=6,
    MAJOR_SEVENTH=7,
    MINOR_SEVENTH=8,
    DIMINISHED_SEVENTH=9,
    HALF_DIMINISHED_SEVENTH=10,
    AUGMENTED_SEVENTH=11,
    MINOR_MAJOR_SEVENTH=12,
    SIXTH=13,
    MINOR_SIXTH=14,
    NINTH=15,
    MINOR_NINTH=16,
    MAJOR_NINTH=17,
}
export const ALL_CHORDS: Chord[] = [
    Chord.MAJOR,
    Chord.MINOR,
    Chord.DIMINISHED,
    Chord.AUGMENTED,
    Chord.SUSPENDED_SECOND,
    Chord.SUSPENDED_FOURTH,
    Chord.DOMINANT_SEVENTH,
    Chord.MAJOR_SEVENTH,
    Chord.MINOR_SEVENTH,
    Chord.DIMINISHED_SEVENTH,
    Chord.HALF_DIMINISHED_SEVENTH,
    Chord.AUGMENTED_SEVENTH,
    Chord.MINOR_MAJOR_SEVENTH,
    Chord.SIXTH,
    Chord.MINOR_SIXTH,
    Chord.NINTH,
    Chord.MINOR_NINTH,
    Chord.MAJOR_NINTH,

]
export const CHORDS_NAMES: Record<Chord, string> = {
    [Chord.MAJOR]: "Major",
    [Chord.MINOR]: "Minor",
    [Chord.DIMINISHED]: "Diminished",
    [Chord.AUGMENTED]: "Augmented",
    [Chord.SUSPENDED_SECOND]: "Suspended Second",
    [Chord.SUSPENDED_FOURTH]: "Suspended Fourth",
    [Chord.DOMINANT_SEVENTH]: "Dominant Seventh",
    [Chord.MAJOR_SEVENTH]: "Major Seventh",
    [Chord.MINOR_SEVENTH]: "Minor Seventh",
    [Chord.DIMINISHED_SEVENTH]: "Diminished Seventh",
    [Chord.HALF_DIMINISHED_SEVENTH]: "Half Diminished Seventh",
    [Chord.AUGMENTED_SEVENTH]: "Augmented Seventh",
    [Chord.MINOR_MAJOR_SEVENTH]: "Minor Major Seventh",
    [Chord.SIXTH]: "Sixth",
    [Chord.MINOR_SIXTH]: "Minor Sixth",
    [Chord.NINTH]: "Ninth",
    [Chord.MINOR_NINTH]: "Minor Ninth",
    [Chord.MAJOR_NINTH]: "Major Ninth",
}

// Triads
export const MAJOR_CHORD_INTERVALS = [0, 4, 7];
export const MINOR_CHORD_INTERVALS = [0, 3, 7];
export const DIMINISHED_CHORD_INTERVALS = [0, 3, 6];
export const AUGMENTED_CHORD_INTERVALS = [0, 4, 8];

// Sevenths
export const MAJOR_SEVENTH_CHORD_INTERVALS = [0, 4, 7, 11];
export const MINOR_SEVENTH_CHORD_INTERVALS = [0, 3, 7, 10];
export const DOMINANT_SEVENTH_CHORD_INTERVALS = [0, 4, 7, 10];
export const DIMINISHED_SEVENTH_CHORD_INTERVALS = [0, 3, 6, 9];
export const HALF_DIMINISHED_SEVENTH_CHORD_INTERVALS = [0, 3, 6, 10];
export const AUGMENTED_SEVENTH_CHORD_INTERVALS = [0, 4, 8, 10];
export const MINOR_MAJOR_SEVENTH_CHORD_INTERVALS = [0, 3, 7, 11];

// Sixths
export const SIXTH_CHORD_INTERVALS = [0, 4, 7, 9];
export const MINOR_SIXTH_CHORD_INTERVALS = [0, 3, 7, 9];

// Extended chords (9ths, 11ths, 13ths)
export const NINTH_CHORD_INTERVALS = [0, 4, 7, 10, 14];          // Dominant 9th
export const MINOR_NINTH_CHORD_INTERVALS = [0, 3, 7, 10, 14];
export const MAJOR_NINTH_CHORD_INTERVALS = [0, 4, 7, 11, 14];

// Altered & Suspended
export const SUSPENDED_SECOND_CHORD_INTERVALS = [0, 2, 7];
export const SUSPENDED_FOURTH_CHORD_INTERVALS = [0, 5, 7];

export const CHORD_INTERVALS: Record<Chord, number[]> = {
    [Chord.MAJOR]: MAJOR_CHORD_INTERVALS,
    [Chord.MINOR]: MINOR_CHORD_INTERVALS,
    [Chord.DIMINISHED]: DIMINISHED_CHORD_INTERVALS,
    [Chord.AUGMENTED]: AUGMENTED_CHORD_INTERVALS,
    [Chord.SUSPENDED_SECOND]: SUSPENDED_SECOND_CHORD_INTERVALS,
    [Chord.SUSPENDED_FOURTH]: SUSPENDED_FOURTH_CHORD_INTERVALS,
    [Chord.DOMINANT_SEVENTH]: DOMINANT_SEVENTH_CHORD_INTERVALS,
    [Chord.MAJOR_SEVENTH]: MAJOR_SEVENTH_CHORD_INTERVALS,
    [Chord.MINOR_SEVENTH]: MINOR_SEVENTH_CHORD_INTERVALS,
    [Chord.DIMINISHED_SEVENTH]: DIMINISHED_SEVENTH_CHORD_INTERVALS,
    [Chord.HALF_DIMINISHED_SEVENTH]: HALF_DIMINISHED_SEVENTH_CHORD_INTERVALS,
    [Chord.AUGMENTED_SEVENTH]: AUGMENTED_SEVENTH_CHORD_INTERVALS,
    [Chord.MINOR_MAJOR_SEVENTH]: MINOR_MAJOR_SEVENTH_CHORD_INTERVALS,
    [Chord.SIXTH]: SIXTH_CHORD_INTERVALS,
    [Chord.MINOR_SIXTH]: MINOR_SIXTH_CHORD_INTERVALS,
    [Chord.NINTH]: NINTH_CHORD_INTERVALS,
    [Chord.MINOR_NINTH]: MINOR_NINTH_CHORD_INTERVALS,
    [Chord.MAJOR_NINTH]: MAJOR_NINTH_CHORD_INTERVALS,
}

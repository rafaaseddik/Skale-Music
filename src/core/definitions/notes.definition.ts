export type NoteLetter = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "" | "#" | "b";
export type Octave = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

export type NoteString = `${NoteLetter}${Accidental}${Octave}`;
export type PitchClassString = `${NoteLetter}${Accidental}`;
export type OctavlessNoteString = PitchClassString; // Just an alias
export const NoteStringRegex = /^[A-Ga-g][#b]?[0-8]$/

export const NATURAL_NOTES_ORDER: NoteLetter[] = ["C", "D", "E", "F", "G", "A", "B"];
export const ACCIDENTALS: Accidental[] = ["", "#", "b"];
export const ALL_NOTES_ORDER: PitchClassString[][] = [["C"], ["C#", "Db"], ["D"], ["D#", "Eb"], ["E", "Fb"], ["F", "E#"], ["F#", "Gb"], ["G"], ["G#", "Ab"], ["A"], ["A#", "Bb"], ["B", "Cb"], ["B#"]];
export const ALL_PITCH_CLASSES: PitchClassString[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function getAccidentalName(accidental: Accidental): string {
    switch (accidental) {
        case "":
            return "Natural";
        case "#":
            return "Sharp";
        case "b":
            return "Flat";
    }
}
export function getAccidentalNameWithSign(accidental: Accidental): string {
    switch (accidental) {
        case "":
            return "♮ -Natural";
        case "#":
            return "b - Sharp";
        case "b":
            return "# - Flat";
    }
}

export function getAccidentalFromName(accidentalName: string): Accidental {
    switch (accidentalName) {
        case "Natural":
            return "";
        case "Sharp":
            return "#";
        case "Flat":
            return "b";
        default:
            throw new Error("Invalid accidental name");
    }
}

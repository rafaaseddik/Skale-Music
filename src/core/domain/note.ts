import {
    NoteLetter,
    Accidental,
    Octave,
    NoteString,
    NoteStringRegex, ALL_NOTES_ORDER, PitchClassString
} from "@/core/definitions/notes.definition";

export class Note {
    private static readonly C0_MIDI_NUMBER = 12;

    constructor(public readonly letter: NoteLetter,
                public readonly accidental: Accidental,
                public readonly octave: Octave
    ) {
    }

    static fromString(noteString: NoteString): Note {
        if (!NoteStringRegex.test(noteString)) {
            throw new Error(`Invalid note string: ${noteString}`);
        }
        const noteComponents = noteString.split("");
        if (noteComponents.length === 3) {
            return new Note(noteComponents[0] as NoteLetter, noteComponents[1] as Accidental, noteComponents[2] as Octave);
        } else {
            return new Note(noteComponents[0] as NoteLetter, "", noteComponents[1] as Octave);
        }

    }

    get noteString(): NoteString {
        return `${this.letter}${this.accidental}${this.octave}`;
    }

    get pitchClassString(): PitchClassString {
        return `${this.letter}${this.accidental}`;
    }

    get octaveNumber(): number {
        return Number(this.octave);
    }

    midiNumber(): number {
        if (this.octaveNumber === 0 && this.letter === "C" && this.accidental === "b") {
            throw new Error("Midi notes start from C0");
        }
        const noteOrderInCMajor = ALL_NOTES_ORDER.findIndex((note) => note.includes(this.pitchClassString));
        const octaveOffset = this.octaveNumber * 12;
        return noteOrderInCMajor + octaveOffset + Note.C0_MIDI_NUMBER;
    }

    static fromMidiNumber(midiNumber: number): Note {
        if (midiNumber < Note.C0_MIDI_NUMBER || midiNumber > 127) {
            throw new Error("Invalid MIDI number");
        }
        const octave = Math.floor((midiNumber - Note.C0_MIDI_NUMBER) / 12);
        const pitchClassIndex = (midiNumber - Note.C0_MIDI_NUMBER) % 12;
        const pitchClassString = ALL_NOTES_ORDER[pitchClassIndex][0];
        const letter = pitchClassString[0] as NoteLetter;
        const accidental = pitchClassString.length > 1 ? pitchClassString[1] as Accidental : '';
        return new Note(letter, accidental, octave.toString() as Octave);
    }

    moveSemitones(semitones: number): Note {
        const newMidiNumber = this.midiNumber() + semitones;
        return Note.fromMidiNumber(newMidiNumber);
    }


}

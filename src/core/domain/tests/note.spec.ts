import { describe, it, expect } from "vitest";
import {
    NoteString,
    NoteLetter,
    Accidental, Octave, PitchClassString,
} from "@/core/definitions/notes.definition";
import { Note } from "@/core/domain/note";

describe("Note class", () => {
    it("should create a note from valid components", () => {
        const note = new Note("C", "#", "4");
        expect(note.letter).toBe("C");
        expect(note.accidental).toBe("#");
        expect(note.octave).toBe("4");
    });

    it("should generate the correct noteString", () => {
        const testCases: [NoteLetter, Accidental, Octave, NoteString][] = [
            ["D", "b", "3", "Db3"],
            ["E", "", "5", "E5"],
            ["F", "", "2", "F2"],
            ["G", "#", "6", "G#6"],
            ["A", "", "1", "A1"],
            ["B", "", "7", "B7"],
            ["C", "", "0", "C0"],
        ];
        testCases.forEach(([letter, accidental, octave, expectedNoteString]) => {
            const note = new Note(letter, accidental, octave);
            expect(note.noteString).toBe(expectedNoteString);
        });
    });

    it("should generate the correct pitchClassString", () => {
        const testCases: [NoteLetter, Accidental, Octave, PitchClassString][] = [
            ["D", "b", "3", "Db"],
            ["E", "", "5", "E"],
            ["F", "", "2", "F"],
            ["G", "#", "6", "G#"],
            ["A", "", "1", "A"],
            ["B", "", "7", "B"],
            ["C", "", "0", "C"],
        ];
        testCases.forEach(([letter, accidental, octave, expectedPitchClassString]) => {
            const note = new Note(letter, accidental, octave);
            expect(note.pitchClassString).toBe(expectedPitchClassString);
        });
    });

    it("should convert octave to number correctly", () => {
        const testCases: [NoteLetter, Accidental, Octave][] = [
            ["D", "b", "3"],
            ["E", "", "5"],
            ["F", "", "2"],
            ["G", "#", "6",],
            ["A", "", "1"],
            ["B", "", "7"],
            ["C", "", "0"],
        ];
        testCases.forEach(([letter, accidental, octave]) => {
            const note = new Note(letter, accidental, octave);
            expect(note.octaveNumber).toBe(Number(octave));
        });
    });

    describe("should compute correct MIDI number", () => {
        const testCases: [NoteLetter, Accidental, Octave, number][] = [
            ["C", "", "0", 12],
            ["C", "#", "0", 13],
            ["D", "b", "0", 13],
            ["D", "", "0", 14],
            ["D", "#", "0", 15],
            ["E", "b", "0", 15],
            ["E", "", "0", 16],
            ["F", "b", "0", 16],
            ["F", "", "0", 17],
            ["F", "#", "0", 18],
            ["G", "", "0", 19],
            ["G", "#", "0", 20],
            ["A", "b", "0", 20],
            ["A", "", "0", 21],
            ["A", "#", "0", 22],
            ["B", "b", "0", 22],
            ["B", "", "0", 23],
            ["B", "#", "0", 24],
            ["C", "", "1", 24],
            ["C", "", "2", 36],
            ["C", "", "3", 48],
            ["C", "", "4", 60],
            ["C", "", "5", 72],
            ["C", "", "6", 84],
            ["D", "", "2", 38],
            ["E", "", "3", 52],
            ["F", "b", "4", 64],
            ["G", "#", "5", 80],
            ["A", "b", "6", 92],
            ["B", "b", "7", 106],
            ["B", "", "7", 107],
            ["B", "#", "7", 108],
            ["C", "", "8", 108],
        ];
        testCases.forEach(([letter, accidental, octave, expectedMidi]) => {
            const note = new Note(letter, accidental, octave);
            it(`should compute correct MIDI number for note ${note.noteString}`, () => {

                expect(note.midiNumber()).toBe(expectedMidi);
            })
        });
    });
    describe("should throw an error if note is out of MIDI range", () => {
        const note = new Note("C", "b", "0");
        expect(() => note.midiNumber()).toThrowError("Midi notes start from C0");
    });

    it("should create note from valid NoteString (with accidental)", () => {
        const testCases: [NoteLetter, Accidental, Octave, NoteString][] = [
            ["D", "b", "3", "Db3"],
            ["E", "", "5", "E5"],
            ["F", "", "2", "F2"],
            ["G", "#", "6", "G#6"],
            ["A", "", "1", "A1"],
            ["B", "", "7", "B7"],
            ["C", "", "0", "C0"],
        ];
        testCases.forEach(([letter, accidental, octave, noteString]) => {
            const note = Note.fromString(noteString);
            expect(note.letter).toBe(letter);
            expect(note.accidental).toBe(accidental);
            expect(note.octave).toBe(octave);
        });
    });

    it("should create note from valid NoteString (no accidental)", () => {
        const testCases: [NoteLetter, Accidental, Octave, NoteString][] = [
            ["D", "", "3", "D3"],
            ["E", "", "5", "E5"],
            ["F", "", "2", "F2"],
            ["G", "", "6", "G6"],
            ["A", "", "1", "A1"],
            ["B", "", "7", "B7"],
            ["C", "", "0", "C0"],
        ];
        testCases.forEach(([letter, accidental, octave, noteString]) => {
            const note = Note.fromString(noteString);
            expect(note.letter).toBe(letter);
            expect(note.accidental).toBe(accidental);
            expect(note.octave).toBe(octave);
        });
    });

    it("should throw an error for invalid NoteString", () => {
        expect(() => Note.fromString("H2" as NoteString)).toThrowError(
          /Invalid note string/
        );
        expect(() => Note.fromString("C##" as NoteString)).toThrowError(
          /Invalid note string/
        );
        expect(() => Note.fromString("A10" as NoteString)).toThrowError(
          /Invalid note string/
        );
    });
});

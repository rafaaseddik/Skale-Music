import { describe, it, expect } from 'vitest';
import { ChordsUtils } from '../chords.utils';
import { Chord } from '@/core/definitions/chords.definition';
import { Note } from '@/core/domain/note';

describe('ChordsUtils', () => {
    describe('getChordName', () => {
        it('should return correct chord names', () => {
            const testCases: [Chord, string][] = [
                [Chord.MAJOR, "Major"],
                [Chord.MINOR, "Minor"],
                [Chord.DIMINISHED, "Diminished"],
                [Chord.AUGMENTED, "Augmented"],
                [Chord.SUSPENDED_SECOND, "Suspended Second"],
                [Chord.SUSPENDED_FOURTH, "Suspended Fourth"],
                [Chord.DOMINANT_SEVENTH, "Dominant Seventh"],
                [Chord.MAJOR_SEVENTH, "Major Seventh"],
                [Chord.MINOR_SEVENTH, "Minor Seventh"],
                [Chord.DIMINISHED_SEVENTH, "Diminished Seventh"],
                [Chord.HALF_DIMINISHED_SEVENTH, "Half Diminished Seventh"],
                [Chord.AUGMENTED_SEVENTH, "Augmented Seventh"],
                [Chord.MINOR_MAJOR_SEVENTH, "Minor Major Seventh"],
                [Chord.SIXTH, "Sixth"],
                [Chord.MINOR_SIXTH, "Minor Sixth"],
                [Chord.NINTH, "Ninth"],
                [Chord.MINOR_NINTH, "Minor Ninth"],
                [Chord.MAJOR_NINTH, "Major Ninth"],

            ];

            testCases.forEach(([chord, expectedName]) => {
                expect(ChordsUtils.getChordName(chord)).toBe(expectedName);
            });
        });
    });

    describe('getChordInterval', () => {
        it('should return correct chord intervals', () => {
            const testCases: [Chord, number[]][] = [
                [Chord.MAJOR, [0, 4, 7]],
                [Chord.MINOR, [0, 3, 7]],
                [Chord.DIMINISHED, [0, 3, 6]],
                [Chord.AUGMENTED, [0, 4, 8]],
                [Chord.SUSPENDED_SECOND, [0, 2, 7]],
                [Chord.SUSPENDED_FOURTH, [0, 5, 7]],
                [Chord.DOMINANT_SEVENTH, [0, 4, 7, 10]],
                [Chord.MAJOR_SEVENTH, [0, 4, 7, 11]],
                [Chord.MINOR_SEVENTH, [0, 3, 7, 10]],
                [Chord.DIMINISHED_SEVENTH, [0, 3, 6, 9]],
                [Chord.HALF_DIMINISHED_SEVENTH, [0, 3, 6, 10]],
                [Chord.AUGMENTED_SEVENTH, [0, 4, 8, 10]],
                [Chord.MINOR_MAJOR_SEVENTH, [0, 3, 7, 11]],
                [Chord.SIXTH, [0, 4, 7, 9]],
                [Chord.MINOR_SIXTH, [0, 3, 7, 9]],
                [Chord.NINTH, [0, 4, 7, 10, 14]],
                [Chord.MINOR_NINTH, [0, 3, 7, 10, 14]],
                [Chord.MAJOR_NINTH, [0, 4, 7, 11, 14]],


            ];

            testCases.forEach(([chord, expectedIntervals]) => {
                expect(ChordsUtils.getChordInterval(chord)).toEqual(expectedIntervals);
            });
        });
    });

    describe('getNoteFromChord', () => {
        const rootNote = Note.fromString("C0");

        const testCases: [Chord, string[]][] = [
            [Chord.MAJOR, ["C0", "E0", "G0"]],
            [Chord.MINOR, ["C0", "D#0", "G0"]],
            [Chord.DIMINISHED, ["C0", "D#0", "F#0"]],
            [Chord.AUGMENTED, ["C0", "E0", "G#0"]],
            [Chord.SUSPENDED_SECOND, ["C0", "D0", "G0"]],
            [Chord.SUSPENDED_FOURTH, ["C0", "F0", "G0"]],
            [Chord.DOMINANT_SEVENTH, ["C0", "E0", "G0", "A#0"]],
            [Chord.MAJOR_SEVENTH, ["C0", "E0", "G0", "B0"]],
            [Chord.MINOR_SEVENTH, ["C0", "D#0", "G0", "A#0"]],
            [Chord.DIMINISHED_SEVENTH, ["C0", "D#0", "F#0", "A0"]],
            [Chord.HALF_DIMINISHED_SEVENTH, ["C0", "D#0", "F#0", "A#0"]],
            [Chord.AUGMENTED_SEVENTH, ["C0", "E0", "G#0", "A#0"]],
            [Chord.MINOR_MAJOR_SEVENTH, ["C0", "D#0", "G0", "B0"]],
            [Chord.SIXTH, ["C0", "E0", "G0", "A0"]],
            [Chord.MINOR_SIXTH, ["C0", "D#0", "G0", "A0"]],
            [Chord.NINTH, ["C0", "E0", "G0", "A#0", "D1"]],
            [Chord.MINOR_NINTH, ["C0", "D#0", "G0", "A#0", "D1"]],
            [Chord.MAJOR_NINTH, ["C0", "E0", "G0", "B0", "D1"]],


        ];

        testCases.forEach(([chord, expectedNotes]) => {
            it(`should return correct notes for ${ChordsUtils.getChordName(chord)} chord from C0`, () => {
                const notes = ChordsUtils.getNotesFromChord(rootNote, chord);
                const noteStrings = notes.map(n => n.noteString);
                expect(noteStrings).toEqual(expectedNotes);
            });
        });
    });

});

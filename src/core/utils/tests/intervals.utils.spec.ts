import { describe, it, expect } from 'vitest'
import { Interval } from "@/core/definitions/intervals.definition";
import { IntervalUtils } from "../intervals.utils";
import { Note } from "@/core/domain/note";
import { NoteString } from "@/core/definitions/notes.definition";

describe("IntervalUtils", () => {
    describe("getIntervalName", () => {
        it("should get interval name", () => {
            const testCases: [Interval, string][] = [
                [Interval.Unison, "Unison"],
                [Interval.MinorSecond, "Minor Second"],
                [Interval.MajorSecond, "Major Second"],
                [Interval.MinorThird, "Minor Third"],
                [Interval.MajorThird, "Major Third"],
                [Interval.PerfectFourth, "Perfect Fourth"],
                [Interval.Tritone, "Tritone"],
                [Interval.PerfectFifth, "Perfect Fifth"],
                [Interval.MinorSixth, "Minor Sixth"],
                [Interval.MajorSixth, "Major Sixth"],
                [Interval.MinorSeventh, "Minor Seventh"],
                [Interval.MajorSeventh, "Major Seventh"],
                [Interval.Octave, "Octave"]
            ];
            testCases.forEach(([interval, name]: [Interval, string]) => {
                expect(IntervalUtils.getIntervalName(interval)).toBe(name);
            })
        });
        it("should throw error for out of bounds interval", () => {
            expect(() => IntervalUtils.getIntervalName(13)).toThrow("Interval out of bounds");
            expect(() => IntervalUtils.getIntervalName(-1)).toThrow("Interval out of bounds");
        });
    })

    it("should get interval semitones", () => {
        const testCases: [Interval, number][] = [
            [Interval.Unison, 0],
            [Interval.MinorSecond, 1],
            [Interval.MajorSecond, 2],
            [Interval.MinorThird, 3],
            [Interval.MajorThird, 4],
            [Interval.PerfectFourth, 5],
            [Interval.Tritone, 6],
            [Interval.PerfectFifth, 7],
            [Interval.MinorSixth, 8],
            [Interval.MajorSixth, 9],
            [Interval.MinorSeventh, 10],
            [Interval.MajorSeventh, 11],
            [Interval.Octave, 12]
        ];
        testCases.forEach(([interval, semitones]: [Interval, number]) => {
            expect(IntervalUtils.getIntervalSemitones(interval)).toBe(semitones);
        });
    });
    describe("getNoteFromInterval", () => {
        const testCases: [NoteString, Interval, NoteString][] = [
            ["C0", Interval.Unison, "C0"],
            ["C0", Interval.MinorSecond, "C#0"],
            ["C0", Interval.MajorSecond, "D0"],
            ["C0", Interval.MinorThird, "D#0"],
            ["C0", Interval.MajorThird, "E0"],
            ["C0", Interval.PerfectFourth, "F0"],
            ["C0", Interval.Tritone, "F#0"],
            ["C0", Interval.PerfectFifth, "G0"],
            ["C0", Interval.MinorSixth, "G#0"],
            ["C0", Interval.MajorSixth, "A0"],
            ["C0", Interval.MinorSeventh, "A#0"],
            ["C0", Interval.MajorSeventh, "B0"],
            ["C0", Interval.Octave, "C1"],
        ];
        testCases.forEach(([note, interval, expectedNote]: [NoteString, Interval, NoteString]) => {
            it(`should get the ${IntervalUtils.getIntervalName(interval)} from ${note} to be ${expectedNote}`, () => {
                expect(IntervalUtils.getNoteFromInterval(Note.fromString(note), interval).noteString).toBe(expectedNote);

            })
        });
    })
});

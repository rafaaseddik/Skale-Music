import { describe } from "vitest";
import { IntervalsTrainingGameSession, IntervalTrainingRound } from "@/core/domain/intervals-training-game-session";
import { Interval } from "@/core/definitions/intervals.definition";
import { C1 } from "@/core/domain/tests/__fixtures__/note.mock";

describe("IntervalTrainingGameSession", () => {
    describe("averageGuessesPerInterval", () => {
        it("should calculate the average number of guesses per interval for one correct guess", () => {
            const rounds: IntervalTrainingRound[] = [
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison])
            ];
            const gameSession = new IntervalsTrainingGameSession([Interval.Unison], rounds);
            expect(gameSession.averageGuessesPerGuessType()).toEqual({[Interval.Unison]: 1});
        });
        it("should calculate the average number of guesses per interval for multiple correct guess", () => {
            const rounds: IntervalTrainingRound[] = [
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
            ];
            const gameSession = new IntervalsTrainingGameSession([Interval.Unison], rounds);
            expect(gameSession.averageGuessesPerGuessType()).toEqual({[Interval.Unison]: 1});
        });
        it("should calculate the average number of guesses per interval for two guess", () => {
            const rounds: IntervalTrainingRound[] = [
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison])
            ];
            const gameSession = new IntervalsTrainingGameSession([Interval.Unison], rounds);
            expect(gameSession.averageGuessesPerGuessType()).toEqual({[Interval.Unison]: 2});
        });
        it("should calculate the average number of guesses per interval for multiple two guess", () => {
            const rounds: IntervalTrainingRound[] = [
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
            ];
            const gameSession = new IntervalsTrainingGameSession([Interval.Unison], rounds);
            expect(gameSession.averageGuessesPerGuessType()).toEqual({[Interval.Unison]: 2});
        });
        it("should calculate the average number of guesses per interval for average of 1.5", () => {
            const rounds: IntervalTrainingRound[] = [
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Tritone, Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
                new IntervalTrainingRound(Interval.Unison, [C1, C1], [Interval.Unison]),
            ];
            const gameSession = new IntervalsTrainingGameSession([Interval.Unison], rounds);
            expect(gameSession.averageGuessesPerGuessType()).toEqual({[Interval.Unison]: 1.5});
        });
        describe("should calculate the average number of guesses for all values", () => {
            const correctInterval = Interval.Unison;
            const wrongInterval = Interval.Tritone;
            for (let i = 1; i < 12; i++) {
                const round = new IntervalTrainingRound(correctInterval, [C1, C1], [...Array.from({length: i-1}, () => wrongInterval), correctInterval]);
                const rounds = [round];
                const gameSession = new IntervalsTrainingGameSession([Interval.Unison, Interval.Tritone], rounds);
                it(`should calculate the average number of guesses for ${i} correct guesses`, () => {
                    expect(gameSession.averageGuessesPerGuessType()[Interval.Unison]).toEqual(i);
                });
            }
        })
    })
});

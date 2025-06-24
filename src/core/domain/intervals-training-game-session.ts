import { Interval } from "@/core/definitions/intervals.definition";
import { BaseGuessingGameRound, BaseGuessingGameSession } from "@/core/domain/BaseGuessingGameSession";
import { Note } from "@/core/domain/note";

export class IntervalTrainingRound extends BaseGuessingGameRound<Interval> {
    constructor(toGuess: Interval,
                notes: Note[],
                answers: Interval[]) {
        super(toGuess, notes, answers);
    }

}

export class IntervalsTrainingGameSession extends BaseGuessingGameSession<Interval> {
    constructor(guessableItems: Interval[], rounds: BaseGuessingGameRound<Interval>[] = []) {
        super(guessableItems, rounds);
    }
}

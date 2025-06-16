import { Interval } from "@/core/definitions/intervals.definition";
import { Note } from "@/core/domain/note";

export class IntervalTrainingRound {
    constructor(public readonly interval: Interval,
                public readonly notes: [Note, Note],
                public readonly answers: Interval[],) {

    }
    get isFirstTry(): boolean {
        return this.answers.length === 1 && this.answers[0] === this.interval;
    }
    get isFinished(): boolean {
        return this.answers.length > 0 && this.answers.at(-1) === this.interval;
    }
}


export class IntervalsTrainingGameSession {
    constructor(public readonly rounds: IntervalTrainingRound[] = []) {
    }

    get roundsCount(): number {
        return this.rounds.length;
    }

    get finishedRoundsCount(): number {
        return this.rounds.filter(round => round.isFinished).length;
    }

    get guessesCount(): number {
        return this.rounds.reduce((total, round) => total + round.answers.length, 0);
    }

    get correctRoundsCount(): number {
        return this.rounds.filter(round => round.isFirstTry).length;
    }

    get accuracy(): number {
        if (this.finishedRoundsCount === 0) {
            return 0;
        }
        return Math.round(this.correctRoundsCount / this.finishedRoundsCount * 100) ;
    }
    get currentRound(): IntervalTrainingRound | undefined {
        return this.rounds.at(-1);
    }

    playerGuessed(interval: Interval) {
        const lastRound = this.rounds.pop();
        if(!lastRound || lastRound.isFinished){
            throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        }
        const newRound = new IntervalTrainingRound(lastRound.interval, lastRound.notes, [...lastRound.answers, interval]);
        return new IntervalsTrainingGameSession([...this.rounds, newRound]);

    }
}

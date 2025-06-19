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
    constructor(public readonly selectedIntervals: Interval[], public readonly rounds: IntervalTrainingRound[] = []) {
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

    get firstTryCorrectRoundsCount(): number {
        return this.rounds.filter(round => round.isFirstTry).length;
    }

    get accuracy(): number {
        if (this.finishedRoundsCount === 0) {
            return 0;
        }
        return Math.round(this.firstTryCorrectRoundsCount / this.finishedRoundsCount * 100);
    }

    get currentRound(): IntervalTrainingRound | undefined {
        return this.rounds.at(-1);
    }

    playerGuessed(interval: Interval) {
        const lastRound = this.rounds.pop();
        if (!lastRound || lastRound.isFinished) {
            throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        }
        const newRound = new IntervalTrainingRound(lastRound.interval, lastRound.notes, [...lastRound.answers, interval]);
        return new IntervalsTrainingGameSession(this.selectedIntervals, [...this.rounds, newRound]);

    }

    playedRoundsPerInterval(): Record<Interval, number> {
        return this.selectedIntervals.reduce((acc, interval) => {
            acc[interval] = this.rounds.filter(round => round.interval === interval && round.isFinished).length;
            return acc;
        }, {} as Record<Interval, number>)
    }

    averageGuessesPerInterval(): Record<Interval, number> {
        const accumulator: Record<Interval, {
            guessesCount: number,
            roundsCount: number
        }> = this.selectedIntervals.reduce((acc, interval) => {
            acc[interval] = {
                guessesCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<Interval, { guessesCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            accumulator[round.interval].guessesCount += round.answers.length;
            accumulator[round.interval].roundsCount += 1;
        });
        return this.selectedIntervals.reduce((acc: Record<Interval, number>, interval: Interval) => {
            if (accumulator[interval].roundsCount === 0) {
                acc[interval] = 0;
                return acc;
            }
            acc[interval] = accumulator[interval].guessesCount / accumulator[interval].roundsCount;
            return acc;
        }, {} as Record<Interval, number>)
    }

    firstTryAccuracyPerInterval(): Record<Interval, number> {
        const accumulator: Record<Interval, {
            firstGuessCount: number,
            roundsCount: number
        }> = this.selectedIntervals.reduce((acc, interval) => {
            acc[interval] = {
                firstGuessCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<Interval, { firstGuessCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            if (round.isFirstTry) {
                accumulator[round.interval].firstGuessCount++;
            }
            accumulator[round.interval].roundsCount += 1;
        });
        return this.selectedIntervals.reduce((acc: Record<Interval, number>, interval: Interval) => {
            if (accumulator[interval].roundsCount === 0) {
                acc[interval] = 0;
                return acc;
            }
            acc[interval] = accumulator[interval].firstGuessCount / accumulator[interval].roundsCount;
            return acc;
        }, {} as Record<Interval, number>)
    }
}

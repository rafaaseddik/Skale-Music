import { Note } from "@/core/domain/note";
import { Chord } from "../definitions/chords.definition";

export class ChordTrainingRound {
    constructor(public readonly chord: Chord,
                public readonly notes: Note[],
                public readonly answers: Chord[],) {

    }

    get isFirstTry(): boolean {
        return this.answers.length === 1 && this.answers[0] === this.chord;
    }

    get isFinished(): boolean {
        return this.answers.length > 0 && this.answers.at(-1) === this.chord;
    }
}


export class ChordsTrainingGameSession {
    constructor(public readonly selectedChords: Chord[], public readonly rounds: ChordTrainingRound[] = []) {
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

    get currentRound(): ChordTrainingRound | undefined {
        return this.rounds.at(-1);
    }

    playerGuessed(chord: Chord) {
        const lastRound = this.rounds.pop();
        if (!lastRound || lastRound.isFinished) {
            throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        }
        const newRound = new ChordTrainingRound(lastRound.chord, lastRound.notes, [...lastRound.answers, chord]);
        return new ChordsTrainingGameSession(this.selectedChords, [...this.rounds, newRound]);

    }

    playedRoundsPerChord(): Record<Chord, number> {
        return this.selectedChords.reduce((acc, chord) => {
            acc[chord] = this.rounds.filter(round => round.chord === chord && round.isFinished).length;
            return acc;
        }, {} as Record<Chord, number>)
    }

    averageGuessesPerChord(): Record<Chord, number> {
        const accumulator: Record<Chord, {
            guessesCount: number,
            roundsCount: number
        }> = this.selectedChords.reduce((acc, chord) => {
            acc[chord] = {
                guessesCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<Chord, { guessesCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            accumulator[round.chord].guessesCount += round.answers.length;
            accumulator[round.chord].roundsCount += 1;
        });
        return this.selectedChords.reduce((acc: Record<Chord, number>, chord: Chord) => {
            if (accumulator[chord].roundsCount === 0) {
                acc[chord] = 0;
                return acc;
            }
            acc[chord] = accumulator[chord].guessesCount / accumulator[chord].roundsCount;
            return acc;
        }, {} as Record<Chord, number>)
    }

    firstTryAccuracyPerChord(): Record<Chord, number> {
        const accumulator: Record<Chord, {
            firstGuessCount: number,
            roundsCount: number
        }> = this.selectedChords.reduce((acc, chord) => {
            acc[chord] = {
                firstGuessCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<Chord, { firstGuessCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            if (round.isFirstTry) {
                accumulator[round.chord].firstGuessCount++;
            }
            accumulator[round.chord].roundsCount += 1;
        });
        return this.selectedChords.reduce((acc: Record<Chord, number>, chord: Chord) => {
            if (accumulator[chord].roundsCount === 0) {
                acc[chord] = 0;
                return acc;
            }
            acc[chord] = accumulator[chord].firstGuessCount / accumulator[chord].roundsCount;
            return acc;
        }, {} as Record<Chord, number>)
    }
}

import { Note } from "@/core/domain/note";
import { Interval } from "@/core/definitions/intervals.definition";
import { Chord } from "@/core/definitions/chords.definition";
import { DiatonicMode } from "@/core/definitions/diatonic-modes.definition";
export type GuessableType = Interval | Chord | DiatonicMode;
export class BaseGuessingGameRound<GuessType extends GuessableType>{
    constructor(
      public readonly toGuess:GuessType,
      public readonly notes:Note[],
      public readonly answers:GuessType[]){
    }
    get isFirstTry():boolean{
        return this.answers.length === 1 && this.answers[0] === this.toGuess;
    }
    get isFinished():boolean{
        return this.answers.length > 0 && this.answers.at(-1) === this.toGuess;
    }

}
export class BaseGuessingGameSession<GuessType extends GuessableType>{
    constructor(public readonly guessableItems:GuessType[], public readonly rounds:BaseGuessingGameRound<GuessType>[] = []){}
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
    get currentRound(): BaseGuessingGameRound<GuessType> | undefined {
        return this.rounds.at(-1);
    }
    playerGuessed(guess: GuessType):BaseGuessingGameSession<GuessType> {
        const lastRound = this.rounds.pop();
        if (!lastRound || lastRound.isFinished) {
            throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        }
        const newRound = new BaseGuessingGameRound<GuessType>(lastRound.toGuess, lastRound.notes, [...lastRound.answers, guess]);
        return new BaseGuessingGameSession<GuessType>(this.guessableItems, [...this.rounds, newRound]);
    }
    playedRoundsPerGuessType(): Partial<Record<GuessType, number>> {
        return this.guessableItems.reduce((acc, guessableItem) => {
            acc[guessableItem] = this.rounds.filter(round => round.toGuess === guessableItem && round.isFinished).length;
            return acc;
        }, {} as Record<GuessType, number>)
    }

    averageGuessesPerGuessType(): Partial<Record<GuessType, number>> {
        const accumulator: Record<GuessType, {
            guessesCount: number,
            roundsCount: number
        }> = this.guessableItems.reduce((acc, guessableItem) => {
            acc[guessableItem] = {
                guessesCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<GuessType, { guessesCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            accumulator[round.toGuess].guessesCount += round.answers.length;
            accumulator[round.toGuess].roundsCount += 1;
        });
        return this.guessableItems.reduce((acc: Record<GuessType, number>, guessableItem: GuessType) => {
            if (accumulator[guessableItem].roundsCount === 0) {
                acc[guessableItem] = 0;
                return acc;
            }
            acc[guessableItem] = accumulator[guessableItem].guessesCount / accumulator[guessableItem].roundsCount;
            return acc;
        }, {} as Record<GuessType, number>)
    }
    firstTryAccuracyPerGuessType(): Partial<Record<GuessType, number>> {
        const accumulator: Record<GuessType, {
            firstGuessCount: number,
            roundsCount: number
        }> = this.guessableItems.reduce((acc, guessableItem) => {
            acc[guessableItem] = {
                firstGuessCount: 0,
                roundsCount: 0
            }
            return acc;
        }, {} as Record<GuessType, { firstGuessCount: number, roundsCount: number }>);
        this.rounds.filter(round => round.isFinished).forEach(round => {
            if (round.isFirstTry) {
                accumulator[round.toGuess].firstGuessCount++;
            }
            accumulator[round.toGuess].roundsCount += 1;
        });
        return this.guessableItems.reduce((acc: Record<GuessType, number>, guessableItem: GuessType) => {
            if (accumulator[guessableItem].roundsCount === 0) {
                acc[guessableItem] = 0;
                return acc;
            }
            acc[guessableItem] = accumulator[guessableItem].firstGuessCount / accumulator[guessableItem].roundsCount;
            return acc;
        }, {} as Record<GuessType, number>)
    }
}

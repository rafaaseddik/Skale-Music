import { Chord } from "../definitions/chords.definition";
import { BaseGuessingGameRound, BaseGuessingGameSession } from "@/core/domain/BaseGuessingGameSession";

export class ChordTrainingRound extends BaseGuessingGameRound<Chord> {}

export class ChordsTrainingGameSession extends BaseGuessingGameSession<Chord> {}

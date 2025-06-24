import { BaseGuessingGameRound, BaseGuessingGameSession } from "@/core/domain/BaseGuessingGameSession";
import { DiatonicMode } from "@/core/definitions/diatonic-modes.definition";

export class DiatonicModeTrainingRound extends BaseGuessingGameRound<DiatonicMode> {}

export class DiatonicModesTrainingGameSession extends BaseGuessingGameSession<DiatonicMode> {}

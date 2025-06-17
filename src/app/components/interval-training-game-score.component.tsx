import { IntervalsTrainingGameSession } from "@/core/domain/intervals-training-game-session";

type IntervalTrainingGameScoreProps = {
    gameSession: IntervalsTrainingGameSession
}
export default function IntervalTrainingGameScore({gameSession}: IntervalTrainingGameScoreProps) {
    return (
      <div className="interval-training-game-score">
          <div className="grid grid-cols-4 gap-2">
              <div className="score-item">
                  <div className="text-theme-color-hover font-bold">Played rounds</div>
                  <div>{gameSession.finishedRoundsCount}</div>
              </div>
              <div className="score-item score-item-green">
                  <div className="text-theme-green-hover font-bold">First try correct</div>
                  <div>{gameSession.firstTryCorrectRoundsCount}</div>
              </div>
              <div className="score-item">
                  <div className="text-theme-color-hover font-bold">Played guesses</div>
                  <div>{gameSession.guessesCount}</div>
              </div>
              <div className="score-item score-item-red">
                  <div className="text-theme-red-hover font-bold">Accuracy</div>
                  <div>{gameSession.rounds.length > 0 ? <span>{gameSession.accuracy}%</span> : <span>-</span>}</div>
              </div>
          </div>
      </div>
    )
}

import { BaseGuessingGameSession, GuessableType } from "@/core/domain/BaseGuessingGameSession";

interface GameScoreProps<T extends GuessableType>  {
    gameSession: BaseGuessingGameSession<T>
}
export default function GameScore<T extends GuessableType>({gameSession}:GameScoreProps<T>) {
    return (
      <div className="interval-training-game-score">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="score-item">
                  <div className="text-theme-color-hover font-bold text-sm md:text-base">Rounds Played</div>
                  <div className="text-3xl font-medium">{gameSession.finishedRoundsCount}</div>
              </div>
              <div className="score-item score-item-green">
                  <div className="text-theme-green-hover font-bold text-sm md:text-base">First-Try Corrects</div>
                  <div className="text-3xl font-medium">{gameSession.firstTryCorrectRoundsCount}</div>
              </div>
              <div className="score-item">
                  <div className="text-theme-color-hover font-bold text-sm md:text-base">Total Guesses</div>
                  <div className="text-3xl font-medium">{gameSession.guessesCount}</div>
              </div>
              <div className="score-item score-item-red">
                  <div className="text-theme-red-hover font-bold text-sm md:text-base">Accuracy</div>
                  <div className="text-3xl font-medium">{gameSession.rounds.length > 0 ? <span>{gameSession.accuracy}%</span> : <span>-</span>}</div>
              </div>
          </div>
      </div>
    )
}

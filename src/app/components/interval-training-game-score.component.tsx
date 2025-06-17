import { IntervalsTrainingGameSession } from "@/core/domain/intervals-training-game-session";

type IntervalTrainingGameScoreProps = {
    gameSession: IntervalsTrainingGameSession
}
export default function IntervalTrainingGameScore({gameSession}: IntervalTrainingGameScoreProps) {
    return (
      <>
          You Played {gameSession.finishedRoundsCount} rounds. You made {gameSession.guessesCount} guesses.
          You made {gameSession.firstTryCorrectRoundsCount} correct first try rounds.
          <div className={gameSession.rounds.length > 0 ? '' : 'hidden'}><br/>Your accuracy
              is {gameSession.accuracy}%</div>
          <div className="grid grid-cols-4">
            <div><div>Played rounds</div><div>{gameSession.finishedRoundsCount}</div></div>
            <div><div>First try correct</div><div>{gameSession.firstTryCorrectRoundsCount}</div></div>
            <div><div>Played guesses</div><div>{gameSession.guessesCount}</div></div>
              <div><div>Accuracy</div><div>{gameSession.rounds.length > 0 ? <span>{gameSession.accuracy}%</span> : <span>-</span>}</div></div>
          </div>
      </>
    )
}

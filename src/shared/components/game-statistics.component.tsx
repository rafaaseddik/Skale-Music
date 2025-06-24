import { IntervalUtils } from "@/core/utils/intervals.utils";
import { percentageString, round } from "@/shared/utils/react-dom-utils";
import { useEffect, useState } from "react";
import { BaseGuessingGameSession, GuessableType } from "@/core/domain/BaseGuessingGameSession";
import { ChordsUtils } from "@/core/utils/chords.utils";

interface GameStatisticsProps<T extends GuessableType> {
    gameSession: BaseGuessingGameSession<T>
    type: 'intervals' | 'chords'
}
const labelMap = {
    'intervals': 'Interval',
    'chords': 'Chord'
}
export default function GameStatistics<T extends GuessableType>({gameSession, type}: GameStatisticsProps<T>) {
    const [stats, setStats] = useState<{name:string, playedRoundsCount: number, averageGuesses: number, firstTryAccuracy: number}[]>([]);
    useEffect(()=>{
        console.log(gameSession);
        const playedRoundsPerInterval = gameSession.playedRoundsPerGuessType();
        const averageGuessesPerInterval = gameSession.averageGuessesPerGuessType();
        const firstTryAccuracyPerInterval = gameSession.firstTryAccuracyPerGuessType();
        let nameMapper:(index:number)=>string;
        switch(type) {
            case 'intervals':
                nameMapper = IntervalUtils.getIntervalName;
                break;
            case 'chords':
                nameMapper = ChordsUtils.getChordName;
                break;
        }
        const stats = gameSession.guessableItems.map((guessableItem) => ({
            name: nameMapper(guessableItem),
            playedRoundsCount: playedRoundsPerInterval[guessableItem] ?? 0,
            averageGuesses: averageGuessesPerInterval[guessableItem] ?? 0,
            firstTryAccuracy: firstTryAccuracyPerInterval[guessableItem] ?? 0,
        }));
        setStats(stats);
    }, [gameSession]);

    const getHeatmapClassFromPercentage = (value: number): string => {
        if (value < 25) return "very-low-score"
        if (value < 50) return "low-score"
        if (value < 90) return "medium-score"
        return "high-score"
    }
    const getHeatmapClassFromRoundCount = (value: number): string => {
        if (value > 4) return "very-low-score"
        if (value > 3) return "low-score"
        if (value > 2) return "medium-score"
        return "high-score"
    }
    return (
      <div className="interval-training-game-statistics">
          <div className="table-container">
              <table>
                  <thead>
                  <tr>
                      <th>{labelMap[type]}</th>
                      <th>Rounds Played</th>
                      <th>Avg. Guesses/Round</th>
                      <th>Accuracy</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      stats.map((guessableItem) => (
                        <tr key={guessableItem.name}>
                            <td><div>{guessableItem.name}</div></td>
                            <td><div>{guessableItem.playedRoundsCount}</div></td>
                            <td><div className={`score ${getHeatmapClassFromRoundCount(guessableItem.averageGuesses)}`}>{round(guessableItem.averageGuesses)}</div></td>
                            <td><div className={`score ${getHeatmapClassFromPercentage(guessableItem.firstTryAccuracy*100)}`}>{percentageString(guessableItem.firstTryAccuracy)}</div></td>
                        </tr>
                      ))
                  }
                  <tr>

                  </tr>
                  </tbody>
              </table>
          </div>

      </div>

    );
}

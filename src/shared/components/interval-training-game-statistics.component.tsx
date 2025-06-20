import { IntervalsTrainingGameSession } from "@/core/domain/intervals-training-game-session";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { percentageString, round } from "@/shared/utils/react-dom-utils";
import { useEffect, useState } from "react";

type IntervalTrainingGameStatisticsProps = {
    gameSession: IntervalsTrainingGameSession
};
export default function IntervalTrainingGameStatistics({gameSession}: IntervalTrainingGameStatisticsProps) {
    const [stats, setStats] = useState<{name:string, playedRoundsCount: number, averageGuesses: number, firstTryAccuracy: number}[]>([]);
    useEffect(()=>{
        const playedRoundsPerInterval = gameSession.playedRoundsPerInterval();
        const averageGuessesPerInterval = gameSession.averageGuessesPerInterval();
        const firstTryAccuracyPerInterval = gameSession.firstTryAccuracyPerInterval();
        const stats = gameSession.selectedIntervals.map((interval) => ({
            name: IntervalUtils.getIntervalName(interval),
            playedRoundsCount: playedRoundsPerInterval[interval],
            averageGuesses: averageGuessesPerInterval[interval],
            firstTryAccuracy: firstTryAccuracyPerInterval[interval],
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
                      <th>Interval</th>
                      <th>Rounds Played</th>
                      <th>Avg. Guesses/Round</th>
                      <th>Accuracy</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      stats.map((interval) => (
                        <tr key={interval.name}>
                            <td><div>{interval.name}</div></td>
                            <td><div>{interval.playedRoundsCount}</div></td>
                            <td><div className={`score ${getHeatmapClassFromRoundCount(interval.averageGuesses)}`}>{round(interval.averageGuesses)}</div></td>
                            <td><div className={`score ${getHeatmapClassFromPercentage(interval.firstTryAccuracy*100)}`}>{percentageString(interval.firstTryAccuracy)}</div></td>
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

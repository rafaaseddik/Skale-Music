import IntervalsSelector from "@/app/components/intervals-selector.component";
import { Interval } from "@/core/definitions/intervals.definition";
import { useRef, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { Note } from "@/core/domain/note";
import { RandomizerUtils } from "@/core/utils/randomizer.utils";
import MidiPlayer, { MidiPlayerRef } from "@/app/components/midi-player.component";
import { sleep } from "@/core/utils/time.utils";
import { IntervalsTrainingGameSession, IntervalTrainingRound } from "@/core/domain/intervals-training-game-session";
import IntervalSelector from "@/app/components/interval-selector.component";

// TODO: make this configurable in the UI
const MIN_PLAYABLE_NOTE_MIDI_NUMBER = 36; //C3
const MAX_PLAYABLE_NOTE_MIDI_NUMBER = 72; // C5
export default function IntervalsTraining() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([]);
    const [gameSession, setGameSession] = useState<IntervalsTrainingGameSession | null>(null);
    const startSession = () => {
        setGameSession(new IntervalsTrainingGameSession([]));
    }
    const generateInterval = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        const index = Math.floor(Math.random() * selectedIntervals.length);
        const interval = selectedIntervals[index];
        const note1 = RandomizerUtils.getRandomNote(MIN_PLAYABLE_NOTE_MIDI_NUMBER, MAX_PLAYABLE_NOTE_MIDI_NUMBER - interval);
        const note2 = IntervalUtils.getNoteFromInterval(note1, interval);
        const round = new IntervalTrainingRound(interval, [note1, note2], []);
        setGameSession(new IntervalsTrainingGameSession([...gameSession.rounds, round]));
        if (midiPlayerRef.current) {
            midiPlayerRef.current.playNote(note1);
            await sleep(1000);
            midiPlayerRef.current.playNote(note2);
        }
    }
    const guessInterval = async (interval: Interval) => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound || gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        const newGameSession = gameSession.playerGuessed(interval);
        setGameSession(newGameSession);
        console.log(newGameSession);

        //await generateInterval();
    }
    return (
      <div>
          <h1 className="text-2xl flex justify-center p-2 mb-2"><img src="/skale.svg" alt="logo" width={150}/></h1>
          <h1 className="text-2xl text-center font-bold p-2 bg-white text-black">Intervals ear training</h1>
          {!gameSession && <>
              <div className="p-3 mt-2 text-center">Please select the intervals you want to practice</div>
              <div className="p-3">
                  <IntervalsSelector initialSelectedIntervals={selectedIntervals}
                                     intervalUpdated={selectedIntervals => setSelectedIntervals(selectedIntervals)}></IntervalsSelector>
                  <div className="mt-4 text-center">
                      <button className="btn btn-white-outline" onClick={() => startSession()}>Start Session</button>
                  </div>

              </div>
          </>
          }
          {
            gameSession && (
              <>
                  <div className="p-3 mt-2 text-center">
                      You Played {gameSession.finishedRoundsCount} rounds. You made {gameSession.guessesCount} guesses.
                        You made {gameSession.firstTryCorrectRoundsCount} correct first try rounds.
                      <div className={gameSession.rounds.length > 0 ? '' : 'hidden'}><br/>Your accuracy
                          is {gameSession.accuracy}%</div></div>
                  <div className="text-center">
                      <button
                        disabled={!selectedIntervals.length || (!gameSession.currentRound?.isFinished && gameSession.rounds?.length > 0)}
                        onClick={() => generateInterval()}
                        className="btn btn-white-outline mt-2 mb-5">Next Round
                      </button>
                  </div>
                  {
                    gameSession.currentRound &&
                    (<>
                        <IntervalSelector correctInterval={gameSession.currentRound.interval}
                                          selectableIntervals={selectedIntervals}
                                          selectedIntervals={gameSession.currentRound.answers}
                                          intervalSelected={guessInterval}
                                          disabled={gameSession.currentRound.isFinished}></IntervalSelector>
                    </>)
                  }
              </>
            )
          }
          <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
      </div>
    )
}

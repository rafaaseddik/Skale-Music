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
          <h1 className="text-2xl text-center p-2">Intervals Training</h1>
          {!gameSession && <>
              <IntervalsSelector initialSelectedIntervals={selectedIntervals}
                                 intervalUpdated={selectedIntervals => setSelectedIntervals(selectedIntervals)}></IntervalsSelector>
              <button className="btn btn-blue" onClick={() => startSession()}>Start Session</button>
          </>
          }
          {
            gameSession && (
              <>
                  <div>Played {gameSession.finishedRoundsCount} rounds. Your accuracy is {gameSession.accuracy}%</div>
                  <div>
                      <button disabled={!selectedIntervals.length || !gameSession.currentRound?.isFinished} onClick={() => generateInterval()}
                              className="btn btn-blue">New Round
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

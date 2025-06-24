"use client"
import IntervalsSelector from "@/shared/components/intervals-selector.component";
import { Interval } from "@/core/definitions/intervals.definition";
import { useEffect, useRef, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { RandomizerUtils } from "@/core/utils/randomizer.utils";
import MidiPlayer, { MidiPlayerRef } from "@/shared/components/midi-player.component";
import { sleep } from "@/core/utils/time.utils";
import { IntervalsTrainingGameSession, IntervalTrainingRound } from "@/core/domain/intervals-training-game-session";
import IntervalSelector from "@/shared/components/interval-selector.component";
import { Play, RotateCcw } from "lucide-react";
import Head from "next/head";
import GameScore from "@/shared/components/game-score.component";
import GameStatistics from "@/shared/components/game-statistics.component";

// TODO: make this configurable in the UI
const MIN_PLAYABLE_NOTE_MIDI_NUMBER = 36; //C3
const MAX_PLAYABLE_NOTE_MIDI_NUMBER = 72; // C5
export default function IntervalsTraining() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([]);
    const [gameSession, setGameSession] = useState<IntervalsTrainingGameSession | null>(null);
    useEffect(() => {

    }, [gameSession]);
    const startSession = () => {
        const gameSession = new IntervalsTrainingGameSession(selectedIntervals, []);
        setGameSession(gameSession);
        // TODO: this is not very stable, can be made better in the future
        generateInterval(gameSession);

    }
    const generateInterval = async (gameSessionObj: IntervalsTrainingGameSession) => {
        const index = Math.floor(Math.random() * selectedIntervals.length);
        const interval = selectedIntervals[index];
        const note1 = RandomizerUtils.getRandomNote(MIN_PLAYABLE_NOTE_MIDI_NUMBER, MAX_PLAYABLE_NOTE_MIDI_NUMBER - interval);
        const note2 = IntervalUtils.getNoteFromInterval(note1, interval);
        const round:IntervalTrainingRound = new IntervalTrainingRound(interval, [note1, note2], []);
        setGameSession(new IntervalsTrainingGameSession(gameSessionObj.guessableItems, [...gameSessionObj.rounds, round]));
        if (midiPlayerRef.current) {
            midiPlayerRef.current.stop();
            midiPlayerRef.current.playNote(note1);
            await sleep(1000);
            midiPlayerRef.current.playNote(note2);
        }
    }
    const nextRound = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (gameSession.currentRound && !gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is not finished. Player needs to guess the interval.");
        await generateInterval(gameSession);
    }
    const guessInterval = async (interval: Interval) => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound || gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        const newGameSession = gameSession.playerGuessed(interval);
        setGameSession(newGameSession);
    }
    const replayInterval = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound) throw new Error("No current round to replay");
        const note1 = gameSession.currentRound.notes[0];
        const note2 = gameSession.currentRound.notes[1];
        if (midiPlayerRef.current) {
            midiPlayerRef.current.stop();
            midiPlayerRef.current.playNote(note1);
            await sleep(1000);
            midiPlayerRef.current.playNote(note2);
        }
    }
    return (
      <>
          <Head>
              <title>Skale | Intervals ear training</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Intervals Ear Training</h1>
              <h3 className="text-l text-center text-theme-grey">Improve your memory for intervals</h3>

              {!gameSession && <>
                  <div className="p-3 mt-2 text-center">Pick intervals to practice now</div>
                  <div>
                      <IntervalsSelector initialSelectedIntervals={selectedIntervals}
                                         intervalUpdated={selectedIntervals => setSelectedIntervals(selectedIntervals)}></IntervalsSelector>
                      <div className="mt-4 text-center">
                          <button className="btn btn-primary" disabled={selectedIntervals.length === 0}
                                  onClick={() => startSession()}>Start training
                          </button>
                      </div>

                  </div>
              </>
              }
              {
                gameSession && (
                  <>
                      <h1 className="text-2xl text-center mt-2">Round #{gameSession.rounds.length}</h1>
                      <div className="text-center button-group mt-3">
                          <button
                            disabled={!selectedIntervals.length || (!gameSession.currentRound?.isFinished && gameSession.rounds?.length > 0)}
                            onClick={() => nextRound()}
                            className="btn btn-primary-outline mt-2 mb-5">
                              <Play height={15}/> Next Round
                          </button>
                          <button
                            disabled={!gameSession.currentRound}
                            onClick={() => replayInterval()}
                            className="btn btn-green-outline mt-2 mb-5 ms-4">
                              <RotateCcw height={15}/> Replay interval
                          </button>
                      </div>
                      {
                        gameSession.currentRound &&
                        (<div className="py-3">
                            <IntervalSelector correctInterval={gameSession.currentRound.toGuess}
                                              selectableIntervals={selectedIntervals}
                                              selectedIntervals={gameSession.currentRound.answers}
                                              intervalSelected={guessInterval}
                                              disabled={gameSession.currentRound.isFinished}></IntervalSelector>
                        </div>)
                      }
                      <div className="py-3 mt-2 text-center">
                          <GameScore gameSession={gameSession}></GameScore>

                      </div>
                      <div>
                          <GameStatistics type={"intervals"} gameSession={gameSession}></GameStatistics>
                      </div>
                  </>
                )
              }
              <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
          </div>
      </>
    )
}

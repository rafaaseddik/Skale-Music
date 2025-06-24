"use client"
import { useRef, useState } from "react";

import { RandomizerUtils } from "@/core/utils/randomizer.utils";
import MidiPlayer, { MidiPlayerRef } from "@/shared/components/midi-player.component";
import { Play, RotateCcw } from "lucide-react";
import Head from "next/head";
import GameScore from "@/shared/components/game-score.component";
import GameStatistics from "@/shared/components/game-statistics.component";
import { DiatonicMode } from "@/core/definitions/diatonic-modes.definition";
import { DiatonicModesTrainingGameSession, DiatonicModeTrainingRound } from "@/core/domain/diatonic-modes-training-game-session";
import { DiatonicModesUtils } from "@/core/utils/diatonic-modes.utils";
import DiatonicModesSelector from "@/shared/components/selectors/diatonic-mode/diatonic-modes-selector.component";
import DiatonicModeSelector from "@/shared/components/selectors/diatonic-mode/diatonic-mode-selector.component";
import { sleep } from "@/core/utils/time.utils";

// TODO: make this configurable in the UI
const MIN_PLAYABLE_NOTE_MIDI_NUMBER = 36; //C3
const MAX_PLAYABLE_NOTE_MIDI_NUMBER = 72; // C5
export default function DiatonicModesRecognition() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [selectedDiatonicModes, setSelectedDiatonicModes] = useState<DiatonicMode[]>([]);
    const [gameSession, setGameSession] = useState<DiatonicModesTrainingGameSession | null>(null);
    // useEffect(()=>{
    //
    // }, [gameSession]);
    const startSession = () => {
        const gameSession = new DiatonicModesTrainingGameSession(selectedDiatonicModes, []);
        setGameSession(gameSession);
        // TODO: this is not very stable, can be made better in the future
        generateDiatonicMode(gameSession);

    }
    const generateDiatonicMode = async (gameSessionObj: DiatonicModesTrainingGameSession) => {
        const index = Math.floor(Math.random() * selectedDiatonicModes.length);
        const interval = selectedDiatonicModes[index];
        const rootNote = RandomizerUtils.getRandomNote(MIN_PLAYABLE_NOTE_MIDI_NUMBER, MAX_PLAYABLE_NOTE_MIDI_NUMBER - interval);
        const notes = DiatonicModesUtils.getNotesFromDiatonicMode(rootNote, interval);
        const round = new DiatonicModeTrainingRound(interval, notes, []);
        setGameSession(new DiatonicModesTrainingGameSession(gameSessionObj.guessableItems, [...gameSessionObj.rounds, round]));
        if (midiPlayerRef.current) {
            midiPlayerRef.current.stop();
            for (const note of notes) {
                midiPlayerRef.current.playNote(note);
                await sleep(200)
            }
        }
    }
    const nextRound = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (gameSession.currentRound && !gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is not finished. Player needs to guess the mode.");
        await generateDiatonicMode(gameSession);
    }
    const guessDiatonicMode = async (mode: DiatonicMode) => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound || gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        const newGameSession = gameSession.playerGuessed(mode);
        setGameSession(newGameSession);
    }
    const replayDiatonicMode = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound) throw new Error("No current round to replay");
        if (midiPlayerRef.current) {
            midiPlayerRef.current.stop();
            for (const note of gameSession.currentRound.notes) {
                midiPlayerRef.current.playNote(note);
                await sleep(200)
            }
        }
    }
    return (<>
          <Head>
              <title>Skale | Diatonic Modes Recognition</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Diatonic Modes Recognition</h1>
              <h3 className="text-l text-center text-theme-grey">Improve your memory for modes</h3>

              {!gameSession && <>
                  <div className="p-3 mt-2 text-center">Pick intervals to practice now</div>
                  <div>
                      <DiatonicModesSelector initialSelectedDiatonicModes={selectedDiatonicModes}
                                      diatonicModesUpdated={selectedDiatonicModes => setSelectedDiatonicModes(selectedDiatonicModes)}></DiatonicModesSelector>
                      <div className="mt-4 text-center">
                          <button className="btn btn-primary" disabled={selectedDiatonicModes.length === 0}
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
                            disabled={!selectedDiatonicModes.length || (!gameSession.currentRound?.isFinished && gameSession.rounds?.length > 0)}
                            onClick={() => nextRound()}
                            className="btn btn-primary-outline mt-2 mb-5">
                              <Play height={15}/> Next Round
                          </button>
                          <button
                            disabled={!gameSession.currentRound}
                            onClick={() => replayDiatonicMode()}
                            className="btn btn-green-outline mt-2 mb-5 ms-4">
                              <RotateCcw height={15}/> Replay mode
                          </button>
                      </div>
                      {
                        gameSession.currentRound &&
                        (<div className="py-3">
                            <DiatonicModeSelector correctDiatonicMode={gameSession.currentRound.toGuess}
                                           selectableDiatonicModes={selectedDiatonicModes}
                                           selectedDiatonicModes={gameSession.currentRound.answers}
                                           chordSelected={guessDiatonicMode}
                                           disabled={gameSession.currentRound.isFinished}></DiatonicModeSelector>
                        </div>)
                      }
                      <div className="py-3 mt-2 text-center">
                          <GameScore gameSession={gameSession}></GameScore>

                      </div>
                      <div>
                          <div>
                              <GameStatistics type={"chords"} gameSession={gameSession}></GameStatistics>
                          </div>
                      </div>
                  </>
                )
              }
              <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
          </div>
      </>
    )
}

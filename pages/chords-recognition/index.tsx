"use client"
import { useEffect, useRef, useState } from "react";

import { RandomizerUtils } from "@/core/utils/randomizer.utils";
import MidiPlayer, { MidiPlayerRef, PlayMode } from "@/shared/components/midi-player.component";
import { RotateCcw } from "lucide-react";
import { Chord } from "@/core/definitions/chords.definition";
import ChordsSelector from "@/shared/components/chords-selector.component";
import { ChordsTrainingGameSession, ChordTrainingRound } from "@/core/domain/chords-training-game-session";
import { ChordsUtils } from "@/core/utils/chords.utils";
import ChordSelector from "@/shared/components/chord-selector.component";
import Head from "next/head";
import GameScore from "@/shared/components/game-score.component";
import GameStatistics from "@/shared/components/game-statistics.component";
import Dropdown from "@/shared/components/form/dropdown.component";

// TODO: make this configurable in the UI
const MIN_PLAYABLE_NOTE_MIDI_NUMBER = 57; //A3
const MAX_PLAYABLE_NOTE_MIDI_NUMBER = 72; // C5
const SHOW_CORRECT_ANSWER_TIMEOUT = 500;
export default function ChordsRecognition() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [selectedChords, setSelectedChords] = useState<Chord[]>([]);
    const [gameSession, setGameSession] = useState<ChordsTrainingGameSession | null>(null);
    const [playMode, setPlayMode] = useState<PlayMode>(PlayMode.Blocked);
    useEffect(() => {
        if (gameSession && gameSession.currentRound && gameSession.currentRound.isFinished) {
            setTimeout(() => nextRound(), SHOW_CORRECT_ANSWER_TIMEOUT); // The timeout is to let the player see the green light
        }
    }, [gameSession]);

    const startSession = async () => {
        const gameSession = new ChordsTrainingGameSession(selectedChords, []);
        setGameSession(gameSession);
        // TODO: this is not very stable, can be made better in the future
        await generateChord(gameSession);

    }
    const generateChord = async (gameSessionObj: ChordsTrainingGameSession) => {
        const index = Math.floor(Math.random() * selectedChords.length);
        const interval = selectedChords[index];
        const rootNote = RandomizerUtils.getRandomNote(MIN_PLAYABLE_NOTE_MIDI_NUMBER, MAX_PLAYABLE_NOTE_MIDI_NUMBER - interval);
        const notes = ChordsUtils.getNotesFromChord(rootNote, interval);
        const round = new ChordTrainingRound(interval, notes, []);
        setGameSession(new ChordsTrainingGameSession(gameSessionObj.guessableItems, [...gameSessionObj.rounds, round]));
        if (midiPlayerRef.current) {
            midiPlayerRef.current.playNotes(notes, playMode);
        }
    }
    const nextRound = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (gameSession.currentRound && !gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is not finished. Player needs to guess the chord.");
        await generateChord(gameSession);
    }
    const guessChord = async (chord: Chord) => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound || gameSession.currentRound.isFinished) throw new Error("Invalid state, last round is finished. Player needs to start a new round.");
        const newGameSession = gameSession.playerGuessed(chord);
        setGameSession(newGameSession);
    }
    const replayChord = async () => {
        if (!gameSession) throw new Error("Game session is not initialized");
        if (!gameSession.currentRound) throw new Error("No current round to replay");
        if (midiPlayerRef.current) {
            midiPlayerRef.current.playNotes(gameSession.currentRound.notes, playMode);
        }
    }
    const playModeChanged = (mode: string) => {
        if(["Ascending", "Descending", "Blocked"].includes(mode)) {
            setPlayMode(mode as PlayMode);
        }
    }
    return (<>
          <Head>
              <title>Skale | Chords Recognition</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Chords Recognition</h1>
              <h3 className="text-l text-center text-theme-grey">Improve your memory for chords</h3>

              {!gameSession && <>
                  <div className="p-3 mt-2 text-center">Pick intervals to practice now</div>
                  <div>
                      <ChordsSelector initialSelectedChords={selectedChords}
                                      chordsUpdated={selectedChords => setSelectedChords(selectedChords)}></ChordsSelector>
                      <div className="mt-4 text-center">
                          <button className="btn btn-primary" disabled={selectedChords.length === 0}
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
                            disabled={!gameSession.currentRound}
                            onClick={() => replayChord()}
                            className="btn btn-green-outline mt-2 mb-5 ms-4">
                              <RotateCcw height={15}/> Replay chord
                          </button>
                          <Dropdown className="ms-2" options={[PlayMode.Blocked, PlayMode.Ascending, PlayMode.Descending]} selected={playMode} onSelect={(e)=>playModeChanged(e)}></Dropdown>
                      </div>
                      {
                        gameSession.currentRound &&
                        (<div className="py-3">
                            <ChordSelector correctChord={gameSession.currentRound.toGuess}
                                           selectableChords={selectedChords}
                                           selectedChords={gameSession.currentRound.answers}
                                           chordSelected={guessChord}
                                           disabled={gameSession.currentRound.isFinished}></ChordSelector>
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

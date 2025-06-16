// pages/midiplayer.tsx
import { useEffect, useRef, useState } from "react";
import Soundfont from "soundfont-player";

const INSTRUMENTS = {
    piano: "acoustic_grand_piano",
    guitar: "electric_guitar_clean",
} as const;

const INTERVALS = [
    { name: "Unison", semitones: 0 },
    { name: "Minor 2nd", semitones: 1 },
    { name: "Major 2nd", semitones: 2 },
    { name: "Minor 3rd", semitones: 3 },
    { name: "Major 3rd", semitones: 4 },
    { name: "Perfect 4th", semitones: 5 },
    { name: "Tritone", semitones: 6 },
    { name: "Perfect 5th", semitones: 7 },
    { name: "Minor 6th", semitones: 8 },
    { name: "Major 6th", semitones: 9 },
    { name: "Minor 7th", semitones: 10 },
    { name: "Octave", semitones: 12 },
];

export default function MidiPlayerPage() {
    const [instrumentName, setInstrumentName] = useState<keyof typeof INSTRUMENTS>("piano");
    const [isLoading, setIsLoading] = useState(true);
    const playerRef = useRef<Soundfont.Player | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const initPlayer = async () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            setIsLoading(true);
            const player = await Soundfont.instrument(audioContextRef.current, INSTRUMENTS[instrumentName]);
            playerRef.current = player;
            setIsLoading(false);
        };

        initPlayer();
    }, [instrumentName]);

    const playInterval = (semitones: number) => {
        if (!playerRef.current) return;

        const baseMidi = 60 + Math.floor(Math.random() * 12); // C4-B4
        const note1 = midiToNoteName(baseMidi);
        const note2 = midiToNoteName(baseMidi + semitones);

        playerRef.current.play(note1, 0, { duration: 1 });
        playerRef.current.play(note2, 1, { duration: 1 });
    };

    const midiToNoteName = (midi: number): string => {
        const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const note = NOTES[midi % 12];
        const octave = Math.floor(midi / 12) - 1;
        return `${note}${octave}`;
    };

    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1>MIDI Interval Player</h1>

          <label>
              Select Instrument:{" "}
              <select
                value={instrumentName}
                onChange={(e) => setInstrumentName(e.target.value as keyof typeof INSTRUMENTS)}
              >
                  <option value="piano">Piano</option>
                  <option value="guitar">Electric Guitar</option>
              </select>
          </label>

          {isLoading ? (
            <p>Loading instrument...</p>
          ) : (
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {INTERVALS.map((interval) => (
                  <button
                    key={interval.name}
                    onClick={() => playInterval(interval.semitones)}
                    style={{
                        padding: "10px 15px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                        backgroundColor: "#f0f0f0",
                        cursor: "pointer",
                    }}
                  >
                      {interval.name}
                  </button>
                ))}
            </div>
          )}
      </div>
    );
}

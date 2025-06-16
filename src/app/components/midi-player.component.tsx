import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import Soundfont from "soundfont-player";
import { Note } from "@/core/domain/note";

const INSTRUMENTS = {
    piano: "acoustic_grand_piano",
    guitar: "electric_guitar_clean",
} as const;
export type MidiPlayerInstrumentName = keyof typeof INSTRUMENTS
export type MidiPlayerRef = {
    playNote: (note:Note) => void
    changeInstrument: (instrument: MidiPlayerInstrumentName) => void
}
export default function MidiPlayer({ref:externalRef}:{ref?:Ref<MidiPlayerRef>}) {
    const [instrumentName, setInstrumentName] = useState<MidiPlayerInstrumentName>("piano");
    const playerRef = useRef<Soundfont.Player | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    useEffect(() => {
        const initPlayer = async () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            setIsLoading(true);
            playerRef.current = await Soundfont.instrument(audioContextRef.current, INSTRUMENTS[instrumentName]);
            setIsLoading(false);
        };

        initPlayer();
    }, [instrumentName]);
    useImperativeHandle(externalRef, () => ({
        playNote: (note:Note) => {
            if (!playerRef.current || isLoading) return;
            playerRef.current.play(note.noteString, 0, { duration: 1 });
        },
        changeInstrument: (instrument: MidiPlayerInstrumentName) => {
            setInstrumentName(instrument);
        }
    }));
    return <div></div>;
};


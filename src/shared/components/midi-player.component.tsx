"use client"
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import Soundfont from "soundfont-player";
import { Note } from "@/core/domain/note";
import { sleep } from "@/core/utils/time.utils";

const INSTRUMENTS = {
    piano: "acoustic_grand_piano",
    guitar: "electric_guitar_clean",
} as const;
export type MidiPlayerInstrumentName = keyof typeof INSTRUMENTS

export enum PlayMode {
    Blocked = "Blocked",
    Ascending = "Ascending",
    Descending = "Descending",
}

export type MidiPlayerRef = {
    playNote: (note: Note) => void
    playNotes: (notes: Note[], mode?: PlayMode, noteDuration?: number) => void
    changeInstrument: (instrument: MidiPlayerInstrumentName) => void
    stop: () => void
}
export default function MidiPlayer({ref: externalRef}: { ref?: Ref<MidiPlayerRef> }) {
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
        playNote: (note: Note) => {
            if (!playerRef.current || isLoading) return;
            playerRef.current.play(note.noteString, 0, {duration: 1, gain: 10});
        },
        playNotes: async (notes: Note[], mode: PlayMode = PlayMode.Blocked, noteDuration = 1000) => {
            if (!playerRef.current || isLoading) return;
            playerRef.current.stop();
            if (mode === PlayMode.Blocked) {
                for (const note of notes) {
                    playerRef.current.play(note.noteString, 0, {duration: 1, gain: 10});
                }
            } else if (mode === PlayMode.Ascending) {
                for (const note of notes) {
                    playerRef.current.play(note.noteString, 0, {duration: 1, gain: 10});
                    await sleep(noteDuration);
                }
            } else if (mode === PlayMode.Descending) {
                for (const note of notes.toReversed()) {
                    playerRef.current.play(note.noteString, 0, {duration: 1, gain: 10});
                    await sleep(noteDuration);
                }
            }
        },
        changeInstrument: (instrument: MidiPlayerInstrumentName) => {
            setInstrumentName(instrument);
        },
        stop: () => {
            if (!playerRef.current || isLoading) return;
            playerRef.current.stop();
        }
    }));
    return <div></div>;
};


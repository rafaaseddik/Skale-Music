import { ALL_PITCH_CLASSES, Octave, PitchClassString } from "@/core/definitions/notes.definition";
import { useEffect, useRef, useState } from "react";
import { ifClass } from "@/shared/utils/react-dom-utils";
import MidiPlayer, { MidiPlayerRef } from "@/shared/components/midi-player.component";
import { Note } from "@/core/domain/note";

interface KeyboardProps {
    notes: PitchClassString[]
    octaves: number
}

const WHITE_NOTES: PitchClassString[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_NOTES: PitchClassString[] = ['C#', 'D#', 'F#', 'G#', 'A#'];
type highlightNote = {
    note: PitchClassString,
    octave: number
}
export default function Keyboard({notes}: KeyboardProps) {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [highlightedNotes, setHighlightedNotes] = useState<highlightNote[]>([]);
    const [octaves, setOctaves] = useState(4);
    useEffect(() => {
        const highlightedNotes: highlightNote[] = [];
        const remainingNotes = [...notes];
        for(let octave = 0; octave < 4; octave++){
            for(const note of ALL_PITCH_CLASSES){
                if(remainingNotes[0] === note){
                    highlightedNotes.push({note, octave});
                    remainingNotes.shift();
                    if(remainingNotes.length === 0){
                        setOctaves(octave + 1);
                        break;
                    }
                }
            }
        }
        setHighlightedNotes(highlightedNotes);
    }, [notes, octaves])
    const playNote = (note: PitchClassString, octave: number) => {
        if(midiPlayerRef.current){
            midiPlayerRef.current.playNote(Note.fromString(`${note}${octave.toString() as Octave}`));
        }
    }
    return (
      <div className="keyboard">
          {
              new Array(octaves).fill(0).map((_, index) =>
                <div key={index} className="keyboard-octave">
                    {WHITE_NOTES.map(pitch=><div key={pitch} className={`keyboard-key-white ${ifClass(highlightedNotes.find(note=>note.note===pitch && note.octave===index)!==undefined, "active")}`} onClick={()=>playNote(pitch, index+3)}>{pitch}</div>)}
                    <div className={"keyboard-black-keys"}>
                        {BLACK_NOTES.map(pitch=><div key={pitch} className={`keyboard-key-black ${ifClass(highlightedNotes.find(note=>note.note===pitch && note.octave===index)!==undefined, "active")}`} onClick={()=>playNote(pitch, index+3)}>{pitch}</div>)}
                    </div>

                </div>
              )
          }
          <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
      </div>
    )
}

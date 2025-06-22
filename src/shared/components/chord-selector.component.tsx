import { Chord } from "@/core/definitions/chords.definition";
import { ChordsUtils } from "@/core/utils/chords.utils";

type ChordsSelectorProps = {
    selectableChords: Chord[]
    selectedChords: Chord[]
    chordSelected: (chord: Chord) => void
    correctChord:Chord;
    disabled?: boolean
}
export default function ChordSelector({selectableChords,selectedChords,chordSelected, correctChord, disabled}: ChordsSelectorProps) {
    const selectChord = (chord: Chord) => {
        if(selectedChords.includes(chord) || disabled){
            return;
        }
        chordSelected(chord);
    }

    return (
      <div className="flex flex-col gap-2 chords-selector">
          <div className="grid grid-cols-4 gap-2">
              {selectableChords.sort().map((chord) => (
                <div key={chord} className={`chords-selector-item ${selectedChords.includes(chord) ? chord === correctChord ? "selected-correct" : "selected-wrong": ""}`} onClick={() => {selectChord(chord)}}>
                    <div className="text-center">{ChordsUtils.getChordName(chord)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

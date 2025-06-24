import { DiatonicMode } from "@/core/definitions/diatonic-modes.definition";
import { DiatonicModesUtils } from "@/core/utils/diatonic-modes.utils";


type DiatonicModesSelectorProps = {
    selectableDiatonicModes: DiatonicMode[]
    selectedDiatonicModes: DiatonicMode[]
    chordSelected: (chord: DiatonicMode) => void
    correctDiatonicMode:DiatonicMode;
    disabled?: boolean
}
export default function DiatonicModeSelector({selectableDiatonicModes,selectedDiatonicModes,chordSelected, correctDiatonicMode, disabled}: DiatonicModesSelectorProps) {
    const selectDiatonicMode = (chord: DiatonicMode) => {
        if(selectedDiatonicModes.includes(chord) || disabled){
            return;
        }
        chordSelected(chord);
    }

    return (
      <div className="flex flex-col gap-2 chords-selector">
          <div className="grid grid-cols-4 gap-2">
              {selectableDiatonicModes.sort().map((diatonicMode) => (
                <div key={diatonicMode} className={`chords-selector-item ${selectedDiatonicModes.includes(diatonicMode) ? diatonicMode === correctDiatonicMode ? "selected-correct" : "selected-wrong": ""}`} onClick={() => {selectDiatonicMode(diatonicMode)}}>
                    <div className="text-center">{DiatonicModesUtils.getDiatonicModeName(diatonicMode)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

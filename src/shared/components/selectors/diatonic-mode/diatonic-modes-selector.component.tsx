import { useEffect, useState } from "react";
import { ifClass } from "@/shared/utils/react-dom-utils";
import { CheckSquare, Square } from "lucide-react";
import { ALL_DIATONIC_MODES, DiatonicMode } from "@/core/definitions/diatonic-modes.definition";
import { DiatonicModesUtils } from "@/core/utils/diatonic-modes.utils";

type DiatonicModesSelectorProps = {
    initialSelectedDiatonicModes?: DiatonicMode[]
    diatonicModesUpdated?: (DiatonicModes: DiatonicMode[]) => void
    activateOnly?: boolean;
}
export default function DiatonicModesSelector({
                                           initialSelectedDiatonicModes,
                                                  diatonicModesUpdated,
                                           activateOnly
                                       }: DiatonicModesSelectorProps) {
    const [selectedDiatonicModes, setSelectedDiatonicModes] = useState<DiatonicMode[]>(initialSelectedDiatonicModes ?? []);
    const toggleDiatonicMode = (DiatonicMode: DiatonicMode) => {
        if (!selectedDiatonicModes.includes(DiatonicMode)) {
            setSelectedDiatonicModes([...selectedDiatonicModes, DiatonicMode]);
        } else if (!activateOnly) {
            setSelectedDiatonicModes(selectedDiatonicModes.filter((i) => i !== DiatonicMode));
        }
    };
    useEffect(() => {
        if (diatonicModesUpdated) {
            diatonicModesUpdated(selectedDiatonicModes);
        }
    }, [diatonicModesUpdated, selectedDiatonicModes])
    const DiatonicModeColSpan = (DiatonicMode: DiatonicMode): string => {
        switch (DiatonicMode) {
            default:
                return "col-span-1";
        }
    }
    const selectAllDiatonicModes = () => {
        setSelectedDiatonicModes(ALL_DIATONIC_MODES)
    }
    const deselectAllDiatonicModes = () => {
        setSelectedDiatonicModes([]);
    }
    return (
      <div className="flex flex-col gap-2 chords-selector">
          <div className="grid grid-cols-2 gap-4">
              <div className="chords-selector-item" onClick={selectAllDiatonicModes}>
                  <div className="text-center"><CheckSquare className="w-5 h-5 text-green-600"
                                                            color={"var(--theme-grey)"}/>Select All
                  </div>
              </div>
              <div className="chords-selector-item" onClick={deselectAllDiatonicModes}>
                  <div className="text-center"><Square className="w-5 h-5 text-gray-600" color={"var(--theme-grey)"}/>Deselect
                      All
                  </div>
              </div>
              {ALL_DIATONIC_MODES.map((diatonicMode) => (
                <div key={diatonicMode}
                     className={`${DiatonicModeColSpan(diatonicMode)} chords-selector-item  ${ifClass(selectedDiatonicModes.includes(diatonicMode), "selected")}`}
                     onClick={() => {
                         toggleDiatonicMode(diatonicMode)
                     }}>
                    <div className="text-center">{DiatonicModesUtils.getDiatonicModeName(diatonicMode)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

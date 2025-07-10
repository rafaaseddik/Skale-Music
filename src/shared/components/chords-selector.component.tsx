import { ALL_CHORDS, Chord } from "@/core/definitions/chords.definition";
import { useEffect, useState } from "react";
import { ChordsUtils } from "@/core/utils/chords.utils";
import { ifClass } from "@/shared/utils/react-dom-utils";
import { CheckSquare, Ellipsis, Square } from "lucide-react";

type ChordsSelectorProps = {
    initialSelectedChords?: Chord[]
    chordsUpdated?: (Chords: Chord[]) => void
    activateOnly?: boolean; // if true, only allow activation no toggle.
    singleSelect?: boolean; // if true, only allow selecting one Chord
}
const SHOW_MORE_INDEX = 8;
export default function ChordsSelector({
                                           initialSelectedChords,
                                           chordsUpdated,
                                           activateOnly,
                                           singleSelect
                                       }: ChordsSelectorProps) {
    const [selectedChords, setSelectedChords] = useState<Chord[]>(initialSelectedChords ?? []);
    const [showAllChords, setShowAllChords] = useState(false);
    const toggleChord = (Chord: Chord) => {
        if (singleSelect) {
            setSelectedChords([Chord]);
        } else if (!selectedChords.includes(Chord)) {
            setSelectedChords([...selectedChords, Chord]);
        } else if (!activateOnly) {
            setSelectedChords(selectedChords.filter((i) => i !== Chord));
        }
    };
    useEffect(() => {
        if (singleSelect && selectedChords.length > 1) {
            throw new Error("Only one Chord can be selected if singleSelect is true");
        }
    }, [singleSelect, selectedChords])

    useEffect(() => {
        if (chordsUpdated) {
            chordsUpdated(selectedChords);
        }
    }, [chordsUpdated, selectedChords])
    const ChordColSpan = (Chord: Chord): string => {
        switch (Chord) {
            default:
                return "col-span-1";
        }
    }
    const selectAllChords = () => {
        if (showAllChords)
            setSelectedChords(ALL_CHORDS)
        else setSelectedChords(ALL_CHORDS.slice(0, SHOW_MORE_INDEX));
    }
    const deselectAllChords = () => {
        setSelectedChords([]);
    }
    return (
      <div className="flex flex-col gap-2 chords-selector">
          <div className="grid grid-cols-2 gap-4">
              {!singleSelect && (<>
                    <div className="chords-selector-item" onClick={selectAllChords}>
                        <div className="text-center"><CheckSquare className="w-5 h-5 text-green-600"
                                                                  color={"var(--theme-grey)"}/>Select All
                        </div>
                    </div>
                    <div className="chords-selector-item" onClick={deselectAllChords}>
                        <div className="text-center"><Square className="w-5 h-5 text-gray-600"
                                                             color={"var(--theme-grey)"}/>Deselect
                            All
                        </div>
                    </div>
                </>
              )}
              {ALL_CHORDS.slice(0, SHOW_MORE_INDEX).map((Chord) => (
                <div key={Chord}
                     className={`${ChordColSpan(Chord)} chords-selector-item  ${ifClass(selectedChords.includes(Chord), "selected")}`}
                     onClick={() => {
                         toggleChord(Chord)
                     }}>
                    <div className="text-center">{ChordsUtils.getChordName(Chord)}</div>
                </div>

              ))}
              <div className={`chords-selector-item col-span-2 ${ifClass(showAllChords, "hidden")}`}
                   onClick={() => setShowAllChords(!showAllChords)}>
                  <div className="text-center">Show more <Ellipsis className="w-5 h-5 text-green-600 ps-1"
                                                                   color={"var(--theme-grey)"}/></div>
              </div>
              {showAllChords && ALL_CHORDS.slice(SHOW_MORE_INDEX).map((Chord) => (
                <div key={Chord}
                     className={`${ChordColSpan(Chord)} chords-selector-item  ${ifClass(selectedChords.includes(Chord), "selected")}`}
                     onClick={() => {
                         toggleChord(Chord)
                     }}>
                    <div className="text-center">{ChordsUtils.getChordName(Chord)}</div>
                </div>

              ))}
          </div>
      </div>
    )
      ;
}

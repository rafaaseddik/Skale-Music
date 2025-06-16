import IntervalsSelector from "@/app/components/intervals-selector.component";
import { Interval } from "@/core/definitions/intervals.definition";
import { useRef, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { Note } from "@/core/domain/note";
import { RandomizerUtils } from "@/core/utils/randomizer.utils";
import MidiPlayer, { MidiPlayerRef } from "@/app/components/midi-player.component";
import { sleep } from "@/core/utils/time.utils";

// TODO: make this configurable in the UI
const MIN_PLAYABLE_NOTE_MIDI_NUMBER = 36; //C3
const MAX_PLAYABLE_NOTE_MIDI_NUMBER= 72; // C5
export default function IntervalsTraining() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([]);
    const [currentIntervalNotes, setCurrentIntervalNotes] = useState<[Note, Note] | null>(null);
    const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);

    const generateInterval = async () => {
        const index = Math.floor(Math.random() * selectedIntervals.length);
        const interval = selectedIntervals[index];
        const note1 = RandomizerUtils.getRandomNote(MIN_PLAYABLE_NOTE_MIDI_NUMBER, MAX_PLAYABLE_NOTE_MIDI_NUMBER-interval);
        const note2 = IntervalUtils.getNoteFromInterval(note1, interval);
        setCurrentIntervalNotes([note1, note2]);
        setCurrentInterval(interval);
        if(midiPlayerRef.current){
            midiPlayerRef.current.playNote(note1);
            await sleep(1000);
            midiPlayerRef.current.playNote(note2);
        }
    }
    return (
      <div>
          <h1 className="text-2xl text-center p-2">Intervals Training</h1>
          {selectedIntervals.map((interval) => IntervalUtils.getIntervalName(interval)).join(", ")}
          <div></div>
          <div>
              {currentIntervalNotes&&currentInterval &&
                  <div>
                      <div>{IntervalUtils.getIntervalName(currentInterval)}</div>
                      <div>{currentIntervalNotes[0].noteString}</div>
                      <div>{currentIntervalNotes[1].noteString}</div>
                  </div>
              }
          </div>
          <IntervalsSelector initialSelectedIntervals={selectedIntervals}
                             intervalUpdated={selectedIntervals => setSelectedIntervals(selectedIntervals)}></IntervalsSelector>
          <div><button disabled={!selectedIntervals.length} onClick={() => generateInterval()} className="btn btn-blue">Generate Intervals</button></div>
          <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
      </div>
    )
}

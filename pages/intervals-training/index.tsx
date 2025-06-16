import IntervalsSelector from "@/app/components/intervals-selector.component";
import { Interval } from "@/core/definitions/intervals.definition";
import { useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { Note } from "@/core/domain/note";
import { RandomizerUtils } from "@/core/utils/randomizer.utils";

export default function IntervalsTraining() {
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([]);
    const [currentIntervalNotes, setCurrentIntervalNotes] = useState<[Note, Note] | null>(null);
    const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);

    const generateInterval = () => {
        const index = Math.floor(Math.random() * selectedIntervals.length);
        const interval = selectedIntervals[index];
        const note1 = RandomizerUtils.getRandomNote(Note.MIN_MIDI_NUMBER, Note.MAX_MIDI_NUMBER-interval);
        const note2 = IntervalUtils.getNoteFromInterval(note1, interval);
        setCurrentIntervalNotes([note1, note2]);
        setCurrentInterval(interval);
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
      </div>
    )
}

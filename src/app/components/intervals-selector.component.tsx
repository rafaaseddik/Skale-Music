import { ALL_INTERVALS, Interval } from "@/core/definitions/intervals.definition";
import { useEffect, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";

type IntervalsSelectorProps = {
    initialSelectedIntervals?: Interval[]
    intervalUpdated?: (intervals: Interval[]) => void
}
export default function IntervalsSelector({initialSelectedIntervals, intervalUpdated}: IntervalsSelectorProps) {
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>(initialSelectedIntervals ?? []);
    const toggleInterval = (interval: Interval) => {
        if (selectedIntervals.includes(interval)) {
            setSelectedIntervals(selectedIntervals.filter((i) => i !== interval));
        } else {
            setSelectedIntervals([...selectedIntervals, interval]);
        }
    };
    useEffect(()=>{
        if(intervalUpdated){
            intervalUpdated(selectedIntervals);
        }
    }, [selectedIntervals])
    return (
      <div className="flex flex-col gap-2 intervals-selector">
          <div className="grid grid-cols-3 grid-rows-4 gap-2">
              {ALL_INTERVALS.map((interval) => (
                <div key={interval} className={`intervals-selector-item ${selectedIntervals.includes(interval) ? "selected" : ""}`} onClick={() => {toggleInterval(interval)}}>
                    <span>{IntervalUtils.getIntervalName(interval)}</span>
                </div>

              ))}
          </div>
      </div>
    );
}

import { ALL_INTERVALS, Interval } from "@/core/definitions/intervals.definition";
import { useEffect, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";

type IntervalsSelectorProps = {
    initialSelectedIntervals?: Interval[]
    intervalUpdated?: (intervals: Interval[]) => void
    activateOnly?: boolean;
}
export default function IntervalsSelector({initialSelectedIntervals, intervalUpdated, activateOnly}: IntervalsSelectorProps) {
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>(initialSelectedIntervals ?? []);
    const toggleInterval = (interval: Interval) => {
        if (!selectedIntervals.includes(interval)) {
            setSelectedIntervals([...selectedIntervals, interval]);
        } else if(!activateOnly) {
            setSelectedIntervals(selectedIntervals.filter((i) => i !== interval));
        }
    };
    useEffect(()=>{
        if(intervalUpdated){
            intervalUpdated(selectedIntervals);
        }
    }, [selectedIntervals])
    return (
      <div className="flex flex-col gap-2 intervals-selector">
          <div className="grid grid-cols-4 gap-2">
              {ALL_INTERVALS.map((interval) => (
                <div key={interval} className={`intervals-selector-item ${selectedIntervals.includes(interval) ? "selected" : ""}`} onClick={() => {toggleInterval(interval)}}>
                    <div className="text-center">{IntervalUtils.getIntervalName(interval)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

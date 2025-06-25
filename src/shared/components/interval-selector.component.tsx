import { Interval } from "@/core/definitions/intervals.definition";
import { IntervalUtils } from "@/core/utils/intervals.utils";

type IntervalsSelectorProps = {
    selectableIntervals: Interval[]
    selectedIntervals: Interval[]
    intervalSelected: (interval: Interval) => void
    correctInterval:Interval;
    disabled?: boolean
}
export default function IntervalSelector({selectableIntervals,selectedIntervals,intervalSelected, correctInterval, disabled}: IntervalsSelectorProps) {
    const selectInterval = (interval: Interval) => {
        if(selectedIntervals.includes(interval) || disabled){
            return;
        }
        intervalSelected(interval);
    }

    return (
      <div className="flex flex-col gap-2 intervals-selector">
          <div className="grid grid-cols-4 gap-2">
              {selectableIntervals.sort((a,b)=>a-b).map((interval) => (
                <div key={interval} className={`intervals-selector-item ${selectedIntervals.includes(interval) ? interval === correctInterval ? "selected-correct" : "selected-wrong": ""}`} onClick={() => {selectInterval(interval)}}>
                    <div className="text-center">{IntervalUtils.getIntervalName(interval)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

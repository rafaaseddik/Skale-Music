import { ALL_INTERVALS, Interval } from "@/core/definitions/intervals.definition";
import { useEffect, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { ifClass } from "@/app/utils/react-dom-utils";

type IntervalsSelectorProps = {
    initialSelectedIntervals?: Interval[]
    intervalUpdated?: (intervals: Interval[]) => void
    activateOnly?: boolean;
}

export default function IntervalsSelector({
                                              initialSelectedIntervals,
                                              intervalUpdated,
                                              activateOnly
                                          }: IntervalsSelectorProps) {
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>(initialSelectedIntervals ?? []);
    const toggleInterval = (interval: Interval) => {
        if (!selectedIntervals.includes(interval)) {
            setSelectedIntervals([...selectedIntervals, interval]);
        } else if (!activateOnly) {
            setSelectedIntervals(selectedIntervals.filter((i) => i !== interval));
        }
    };
    useEffect(() => {
        if (intervalUpdated) {
            intervalUpdated(selectedIntervals);
        }
    }, [selectedIntervals])
    const intervalColSpan = (interval: Interval): string => {
        switch (interval) {
            case Interval.Octave:
            case Interval.Unison:
                return "col-span-4";
            case Interval.Tritone:
                return "col-span-2";
            default:
                return "col-span-1";
        }
    }
    return (
      <div className="flex flex-col gap-2 intervals-selector">
          <div className="grid grid-cols-4 gap-2">
              {ALL_INTERVALS.map((interval) => (
                <div key={interval}
                     className={`${intervalColSpan(interval)} intervals-selector-item  ${ifClass(selectedIntervals.includes(interval), "selected")}`}
                     onClick={() => {
                         toggleInterval(interval)
                     }}>
                    <div className="text-center">{IntervalUtils.getIntervalName(interval)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}

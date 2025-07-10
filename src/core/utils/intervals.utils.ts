import { INTERVALS_NAMES, Interval } from "../definitions/intervals.definition";
import { Note } from "@/core/domain/note";

export class IntervalUtils {
    /**
     * Returns the name of the interval based on the number of semitones, in the range [0, 12).
     * @returns The name of the interval
     */
    static getIntervalName(semitones: number):string {
        if(semitones>12){
            const octaves = Math.floor(semitones/12);
            semitones -= octaves*12;
            if(semitones === 0) {
                return `${octaves} octave${octaves > 1 ? "s" : ""}`;
            }
            else{
                return `${octaves} octave${octaves > 1 ? "s" : ""} + ${this.getIntervalName(semitones)}`;
            }

        }
        if(semitones < 0 || semitones > 12) {
            throw new Error("Interval out of bounds");
        }
        return INTERVALS_NAMES[semitones as Interval];
    }

    /**
     * Returns the number of semitones of the interval
     * @param interval The interval
     * @returns The number of semitones
     */
    static getIntervalSemitones(interval: Interval):number {
        return interval;
    }

    static getNoteFromInterval(note: Note, interval: Interval): Note {
        return note.moveSemitones(interval);
    }
}

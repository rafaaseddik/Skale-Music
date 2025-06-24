import { Note } from "@/core/domain/note";
import { DIATONIC_MODE_NAMES, DiatonicMode, IONIAN_MODE_INTERVALS } from "@/core/definitions/diatonic-modes.definition";

export class DiatonicModesUtils {
  public static getDiatonicModeName(mode: DiatonicMode): string {
      return DIATONIC_MODE_NAMES[mode];
  }
  public static getDiatonicModeInterval(mode: DiatonicMode): number[] {
      const shift = mode;
      return IONIAN_MODE_INTERVALS
        .slice(shift)
        .concat(IONIAN_MODE_INTERVALS.slice(0, shift));
  }
  public static getNotesFromDiatonicMode(rootNote: Note, mode: DiatonicMode): Note[] {
      const intervals = this.getDiatonicModeInterval(mode);
      const result:Note[] = [];
      let currentNote = rootNote;
      for(const interval of intervals){
          currentNote = currentNote.moveSemitones(interval);
          result.push(currentNote);
      }
      return result;
  }
}

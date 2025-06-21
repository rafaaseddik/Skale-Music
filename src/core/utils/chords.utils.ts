import { Chord, CHORD_INTERVALS, CHORDS_NAMES } from "@/core/definitions/chords.definition";
import { Note } from "@/core/domain/note";

export class ChordsUtils {
  public static getChordName(chord: Chord): string {
      return CHORDS_NAMES[chord];
  }
  public static getChordInterval(chord: Chord): number[] {
      return CHORD_INTERVALS[chord];
  }
  public static getNotesFromChord(rootNote: Note, chord: Chord): Note[] {
      const intervals = CHORD_INTERVALS[chord];
      return intervals.map(interval => rootNote.moveSemitones(interval));
  }
}

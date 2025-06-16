import { Note } from "@/core/domain/note";

export class RandomizerUtils {
    public static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static getRandomNote(midiMin: number, midiMax: number):Note {
        const midi = this.getRandomInt(midiMin, midiMax);
        return Note.fromMidiNumber(midi);
    }
}

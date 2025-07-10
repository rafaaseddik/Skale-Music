import { Note } from "@/core/domain/note";
import { PitchClassString } from "@/core/definitions/notes.definition";
import { Interval } from "@/core/definitions/intervals.definition";
import { IntervalUtils } from "@/core/utils/intervals.utils";

interface NotesGroupProps {
    title: string,
    notes: PitchClassString[]
    showIntervals?: boolean
    intervals?: number[]
}

export default function NotesGroup({
                                       title,
                                       notes,
                                       showIntervals,
                                       intervals = [],
                                   }: NotesGroupProps) {
    return (
      <div className="notes-group-container">
          <div className="flex flex-col">
              <div className="notes-group-title">{title}</div>
              <div>
                  <table className="notes-group-table">
                      <tbody>
                      <tr>
                          <td>Notes</td>
                          <td>Interval</td>
                          <td>Semitones</td>
                      </tr>
                      {notes.map((note, index) => (
                        <tr key={note}>
                            <td className="text-left">{note}</td>
                            <td className="text-left">{IntervalUtils.getIntervalName(intervals[index])}</td>
                            <td className="text-left">{intervals[index]}</td>
                        </tr>
                      ))}

                      </tbody>
                  </table>
              </div>

          </div>
      </div>
    )
}

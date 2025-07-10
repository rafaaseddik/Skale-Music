"use client"
import { useEffect, useRef, useState } from "react";

import MidiPlayer, { MidiPlayerRef } from "@/shared/components/midi-player.component";
import Head from "next/head";

import Dropdown, { DropdownOption } from "@/shared/components/form/dropdown.component";
import {
    Accidental,
    NoteLetter, PitchClassString
} from "@/core/definitions/notes.definition";
import ChordsSelector from "@/shared/components/chords-selector.component";
import { Chord } from "@/core/definitions/chords.definition";
import { ChordsUtils } from "@/core/utils/chords.utils";
import { Note } from "@/core/domain/note";
import NotesGroup from "@/shared/components/notes-group.component";
import { Interval } from "@/core/definitions/intervals.definition";
import { ArrayUtils } from "@/core/utils/array.utils";
import Keyboard from "@/shared/components/keyboard.component";

const NoteKeyOptions: DropdownOption<NoteLetter>[] = [
    {value: "C", label: "C"},
    {value: "D", label: "D"},
    {value: "E", label: "E"},
    {value: "F", label: "F"},
    {value: "G", label: "G"},
    {value: "A", label: "A"},
    {value: "B", label: "B"},
];
const AccidentalOptions: DropdownOption<Accidental>[] = [
    {value: "", label: "♮ - Natural"},
    {value: "b", label: "b - Flat"},
    {value: "#", label: "# - Sharp"},
];
const InversionOptions: DropdownOption<string>[] = [
    {value: "1", label: "Root position"},
    {value: "2", label: "1st"},
    {value: "3", label: "2nd"},
];

export default function ChordsRecognition() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [chordRootNoteKey, setChordRootNoteKey] = useState<DropdownOption<NoteLetter>>(NoteKeyOptions[0]);
    const [chordRootNoteAccidental, setChordRootNoteAccidental] = useState<DropdownOption<Accidental>>(AccidentalOptions[0]);
    const [selectedChord, setSelectedChord] = useState<Chord>(Chord.MAJOR);
    const [chordNotes, setChordNotes] = useState<PitchClassString[]>([]);
    const [chordIntervals, setChordIntervals] = useState<Interval[]>([]);
    const [inversion, setInversion] = useState<DropdownOption>(InversionOptions[0]);

    useEffect(() => {
        const notes = ChordsUtils.getNotesFromChord(new Note(chordRootNoteKey.value, chordRootNoteAccidental.value, "4"), selectedChord);
        setChordNotes(ArrayUtils.applyInversion(notes.map(note => note.pitchClassString), Number(inversion.value)));
        setChordIntervals(ArrayUtils.applyInversion(ChordsUtils.getChordInterval(selectedChord), Number(inversion.value)));

    }, [selectedChord, chordRootNoteKey, chordRootNoteAccidental, inversion])

    const chordRootNoteKeyChanged = (key: DropdownOption<NoteLetter>) => {
        setChordRootNoteKey(key);
    }
    const chordRootNoteAccidentalChanged = (accidental: DropdownOption<Accidental>) => {
        setChordRootNoteAccidental(accidental);
    }
    const inversionChanged = (inversion: DropdownOption) => {
        setInversion(inversion);
    }
    return (<>
          <Head>
              <title>Skale | Chords Recognition</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Chords Visualizer</h1>
              <h3 className="text-l text-center text-theme-grey">Explore chords</h3>

              <>
                  <div className="gap-3 columns-1 md:columns-3 mt-3">
                     <div className="text-center md:text-right mb-2 md:mb-0">
                         <Dropdown className="large-dropdown" label="Key" options={NoteKeyOptions} postfix={""} selected={chordRootNoteKey} onSelect={(e)=>chordRootNoteKeyChanged(e as DropdownOption<NoteLetter>)}></Dropdown>
                     </div>
                      <div className="text-center md:text-center mb-2 md:mb-0">
                          <Dropdown className="large-dropdown" label="Accidental" options={AccidentalOptions} postfix={""} selected={chordRootNoteAccidental} onSelect={(e)=>chordRootNoteAccidentalChanged(e as DropdownOption<Accidental>)}></Dropdown>
                      </div>
                      <div className="text-center md:text-left mb-2 md:mb-0">
                          <Dropdown className="large-dropdown" label="Inversion" options={InversionOptions} postfix={""} selected={inversion} onSelect={(e)=>inversionChanged(e as DropdownOption)}></Dropdown>
                      </div>
                  </div>
                  <div className="pt-3">
                      <ChordsSelector initialSelectedChords={[selectedChord]}
                                      activateOnly={true}
                                      singleSelect={true}
                                      chordsUpdated={selectedChords => setSelectedChord(selectedChords[0])}></ChordsSelector>
                  </div>
                  <div className="mt-3">
                      <div className="flex justify-center pb-3">
                          <Keyboard octaves={3} notes={chordNotes}></Keyboard>
                      </div>
                      <NotesGroup title={`${chordRootNoteKey.label}${chordRootNoteAccidental.value} ${ChordsUtils.getChordName(selectedChord)} notes`}
                                  notes={chordNotes}
                                  intervals={chordIntervals}
                                  showIntervals={true}
                      ></NotesGroup>




                  </div>
              </>


              <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
          </div>
      </>
    )
}

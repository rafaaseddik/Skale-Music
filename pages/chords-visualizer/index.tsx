"use client"
import { useRef, useState } from "react";

import MidiPlayer, { MidiPlayerRef } from "@/shared/components/midi-player.component";
import Head from "next/head";

import Dropdown, { DropdownOption } from "@/shared/components/form/dropdown.component";
import {
    Accidental,
    NoteLetter
} from "@/core/definitions/notes.definition";
import ChordsSelector from "@/shared/components/chords-selector.component";
import { Chord } from "@/core/definitions/chords.definition";

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

export default function ChordsRecognition() {
    const midiPlayerRef = useRef<MidiPlayerRef>(null);
    const [chordRootNoteKey, setChordRootNoteKey] = useState<DropdownOption<NoteLetter>>(NoteKeyOptions[0]);
    const [chordRootNoteAccidental, setChordRootNoteAccidental] = useState<DropdownOption<Accidental>>(AccidentalOptions[0]);
    const [selectedChord, setSelectedChord] = useState<Chord>(Chord.MAJOR);

    const chordRootNoteKeyChanged = (key: DropdownOption<NoteLetter>) => {
        setChordRootNoteKey(key);
    }
    const chordRootNoteAccidentalChanged = (accidental: DropdownOption<Accidental>) => {
        setChordRootNoteAccidental(accidental);
    }
    return (<>
          <Head>
              <title>Skale | Chords Recognition</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Chords Visualizer</h1>
              <h3 className="text-l text-center text-theme-grey">Explore chords</h3>

              <>
                  <div className="p-3 mt-2 text-center">Pick root key</div>
                  <div className="gap-3 columns-1 sm:columns-2">
                     <div className="text-center sm:text-right">
                         <Dropdown className="large-dropdown" label="Key" options={NoteKeyOptions} postfix={""} selected={chordRootNoteKey} onSelect={(e)=>chordRootNoteKeyChanged(e as DropdownOption<NoteLetter>)}></Dropdown>
                     </div>
                      <div className="text-center sm:text-left">
                          <Dropdown className="large-dropdown" label="Accidental" options={AccidentalOptions} postfix={""} selected={chordRootNoteAccidental} onSelect={(e)=>chordRootNoteAccidentalChanged(e as DropdownOption<Accidental>)}></Dropdown>
                      </div>
                  </div>
                  <div className="pt-3">
                      <ChordsSelector initialSelectedChords={[selectedChord]}
                                      activateOnly={true}
                                      singleSelect={true}
                                      chordsUpdated={selectedChords => setSelectedChord(selectedChords[0])}></ChordsSelector>
                  </div>
              </>


              <MidiPlayer ref={midiPlayerRef}></MidiPlayer>
          </div>
      </>
    )
}

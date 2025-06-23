import { ifClass } from "@/shared/utils/react-dom-utils";
import { Dumbbell, Tally4, Telescope } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

type ToolType = "all" | "ear_gym" | "visualizer";
export default function Home() {
    const [toolsType, setToolsType] = useState<ToolType>("all");
    return (
      <>
          <Head>
              <title>Skale | Your music toolbox</title>
          </Head>
          <div className={"p-2"}>
              <h1 className="text-3xl text-center font-bold text-theme-color-title">Welcome to Skale</h1>
              <div>
                  <h3 className="mt-4 text-xl  text-center">Tools type</h3>
                  <div className="tool-type-selectors-container">
                      <div className={`tool-type-selector ${ifClass(toolsType === "all", "active")}`}
                           onClick={() => setToolsType("all")}>
                          <div className="tool-type-icon"><Tally4/></div>
                          All tools
                      </div>
                      <div className={`tool-type-selector ${ifClass(toolsType === "ear_gym", "active")}`}
                           onClick={() => setToolsType("ear_gym")}>
                          <div className="tool-type-icon"><Dumbbell/></div>
                          Ear Gym
                      </div>
                      <div className={`tool-type-selector ${ifClass(toolsType === "visualizer", "active")}`}
                           onClick={() => setToolsType("visualizer")}>
                          <div className="tool-type-icon"><Telescope/></div>
                          Visualizers
                      </div>
                  </div>
                  <div
                    className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 pt-3 px-3"}>
                      <div
                        className={`tool-container tool-container-intervals-training ${ifClass(toolsType !== 'ear_gym' && toolsType !== 'all', "hidden")}`}
                        onClick={() => window.location.href = '/intervals-training'}
                      >
                          <div className={"tool-icon"}><Image className={"invert"} src={"icons/Perfect 5th.svg"}
                                                              alt={"logo"} width={60} height={50}/></div>
                          <div className={"tool-name"}>Intervals ear training</div>
                          <div className={"tool-type"}><Dumbbell/> Ear gym</div>
                      </div>
                      <div
                        className={`tool-container tool-container-chords-recognition ${ifClass(toolsType !== 'ear_gym' && toolsType !== 'all', "hidden")}`}
                        onClick={() => window.location.href = '/chords-recognition'}>
                          <div className={"tool-icon"}><Image className={"invert"} src={"icons/Chord.svg"} alt={"logo"}
                                                              width={40} height={50}/></div>
                          <div className={"tool-name"}>Chords recognition</div>
                          <div className={"tool-type"}><Dumbbell/> Ear gym</div>
                      </div>
                      <div
                        className={`tool-container tool-container-mode-identification ${ifClass(toolsType !== 'ear_gym' && toolsType !== 'all', "hidden")}`}>
                          <div className={"tool-icon"}><Image className={"invert"} src={"icons/Circle of fifths.svg"}
                                                              alt={"logo"} width={60} height={50}/></div>
                          <div className={"tool-name"}>Mode identification</div>
                          <div className={"tool-type"}><Dumbbell/> Ear gym</div>
                      </div>
                      <div
                        className={`tool-container tool-container-scale-visualizer inactive ${ifClass(toolsType !== 'visualizer' && toolsType !== 'all', "hidden")}`}>
                          <div className={"tool-icon"}>WIP</div>
                          <div className={"tool-name"}>Scale visualizer</div>
                          <div className={"tool-type"}><Telescope/> Visualizer</div>
                      </div>
                      <div
                        className={`tool-container tool-container-chords-visualizer inactive ${ifClass(toolsType !== 'visualizer' && toolsType !== 'all', "hidden")}`}>
                          <div className={"tool-icon"}>WIP</div>
                          <div className={"tool-name"}>Chords visualizer</div>
                          <div className={"tool-type"}><Telescope/> Visualizer</div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}

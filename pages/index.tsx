import { ifClass } from "@/shared/utils/react-dom-utils";
import { Dumbbell, Tally4, Telescope } from "lucide-react";
import { useState } from "react";

type ToolType = "all" | "ear_gym" | "visualizer";
export default function Home() {
    const [toolsType, setToolsType] = useState<ToolType>("all");
    return (
      <div className={"p-2"}>
          <h1 className="text-3xl text-center font-bold text-theme-color-title">Welcome to Skale</h1>
          <div>
              <h3 className="mt-4 text-xl  text-center">Tools type</h3>
              <div className="tool-type-selectors-container">
                  <div className={`tool-type-selector ${ifClass(toolsType === "all", "active")}`}
                       onClick={() => setToolsType("all")}>
                      <div className="tool-type-icon"><Tally4 /></div>
                      All tools
                  </div>
                  <div className={`tool-type-selector ${ifClass(toolsType === "ear_gym", "active")}`}
                       onClick={() => setToolsType("ear_gym")}>
                      <div className="tool-type-icon"><Dumbbell /></div>
                      Ear Gym
                  </div>
                  <div className={`tool-type-selector ${ifClass(toolsType === "visualizer", "active")}`}
                       onClick={() => setToolsType("visualizer")}>
                      <div className="tool-type-icon"><Telescope /></div>
                      Visualizers
                  </div>
              </div>
          </div>
          <div className="flex flex-col justify-center items-center">
              <div><h1 className={"flex text-2xl justify-center items-center mt-3"}><Dumbbell className={"mr-2"}/>Ear
                  Gym</h1></div>
              <div className="menu-container">
                  <div className="menu-item" style={{
                      background: "url(./backgrounds/intervals.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                  }}>Intervals Recognition
                  </div>
                  <div className="menu-item" style={{
                      background: "url(./backgrounds/chords.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                  }}>Chords Recognition
                  </div>
                  <div className="menu-item">Scale Identification</div>
              </div>

              <div><h1 className={"flex text-2xl justify-center items-center mt-3"}><Telescope
                className={"mr-2"}/> Explore</h1></div>
              <div className="menu-container">
                  <div className="menu-item">Scales</div>
                  <div className="menu-item">Chords</div>
              </div>
          </div>
      </div>
    );
}

import React, { useState, Suspense, useReducer } from "react";
import PlayerHeader from "./PlayerHeader";
import { checkMobile } from "../Utils";

import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ModelsManager } from "../modelCode/ModelsManager";
import { PlayerDispatchContext, PlayerContext } from "./PlayerContext";

import DiskCollection from "./DiskCollection";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience({ token }) {
  const [currentPlaying, setCurrentPlaying] = useState({
    text: "",
    playStatus: false,
  });

  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const [song, dispatch] = useReducer(songReducer, initialSong);

  window.mobileCheck = checkMobile;
  let loaderFontSize = window.mobileCheck() ? "22px" : "30px";

  return (
    <>
      <PlayerContext.Provider value={song}>
        <PlayerHeader token={token} currentPlaying={currentPlaying} />
      </PlayerContext.Provider>

      {/* ThreeJs code  */}
      <Leva collapsed />
      <Canvas
        style={{ height: "100vh", background: "black" }}
        camera={{
          position: [0.3, 3, 5],
          fov: window.mobileCheck() ? 80 : 45,
          rotation: [
            -0.5404195002705843, 0.051404250823021816, 0.03081920793238793,
          ],
        }}
        shadows
      >
        {perfVisible && <Perf position="top-left" />}
        <directionalLight intensity={0.4} castShadow color="white" />
        <Suspense fallback={null}>
          <PlayerContext.Provider value={song}>
            <PlayerDispatchContext.Provider value={dispatch}>
              <ModelsManager setCurrentPlaying={setCurrentPlaying} />
              <DiskCollection token={token} />
            </PlayerDispatchContext.Provider>
          </PlayerContext.Provider>
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundImage: "black",
        }}
        dataInterpolation={(p) => `
          Loading ${p.toFixed(2)}%
          ☝️🤓 A compilation of some of my favorite songs...
          You can move the screen by pressing it down and move
        `} // Text
        innerStyles={{
          fontSize: loaderFontSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      />
    </>
  );
}

function songReducer(state, action) {
  switch (action.type) {
    case "update": {
      return action.payload;
    }
  }
}

const initialSong = {
  song: "spotify:track:04jmrsQI3WUHaUTZ6sZ6e",
  artist: "Turnstile",
  name: "The Dream",
};

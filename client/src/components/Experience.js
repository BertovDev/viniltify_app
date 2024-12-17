import React, { useState, Suspense, useReducer } from "react";
import PlayerHeader from "./PlayerHeader";
import { checkMobile } from "../Utils";

import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { ModelsManager } from "../modelCode/ModelsManager";
import { PlayerDispatchContext, PlayerContext } from "./PlayerContext";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";

import DiskCollection from "./DiskCollection";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { Color } from "three";

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

  const { color, color2, position } = useControls({
    color: "#0048d8",
    color2: "#ffffff",
    position: [0, 1, 0],
  });

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
        <directionalLight intensity={2} castShadow color={color} />
        <directionalLight
          intensity={0.4}
          castShadow
          color={color2}
          position={position}
        />
        <pointLight
          distance={160}
          intensity={0.2}
          color="white"
          position={[0, 1, 0]}
        />

        <pointLight distance={100} intensity={10} color="white" />
        <fog attach="fog" args={["#000000", 1, 30]} />
        <Suspense fallback={null}>
          <PlayerContext.Provider value={song}>
            <PlayerDispatchContext.Provider value={dispatch}>
              <ModelsManager setCurrentPlaying={setCurrentPlaying} />
              <DiskCollection token={token} />
            </PlayerDispatchContext.Provider>
          </PlayerContext.Provider>
        </Suspense>
        <EffectComposer stencilBuffer={true}>
          <Bloom
            intensity={0.1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />

          <Vignette darkness={0.7} offset={0.3} />
        </EffectComposer>
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

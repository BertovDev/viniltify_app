import React, { useState, Suspense, useReducer } from "react";
import PlayerHeader from "./PlayerHeader";
import { checkMobile } from "../Utils";

import { Canvas, useFrame } from "@react-three/fiber";
import { Loader, SpotLight, usePerformanceMonitor } from "@react-three/drei";
import { ModelsManager } from "../modelCode/ModelsManager";
import { PlayerDispatchContext, PlayerContext } from "./PlayerContext";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

import DiskCollection from "./DiskCollection";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience({ token }) {
  const [currentPlaying, setCurrentPlaying] = useState({
    text: "",
    playStatus: false,
  });

  const { perfVisible } = useControls({
    perfVisible: false,
  });

  const [song, dispatch] = useReducer(songReducer, initialSong);

  window.mobileCheck = checkMobile;
  let loaderFontSize = window.mobileCheck() ? "22px" : "30px";

  const { color, color2, position } = useControls({
    color: "#1b0b3a",
    color2: "#ffffff",
    position: [0, 1, 0],
  });

  const pointLightControl = useControls("Point", {
    intensity: { value: 2.1, min: 0, max: 10 },
    positionX: { value: 0.2, min: -10, max: 10 },
    positionY: { value: 3.0, min: -10, max: 10 },
    positionZ: { value: 0, min: -10, max: 10 },
    decay: { value: 0.0, min: 0, max: 10 },
    distance: { value: 6.5, min: 0, max: 10 },
  });

  const light1Controls = useControls("Light 3", {
    intensity: { value: 0.8, min: 0, max: 10 },
    positionX: { value: -0.0, min: -10, max: 10 },
    positionY: { value: 4.6, min: -10, max: 50 },
    positionZ: { value: -0.8, min: -10, max: 10 },
    angle: { value: 0.4, min: 0, max: Math.PI / 2 },
    penumbra: { value: 1, min: 0, max: 1 },
    distance: { value: 5.8, min: -10, max: 10 },
    color: "#1b0b3a",
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
          fov: window.mobileCheck() ? 80 : 70,
          rotation: [0, 0, 0],
        }}
        shadows
      >
        {perfVisible && <Perf position="top-left" />}
        <directionalLight intensity={5} castShadow color={color} />

        <SpotLight
          intensity={light1Controls.intensity}
          position={[
            light1Controls.positionX,
            light1Controls.positionY,
            light1Controls.positionZ,
          ]}
          angle={light1Controls.angle}
          penumbra={light1Controls.penumbra}
          color={light1Controls.color}
          distance={light1Controls.distance}
        />

        <pointLight
          position={[
            pointLightControl.positionX,
            pointLightControl.positionY,
            pointLightControl.positionZ,
          ]}
          intensity={pointLightControl.intensity}
          distance={pointLightControl.distance}
          decay={pointLightControl.decay}
        />
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
          <Vignette darkness={0.5} offset={0.3} />
        </EffectComposer>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundImage: "black",
        }}
        dataInterpolation={(p) => `
          Loading ${p.toFixed(2)}%
          ☝️🤓 Loading your spotify songs...
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
